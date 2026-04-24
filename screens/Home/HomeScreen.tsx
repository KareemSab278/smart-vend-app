import { CartButton } from '@/components/Button';
import { HorizontalItemCard } from '@/components/CatalogueItem';
import { fetchCatalogueData } from '@/helpers/fetchCatalogue';
import { fetchFavourites } from '@/helpers/fetchFavourites';
import { fetchOrderHistory } from '@/helpers/fetchOrderHistory';
import { IfUserNotSignedIn } from '@/Security/signInCheck';
import { CartStorage, User, UserStorage } from '@/store/Storage';
import { OrderItem } from '@/store/StorageHelpers';
import { CatalogueItemType } from '@/Types/Catalogue';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { styles } from './Styles';

export default function HomeScreen() {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [previouslyOrdered, setPreviouslyOrdered] = useState<CatalogueItemType[]>([]);
  const [favourites, setFavourites] = useState<CatalogueItemType[]>([]);
  const user = useRef<User | null>(null);
  const router = useRouter();

  const loadData = async () => {
    await Promise.all([
      UserStorage.getUser().then(u => user.current = u as User),
      CartStorage.getCart().then(c => setCart(c as OrderItem[])),
      fetchOrderHistory().then(setPreviouslyOrdered),
      fetchFavourites().then(setFavourites),
      fetchCatalogueData()
    ])
  };

  const addToCart = async (item: CatalogueItemType) => {
    await CartStorage.addToCart({ ...item, quantity: 1 } as OrderItem)
      .then(CartStorage.getCart)
      .then(c => setCart(c as OrderItem[]))
      .catch(e => console.error('Error adding to cart:', e));
  };

  const handleCartPress = () => router.push('/catalogue?openCart=true');


  useEffect(() => { loadData() }, []);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>

        <IfUserNotSignedIn goTo="/sign-in" />

        <View style={styles.header}>
          {user.current && <Text style={styles.title}>Welcome Back, {user.current?.first_name}</Text>}
          <Text style={styles.subtitle}>Explore our latest products and offers</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>You Previously Ordered</Text>
          {previouslyOrdered.length > 0 ? (
            <FlatList
              data={previouslyOrdered}
              keyExtractor={(item) => String(item.id)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.hList}
              renderItem={({ item }) => (
                <HorizontalItemCard item={item} onPress={() => addToCart(item as CatalogueItemType)} />
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
            <Text style={styles.emptyText}>No favourites found yet.</Text>
          )}
        </View>

      </ScrollView>

      <CartButton cartItems={cart} onPress={handleCartPress} />
    </View>
  );
}
