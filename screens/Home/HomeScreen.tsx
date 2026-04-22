import { IfUserNotSignedIn } from '@/Security/signInCheck';
import { CartStorage } from '@/store/Storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './Styles';

export default function HomeScreen() {
  const [cartActive, setCartActive] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);

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
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.text}>This is the main page</Text>


      </View>
        {cartActive &&
          <TouchableOpacity style={styles.cartButton} onPress={() => router.push({
            pathname: '/catalogue',
            params: { openCart: 'true' },
          })}>
            <MaterialCommunityIcons name="cart" size={20} color="#fff" />
            <Text style={styles.cartButtonText}>
              {/* There's {cartCount === 1 ? 'an' : cartCount} item{cartCount === 1 ? '' : 's'} in your cart */}
              Continue where you left off?
            </Text>
          </TouchableOpacity>
        }
    </ScrollView>
  );
}

