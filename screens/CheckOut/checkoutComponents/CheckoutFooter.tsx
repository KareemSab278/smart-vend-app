import { Pressable, Text, View } from "react-native";
import { styles } from "../styles";

interface CheckoutFooterProps {
    total: number;
    onCancel: () => void;
    onReadyToPay: () => void;
}

export const CheckoutFooter = ({ total, onCancel, onReadyToPay }: CheckoutFooterProps) => {

    return (
        <View style={styles.footer}>
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>£{total.toFixed(2)}</Text>
            </View>

            <Pressable
                style={[styles.cancelButton, { backgroundColor: '#773eb9' }]}
                onPress={onReadyToPay}
            >
                <Text style={[styles.cancelButtonText, { color: '#fff' }]}>Ready to Pay</Text>
            </Pressable>

            <Pressable style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
        </View>
    )
}