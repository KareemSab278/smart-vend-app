import { CartButton } from '@/components/Button';
import { HorizontalItemCard } from '@/components/CatalogueItem';
import { CatalogueItemData } from '@/helpers/fetchCatalogue';
import { fetchFavourites } from '@/helpers/fetchFavourites';
import { fetchOrderHistory } from '@/helpers/fetchOrderHistory';
import { IfUserNotSignedIn } from '@/Security/signInCheck';
import { CartStorage } from '@/store/Storage';
import { OrderItem } from '@/store/StorageHelpers';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { styles } from './Styles';

export default function HomeScreen() {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [previouslyOrdered, setPreviouslyOrdered] = useState<CatalogueItemData[]>([]);
  const [favourites, setFavourites] = useState<CatalogueItemData[]>([]);
  const username = useRef<string>('User').current || 'User';

  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const [cartItems, orderHistory, favs] = await Promise.all([
        CartStorage.getCart(),
        fetchOrderHistory(),
        fetchFavourites(),
      ]);
      setCart(cartItems ?? []);
      setPreviouslyOrdered(orderHistory);
      setFavourites(favs);
    };
    loadData();
  }, []);

  const addToCart = async (item: CatalogueItemData) => {
    await CartStorage.addToCart({ id: item.id as number, name: item.name, price: item.price, quantity: 1 });
    const updatedCart = await CartStorage.getCart();
    setCart(updatedCart ?? []);
  };

  const handleCartPress = () => router.push('/catalogue?openCart=true');

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>

        <IfUserNotSignedIn goTo="/sign-in" />

        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back, {username}</Text>
          <Text style={styles.subtitle}>Explore our latest products and offers</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Previously Ordered</Text>
          {previouslyOrdered.length > 0 ? (
            <FlatList
              data={previouslyOrdered}
              keyExtractor={(item) => String(item.id)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.hList}
              renderItem={({ item }) => (
                <HorizontalItemCard item={item} onPress={() => addToCart(item)} />
              )}
            />
          ) : (<Text style={styles.emptyText}>No previous orders yet.</Text>)
          }
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Favourites</Text>
          {favourites.length > 0 ? (
            <FlatList
              data={favourites}
              keyExtractor={(item) => String(item.id)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.hList}
              renderItem={({ item }) => (
                <HorizontalItemCard item={item} onPress={() => addToCart(item)} />
              )}
            />
          ) : (
            <Text style={styles.emptyText}>No favourites added yet.</Text>
          )}
        </View>

      </ScrollView>

      <CartButton cartItems={cart} onPress={handleCartPress} />
    </View>
  );
}
