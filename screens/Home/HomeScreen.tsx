import { fetchCatalogueData } from '@/ApiCallers/fetchCatalogue';
import { fetchFavourites } from '@/ApiCallers/fetchFavourites';
import { fetchOrderHistory } from '@/ApiCallers/fetchOrderHistory';
import { CartButton } from '@/components/Button';
import { HorizontalItemCard } from '@/components/CatalogueItem';
import { LoadingComponent } from '@/components/Loading';
import { IfUserNotSignedIn } from '@/Security/signInCheck';
import { CartStorage } from '@/store/Storage';
import { OrderItem } from '@/store/StorageHelpers';
import { CatalogueItemType } from '@/Types/Catalogue';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { styles } from './Styles';

export default function HomeScreen() {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [favourites, setFavourites] = useState<CatalogueItemType[]>([]);
  const [history, setHistory] = useState<CatalogueItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const loadData = async () => {
    setLoading(true);
    await Promise.all([
      CartStorage.getCart().then(c => setCart(c as OrderItem[])),
      fetchOrderHistory().then(setHistory),
      fetchFavourites().then(setFavourites),
      fetchCatalogueData()
    ])
      .catch(e => console.error('Error loading data:', e));
    setLoading(false);
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
          <Text style={styles.title}>Your Dashboard</Text>
          <Text style={styles.subtitle}>Explore our latest products and offers</Text>
        </View>



        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Favourites</Text>
          {loading && favourites.length < 1 && <LoadingComponent />}
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
            !loading && <Text style={styles.emptyText}>No favourites found yet.</Text>
          )}
        </View>



        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Order History</Text>
          {loading && history.length < 1 && <LoadingComponent />}
          {history.length > 0 ? (
            <FlatList
              data={history}
              keyExtractor={(item) => String(item.id)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.hList}
              renderItem={({ item }) => (
                <HorizontalItemCard item={item} onPress={() => addToCart(item)} />
              )}
            />
          ) : (
            !loading && <Text style={styles.emptyText}>No order history found yet.</Text>
          )}
        </View>

      </ScrollView>

      <CartButton cartItems={cart} onPress={handleCartPress} />
    </View>
  );
}
