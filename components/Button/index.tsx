import { OrderItem } from '@/store/StorageHelpers';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { useEffect, useRef, type ComponentProps } from 'react';
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export { CartButton, FiltersButton, MainButton, SearchToggleButton, SecondaryButton };

const MainButton = ({ title, onPress }: ButtonProps) => (
  <TouchableOpacity style={styles.appButton} onPress={onPress}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const SearchToggleButton = ({ onPress }: { onPress?: () => void }) => (
  <TouchableOpacity style={styles.searchToggleButton} onPress={onPress}>
    <MaterialCommunityIcons name="magnify" size={20} color="#fff" />
  </TouchableOpacity>
);

const FiltersButton = ({ onPress }: { onPress?: () => void }) => (
  <TouchableOpacity style={styles.filtersButton} onPress={onPress}>
    <MaterialCommunityIcons name="filter-variant" size={20} color="#fff" />
  </TouchableOpacity>
);

const SecondaryButton = ({ title, onPress }: ButtonProps) => (
  <TouchableOpacity style={styles.secondaryButton} onPress={onPress}>
    <Text style={styles.secondaryButtonText}>{title}</Text>
  </TouchableOpacity>
);

const CartButton = ({ cartItems, onPress }: { cartItems: OrderItem[], onPress?: () => void }) => {
  const cartButtonAnimation = useRef(new Animated.Value(0)).current;
  const previousCartLength = useRef(0);

  useEffect(() => {
    if (previousCartLength.current === 0 && cartItems.length > 0) {
      Animated.spring(cartButtonAnimation, {
        toValue: 1,
        friction: 7,
        tension: 120,
        useNativeDriver: true,
      }).start();
    }

    if (cartItems.length === 0) {
      cartButtonAnimation.setValue(0);
    }

    previousCartLength.current = cartItems.length;
  }, [cartItems.length, cartButtonAnimation]);



  return (
    <>
      {cartItems.length > 0 && (
        <Animated.View
          style={{
            transform: [{ scale: cartButtonAnimation }],
            opacity: cartButtonAnimation,
          }}
        >
          <TouchableOpacity style={styles.cartButton} onPress={onPress}>
            <Text style={styles.cartButtonText}>
              <MaterialCommunityIcons name="cart" size={20} color="#fff" />
            </Text>
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0) || 0}
              </Text>
            </View>
            
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  )
}

interface ButtonProps {
  title: string;
  onPress?: () => void;
};

type LinkProps = ComponentProps<typeof Link> & {
  title: string;
};

