import { fetchNewPayPin } from "@/ApiCallers/fetchNewPayPin";
import { CartStorage } from "@/store/Storage";
import { OrderItem } from "@/store/StorageHelpers";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { CameraModal } from "./checkoutComponents/CameraModal";
import { CartItems } from "./checkoutComponents/Cart";
import { CheckoutFooter } from "./checkoutComponents/CheckoutFooter";
import { PinModal } from "./checkoutComponents/PinModal";
import { styles } from "./styles";

export const CheckOutScreen = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<OrderItem[]>([]);
    const [activeModal, setActiveModal] = useState<'camera' | 'pin' | null>(null);
    const [receivedPin, setReceivedPin] = useState<string | null>(null);
    const [loadingPin, setLoadingPin] = useState(false);
    const [pinDigits, setPinDigits] = useState<string[]>([]);
    const pinAnimations = useRef<Animated.Value[]>([]);


    useEffect(() => {
        const fetchPinCondition = activeModal === 'pin' && receivedPin === null;
        if (!fetchPinCondition) return;

        setLoadingPin(true);
        fetchPinCondition && fetchNewPayPin()
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
                router.push('/catalogue');
            })
            .catch((error) => console.error("Failed to clear cart after payment:", error));
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Summary</Text>

            {cartItems.length === 0 ? (
                <Text style={styles.emptyText}>Your cart is empty.</Text>) :
                (<CartItems cartItems={cartItems} />)}

            <CameraModal
                visible={activeModal === 'camera'}
                onClose={() => setActiveModal(null)}
                onPinSelect={() => { setActiveModal('pin'); setReceivedPin(null); }}
                onDone={handleSuccessfulPayment}
            />

            <PinModal
                isLoading={loadingPin}
                visible={activeModal === 'pin'}
                onCameraSelect={() => { setActiveModal('camera'); setReceivedPin(null); }}
                onDone={handleSuccessfulPayment}
                pinDigits={pinDigits}
                pinAnimations={pinAnimations}
            />

            {activeModal == null &&
                <CheckoutFooter
                    total={total}
                    onCancel={() => router.push('/catalogue')}
                    onReadyToPay={() => { setActiveModal('camera'); setReceivedPin(null); }}
                />
            }
        </View>
    );
};
