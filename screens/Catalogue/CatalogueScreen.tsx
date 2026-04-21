import { FiltersButton } from '@/components/Button';
import CatalogueItem from '@/components/CatalogueItem';
import { LoadingComponent, SomethingWentWrong } from '@/components/Loading';
import { CatalogueItemData, fetchCatalogueData } from '@/helpers/fetchCatalogueItemData';
import { CartStorage } from '@/store/Storage';
import type { OrderItem } from '@/store/StorageHelpers';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import CartModal from './CartModal';
import { CatalogueFilterModal } from './CatalogueFilterModal';
import { styles } from './Styles';

export default function CatalogueScreen() {
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

    await CartStorage.addToCart(cartItem);
    await loadCartItems();
  };

  const handleOpenCart = async () => {
    await loadCartItems();
    setCartModalOpen(true);
  };

  const handleCloseCart = () => {
    setCartModalOpen(false);
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
        <Text style={styles.title}>Catalogue</Text>
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
              renderItem={({ item }) => (
                <CatalogueItem
                  item={item}
                  onPress={() => handleItemSelect(item)}
                />
              )}
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
        onClose={handleCloseCart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

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
    </View>
  );
}

