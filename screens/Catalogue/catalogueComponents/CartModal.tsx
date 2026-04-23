import AppModal from '@/components/Modal';
import { CartStorage } from '@/store/Storage';
import type { OrderItem } from '@/store/StorageHelpers';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CartModalProps = {
  visible: boolean;
  cart: OrderItem[];
  onClose: () => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout?: () => void;
};

export default function CartModal({
  visible,
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartModalProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (!visible) return;
    if (cart.length === 0) { onClose() }
  }, [cart, visible]);

  return (
    <AppModal visible={visible} title="Cart" onClose={onClose}>
      <>
        {cart.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <TouchableOpacity
              onPress={() => onRemoveItem(Number(item.id))}
              style={styles.removeButton}
            >
              <MaterialCommunityIcons name="trash-can-outline" size={20} color="#ff0000b6" />
            </TouchableOpacity>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>£{item.price.toFixed(2)}</Text>
            </View>

            <View style={styles.quantityRow}>


              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => onUpdateQuantity(Number(item.id), item.quantity - 1)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => onUpdateQuantity(Number(item.id), item.quantity + 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Pressable style={styles.clearCartButton} onPress={() => {
            CartStorage.clearCart();
            onClose();
          }}>
            <Text style={styles.clearCartButtonText}>
              Clear Cart
            </Text>
          </Pressable>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>£{total.toFixed(2)}</Text>
        </View>

        {onCheckout && (
          <Pressable style={styles.checkoutButton} onPress={onCheckout}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </Pressable>
        )}
      </>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  itemDetails: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  itemPrice: {
    color: '#555',
    marginBottom: 8,
  },
  removeButton: {
    marginTop: 4,
    paddingVertical: 3,
    paddingHorizontal: 4,
    backgroundColor: '#ff000021',
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginRight: 15,
  },
  removeButtonText: {
    fontSize: 12,
    color: '#444',
    fontWeight: '600',
  },
  clearCartButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#da5151',
    borderRadius: 8,
  },
  clearCartButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#481186bd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  quantityValue: {
    width: 34,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 16,
    fontSize: 15,
  },
  checkoutButton: {
    marginTop: 12,
    backgroundColor: '#773eb9',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
