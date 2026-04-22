import { CartStorage } from "@/store/Storage";
import { OrderItem } from "@/store/StorageHelpers";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";


export const CheckOutScreen = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<OrderItem[]>([]);

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

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>£{total.toFixed(2)}</Text>
                </View>

                <Pressable style={styles.cancelButton} onPress={() => router.back()}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
            </View>
        </View>
    );
};

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
});