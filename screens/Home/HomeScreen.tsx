import { IfUserNotSignedIn } from '@/Security/signInCheck';
import { CartStorage } from '@/store/Storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from './Styles';

export default function HomeScreen() {
  const [cartActive, setCartActive] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const isCartActive = async () => {
      const hasActiveCart = await CartStorage.getCart();
      setCartActive(hasActiveCart && hasActiveCart.length > 0 ? true : false);
    };
    isCartActive();
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.container}>

      <IfUserNotSignedIn goTo="/sign-in" />

      <View style={styles.header}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.text}>This is the main page</Text>

        {cartActive &&
          <View>
            <Pressable onPress={() => router.push({
              pathname: '/catalogue',
              params: { openCart: 'true' },
            })} 
            style={styles.goToCartButton}>
              <Text style={styles.goToCartText}>View Active Cart</Text>
            </Pressable>
          </View>
        }

      </View>
    </ScrollView>
  );
}

