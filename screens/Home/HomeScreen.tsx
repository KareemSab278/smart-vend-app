import { IfUserNotSignedIn } from '@/Security/signInCheck';
import { CartStorage } from '@/store/Storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './Styles';

export default function HomeScreen() {
  const [cartActive, setCartActive] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const username = useRef<string>('User').current || 'User';

  const router = useRouter();

  useEffect(() => {
    const isCartActive = async () => {
      const hasActiveCart = await CartStorage.getCartCount();
      setCartActive(hasActiveCart && hasActiveCart > 0 ? true : false);
      setCartCount(hasActiveCart ? hasActiveCart : 0);
    };
    isCartActive();
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.container}>

      <IfUserNotSignedIn goTo="/sign-in" />

      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back, {username}</Text>
        <Text style={styles.subtitle}>Explore our latest products and offers</Text>

        <Text style={styles.sectionTitle}>Your Favorites</Text>

        <Text style={styles.sectionTitle}>Featured Products</Text>

        <Text style={styles.sectionTitle}>Previously Ordered</Text>

      </View>
        {cartActive &&
          <TouchableOpacity style={styles.cartButton} onPress={() => router.push({
            pathname: '/catalogue',
            params: { openCart: 'true' },
          })}>
            <MaterialCommunityIcons name="cart" size={20} color="#fff" />
            <Text style={styles.cartButtonText}>
              {/* There's {cartCount === 1 ? 'an' : cartCount} item{cartCount === 1 ? '' : 's'} in your cart */}
              Continue to Cart
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#fff" />
          </TouchableOpacity>
        }
    </ScrollView>
  );
}

