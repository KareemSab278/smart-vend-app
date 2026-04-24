import { MainButton, SecondaryButton } from "@/components/Button";
import { CameraComponent } from "@/components/Camera";
import { LoadingComponent } from "@/components/Loading";
import AppModal from "@/components/Modal";
import { fetchNewPin } from "@/helpers/fetchNewPin";
import { CartStorage } from "@/store/Storage";
import { OrderItem } from "@/store/StorageHelpers";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, FlatList, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

export const CheckOutScreen = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<OrderItem[]>([]);
    const [activeModal, setActiveModal] = useState<'camera' | 'pin' | null>(null);
    const [receivedPin, setReceivedPin] = useState<string | null>(null);
    const [pinDigits, setPinDigits] = useState<string[]>([]);
    const pinAnimations = useRef<Animated.Value[]>([]);
    const [loadingPin, setLoadingPin] = useState(false);

    useEffect(() => {
        const fetchPinCondition = activeModal === 'pin' && receivedPin === null;
        if (!fetchPinCondition) return;

        setLoadingPin(true);
        fetchPinCondition && fetchNewPin()
            .then((pin) => setReceivedPin(pin))
            .catch((error) => console.error("Failed to fetch new pin:", error))
            .finally(() => setLoadingPin(false));

    }, [activeModal]);

    useEffect(() => {
        if (!receivedPin) {
            setPinDigits([]);
            pinAnimations.current = [];
            return;
        }

        const digits = receivedPin.split('');
        setPinDigits(digits);
        pinAnimations.current = digits.map(() => new Animated.Value(0));

        const animations = pinAnimations.current.map((value) =>
            Animated.timing(value, {
                toValue: 1,
                duration: 800,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            })
        );

        Animated.stagger(120, animations).start();
    }, [receivedPin]);

    useEffect(() => {
        CartStorage.getCart()
            .then((items) => setCartItems((items as OrderItem[]) ?? []))
            .catch((error) => console.error(error));
    }, []);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSuccessfulPayment = () => {
        CartStorage.clearCart()
            .then(() => {
                setCartItems([]);
                setActiveModal(null);
            })
            .catch((error) => console.error("Failed to clear cart after payment:", error));
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Summary</Text>

            {cartItems.length === 0 ? (
                <Text style={styles.emptyText}>Your cart is empty.</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <View style={styles.itemRow}>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                            </View>
                            <Text style={styles.itemPrice}>
                                £{(item.price * item.quantity).toFixed(2)}
                            </Text>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={styles.listContent}
                />
            )}

            {/* CAMERA MODAL */}
            <AppModal
                animationType="slide"
                title="Scan the QR code shown on the vend display"
                visible={activeModal === 'camera'}
                children={
                    <>
                        <CameraComponent
                            open={activeModal === 'camera'}
                            onClose={() => setActiveModal(null)}
                        />
                        <SecondaryButton
                            title="Use Pin Instead"
                            onPress={() => { setActiveModal('pin'); }}
                        />
                        <MainButton
                            title="I'm Done"
                            onPress={() => setActiveModal(null)}
                        />
                    </>
                }
            />

            {/* PIN MODAL */}
            <AppModal
                animationType="slide"
                title={loadingPin ? "Generating Pin..." : "Use This Pin to Pay"}
                visible={activeModal === 'pin'}
                children={
                    <>
                        {loadingPin ? (<LoadingComponent />)
                            :
                            (
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    {
                                        pinDigits.map((digit, index) => {
                                            const animation = pinAnimations.current[index] ?? new Animated.Value(0);
                                            const pinStyle = [styles.pinText, { opacity: animation, transform: [{ translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }] }];
                                            return (
                                                <Animated.Text
                                                    key={index}
                                                    style={pinStyle}
                                                >
                                                    {digit}
                                                </Animated.Text>
                                            );
                                        })
                                    }
                                </View>
                            )}
                        <SecondaryButton
                            title="Use Camera Instead"
                            onPress={() => { setActiveModal('camera'); setReceivedPin(null); }}
                        />
                        <MainButton
                            title="I'm Done"
                            onPress={() => setActiveModal(null)}
                        />
                    </>
                }
            />

            {/* FOOTER */}
            {activeModal == null &&
                <View style={styles.footer}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>£{total.toFixed(2)}</Text>
                    </View>

                    <Pressable
                        style={[styles.cancelButton, { backgroundColor: '#773eb9' }]}
                        onPress={() => { setActiveModal('camera'); setReceivedPin(null); }}
                    >
                        <Text style={[styles.cancelButtonText, { color: '#fff' }]}>Ready to Pay</Text>
                    </Pressable>

                    <Pressable style={styles.cancelButton} onPress={() => router.push('/catalogue')}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </Pressable>
                </View>
            }
        </View>
    );
};
