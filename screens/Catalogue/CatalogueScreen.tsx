import { CartButton, FiltersButton } from '@/components/Button';
import CatalogueItem from '@/components/CatalogueItem';
import { LoadingComponent, SomethingWentWrong } from '@/components/Loading';
import { SearchBar } from '@/components/SearchBar';
import { CatalogueItemData, fetchCatalogueData } from '@/helpers/fetchCatalogue';
import { CartStorage } from '@/store/Storage';
import type { OrderItem } from '@/store/StorageHelpers';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, FlatList, Text, View } from 'react-native';
import CartModal from './CartModal';
import { CatalogueFilterModal } from './CatalogueFilterModal';
import { CataloguePageTitle } from './CataloguePageTitle';
import { styles } from './Styles';

const DIETARY_FILTERS_INITIAL_STATE =
{
  gluten_free: false,
  dairy_free: false,
  peanut_free: false,
  kosher: false,
  halal: false,
  vegan: false,

}

export const CatalogueScreen = () => {
  const router = useRouter();
  const [catalogueData, setCatalogueData] = useState<CatalogueItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilters, setDietaryFilters] = useState<Record<string, boolean>>(DIETARY_FILTERS_INITIAL_STATE);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [cartModalOpen, setCartModalOpen] = useState<boolean>(false);
  const [activeTitleIndex, setActiveTitleIndex] = useState<number>(0);
  const titleAnimation = useRef(new Animated.Value(1)).current;


  const params = useLocalSearchParams();








  useEffect(() => {
    if (params.openCart === 'true') {
      loadCartItems();
      setCartModalOpen(true);
    }
  }, [params.openCart]);


  const cartItemQuantities = useMemo(
    () => new Map(cartItems.map((cartItem) => [cartItem.id, cartItem.quantity])),
    [cartItems]
  );

  const getAndSetCatalogueData = async () => {
    setLoading(true);
    try {
      await fetchCatalogueData().then(
        (data) => { data ? setCatalogueData(data as CatalogueItemData[]) : setError(true); }
      );
    } catch (err) {
      console.error('Error fetching catalogue data:', err);
      setError(true);
    }
    setLoading(false);
  };

  const loadCartItems = async () => {
    const cart = await CartStorage.getCart();
    setCartItems(cart ?? []);
  };

  const handleOpenCart = async () => {
    await loadCartItems();
    setCartModalOpen(true);
  };

  const handleItemSelect = async (item: CatalogueItemData) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    };

    await CartStorage.addToCart(cartItem as OrderItem);
    await loadCartItems();
  };



  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) {
      await CartStorage.removeFromCart(itemId);
      await loadCartItems();
      return;
    }

    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    if (!item) return;

    await CartStorage.updateCartItem({ ...item, quantity });
    await loadCartItems();
  };

  const handleRemoveItem = async (itemId: number) => {
    await CartStorage.removeFromCart(itemId);
    await loadCartItems();
  };

  useEffect(() => {
    getAndSetCatalogueData();
    loadCartItems();
  }, []);

  useEffect(() => {
    loadCartItems();
  }, [cartModalOpen === false]);

  const filteredCatalogueData = useMemo(
    () => catalogueData.filter((item) => {
      if (selectedCategory !== 'all' && item.type !== selectedCategory) {
        return false;
      }
      for (const [key, value] of Object.entries(dietaryFilters)) {
        if (value && item[key] != true) {
          return false;
        }
      }
      return true;
    }),
    [catalogueData, selectedCategory, dietaryFilters]
  );

  const visibleCatalogueData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return filteredCatalogueData;
    }

    return filteredCatalogueData.filter((item) => {
      const name = item.name?.toString().toLowerCase() ?? '';
      const description = item.description?.toString().toLowerCase() ?? '';
      return name.includes(query) || description.includes(query);
    });
  }, [filteredCatalogueData, searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.headerWithButton}>
        
        <CataloguePageTitle />

        <View style={styles.headerActions}>
          <FiltersButton onPress={() => setFilterOpen(true)} />
        </View>
      </View>

      <CatalogueFilterModal
        visible={filterOpen}
        selectedCategory={selectedCategory}
        dietaryFilters={dietaryFilters}
        onCategoryChange={setSelectedCategory}
        onDietaryChange={(key, value) =>
          setDietaryFilters((prev) => ({ ...prev, [key]: value }))
        }
        onDismiss={() => setFilterOpen(false)}
      />

      {loading && <LoadingComponent />}
      {error && <SomethingWentWrong />}

      {!loading && !error && (
        <>

          <FlatList
            data={visibleCatalogueData}
            keyExtractor={(item) => String(item.id)}
            scrollEventThrottle={16}
            ListHeaderComponent={
              <View style={styles.searchBarContainer}>
                <SearchBar
                  query={searchQuery}
                  onChangeQuery={setSearchQuery}
                  placeholder="Search products..."
                />
              </View>
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                "{searchQuery}" didn't match any items. Try adjusting your search or filters.
              </Text>
            }
            renderItem={({ item }) => {
              const itemId = Number(item.id);
              const quantity = cartItemQuantities.get(itemId) ?? 0;
              return (
                <CatalogueItem
                  item={item}
                  onPress={() => handleItemSelect(item)}
                  quantity={quantity}
                  selected={quantity > 0}
                />
              );
            }}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            style={styles.list}
          />
        </>
      )}

      <CartModal
        visible={cartModalOpen}
        items={cartItems}
        onClose={() => setCartModalOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartModalOpen(false);
          router.push('/checkout');
        }}
      />

      <CartButton cartItems={cartItems} onPress={handleOpenCart} />
    </View>
  );
}

