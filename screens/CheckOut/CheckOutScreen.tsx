import { CameraComponent } from "@/components/Camera/CameraComponent";
import AppModal from "@/components/Modal";
import { fetchNewPin } from "@/helpers/fetchNewPin";
import { CartStorage } from "@/store/Storage";
import { OrderItem } from "@/store/StorageHelpers";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

export const CheckOutScreen = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<OrderItem[]>([]);
    const [activeModal, setActiveModal] = useState<'camera' | 'pin' | null>(null);
    const [receivedPin, setReceivedPin] = useState<string | null>(null);
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
        CartStorage.getCart()
            .then((items) => setCartItems((items as OrderItem[]) ?? []))
            .catch((error) => console.error(error));
    }, []);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
                onClose={() => setActiveModal(null)}
                children={
                    <>
                            <CameraComponent open={activeModal === 'camera'} onClose={() => setActiveModal(null)} />
                        <Pressable
                            style={styles.modeSwitchButton}
                            onPress={() => { setActiveModal('pin'); }}
                        >
                            <Text style={styles.modeSwitchText}>Use Pin Instead</Text>
                        </Pressable>
                    </>
                }
            />

            {/* PIN MODAL */}
            <AppModal
                animationType="slide"
                title="Pin Mode"
                visible={activeModal === 'pin'}
                onClose={() => { setActiveModal(null); setReceivedPin(null); }}
                children={
                    <>
                        <Text style={styles.pinText}>{loadingPin ? 'Fetching pin...' : receivedPin ?? ''}</Text>
                        <Pressable
                            style={styles.modeSwitchButton}
                            onPress={() => { setActiveModal('camera'); setReceivedPin(null); }}
                        >
                            <Text style={styles.modeSwitchText}>Use Camera Instead</Text>
                        </Pressable>
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
                        onPress={() => { setActiveModal('camera'); setReceivedPin(null);}}
                    >
                        <Text style={[styles.cancelButtonText, { color: '#fff' }]}>Proceed to Pay</Text>
                    </Pressable>

                    <Pressable style={styles.cancelButton} onPress={() => router.push('/catalogue')}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </Pressable>
                </View>
            }
        </View>
    );
};
