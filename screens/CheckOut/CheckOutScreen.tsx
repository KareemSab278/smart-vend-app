import { CameraComponent } from "@/components/Camera/CameraComponent";
import AppModal from "@/components/Modal";
import { fetchNewPin } from "@/helpers/fetchNewPin";
import { CartStorage } from "@/store/Storage";
import { OrderItem } from "@/store/StorageHelpers";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

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
            <AppModal
                animationType="slide"
                title="Scan the QR code shown on the vend display"
                visible={activeModal === 'camera'}
                onClose={() => setActiveModal(null)}
                children={
                    <>
                        <CameraComponent open={activeModal === 'camera'} />
                        <Pressable
                            style={[styles.cancelButton, { backgroundColor: '#773eb9', marginTop: 12 }]}
                            onPress={() => { setActiveModal('pin'); }}
                        >
                            <Text style={[styles.cancelButtonText, { color: '#fff' }]}>Use Pin Instead</Text>
                        </Pressable>
                    </>
                }
            />

            <AppModal
                animationType="slide"
                title="Pin Mode"
                visible={activeModal === 'pin'}
                onClose={() => { setActiveModal(null); setReceivedPin(null); }}
                children={
                    <PinModeContent
                        pin={receivedPin}
                        onPress={() => {
                            setActiveModal('camera'); setReceivedPin(null);
                        }}
                        message={loadingPin ? 'Fetching pin...' : receivedPin ?? ''}
                    />
                }
            />

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>£{total.toFixed(2)}</Text>
                </View>

                <Pressable
                    style={[styles.cancelButton, { backgroundColor: '#773eb9' }]}
                    onPress={() => { setActiveModal('camera'); setReceivedPin(null); }}
                >
                    <Text style={[styles.cancelButtonText, { color: '#fff' }]}>Proceed to Pay</Text>
                </Pressable>

                <Pressable style={styles.cancelButton} onPress={() => router.back()}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
            </View>
        </View>
    );
};

const PinModeContent = ({ pin, onPress, message }: { pin: string | null, onPress: () => void, message: string }) => (
    <>
        <Text style={styles.pinText}>{message}</Text>
        <Pressable
            style={[styles.cancelButton, { backgroundColor: '#773eb9', marginTop: 12 }]}
            onPress={onPress}
        >
            <Text style={[styles.cancelButtonText, { color: '#fff' }]}>Use Camera Instead</Text>
        </Pressable>
    </>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        marginTop: 12,
    },
    listContent: {
        paddingBottom: 16,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    itemDetails: {
        flex: 1,
        marginRight: 12,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemQty: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 16,
        paddingBottom: 32,
        gap: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '700',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#773eb9',
    },
    cancelButton: {
        borderWidth: 1.5,
        borderColor: '#aaa',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 15,
        color: '#555',
        fontWeight: '600',
    },
    pinText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginVertical: 12,
    },
});