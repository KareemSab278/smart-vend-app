import { FiltersButton } from '@/components/Button';
import CatalogueItem from '@/components/CatalogueItem';
import { LoadingComponent, SomethingWentWrong } from '@/components/Loading';
import { CatalogueItemData, fetchCatalogueData } from '@/helpers/fetchCatalogue';
import { CartStorage } from '@/store/Storage';
import type { OrderItem } from '@/store/StorageHelpers';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, FlatList, Text, TouchableOpacity, View } from 'react-native';
import CartModal from './CartModal';
import { CatalogueFilterModal } from './CatalogueFilterModal';
import { styles } from './Styles';

export const CatalogueScreen = () => {
  const router = useRouter();
  const [catalogueData, setCatalogueData] = useState<CatalogueItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilters, setDietaryFilters] = useState<Record<string, boolean>>({
    gluten_free: false,
    dairy_free: false,
    peanut_free: false,
    kosher: false,
    halal: false,
    vegan: false,
  });
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [cartModalOpen, setCartModalOpen] = useState<boolean>(false);
  const [activeTitleIndex, setActiveTitleIndex] = useState<number>(0);
  const titleAnimation = useRef(new Animated.Value(1)).current;
  const cartButtonAnimation = useRef(new Animated.Value(0)).current;
  const previousCartLength = useRef(0);

  const params = useLocalSearchParams();
  const pageTitles = ['Today\'s Catalogue', 'Hungry?', 'Got Cravings?', 'Thirsty?', 'Our Selection', 'Find Your Flavor', 'What Will It Be?'];

  const animateTitleSwap = useCallback(() => {
    Animated.timing(titleAnimation, {
      toValue: 0,
      duration: 800,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setActiveTitleIndex((prev) => (prev + 1) % pageTitles.length);
      Animated.timing(titleAnimation, {
        toValue: 1,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  }, [titleAnimation]);

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

  useEffect(() => {
    const interval = setInterval(animateTitleSwap, 7000);
    return () => clearInterval(interval);
  }, [animateTitleSwap]);


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

  const handleOpenCart = async () => {
    await loadCartItems();
    setCartModalOpen(true);
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

  return (
    <View style={styles.container}>
      <View style={styles.headerWithButton}>
        <Animated.Text
          style={[
            styles.title,
            { opacity: titleAnimation },
          ]}
        >
          {pageTitles[activeTitleIndex]}
        </Animated.Text>

        <FiltersButton onPress={() => setFilterOpen(true)} />
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
          {filteredCatalogueData.length === 0 ? (
            <Text style={styles.emptyText}>No items match your filters.</Text>
          ) : (
            <FlatList
              data={filteredCatalogueData}
              keyExtractor={(item) => String(item.id)}
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
          )}
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

      {cartItems.length > 0 && (
        <Animated.View
          style={{
            transform: [{ scale: cartButtonAnimation }],
            opacity: cartButtonAnimation,
          }}
        >
          <TouchableOpacity style={styles.cartButton} onPress={handleOpenCart}>
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
    </View>
  );
}

