import { OrderItem } from "@/store/StorageHelpers"
import { FlatList, Text, View } from "react-native"
import { styles } from "../styles"

export const CartItems = ({ cartItems }: { cartItems: OrderItem[] }) => {

    return (
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
    )
}