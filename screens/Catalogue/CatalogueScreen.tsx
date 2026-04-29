import { CartButton, FiltersButton } from '@/components/Button';
import { LoadingComponent, SomethingWentWrong } from '@/components/Loading';
import { CartStorage, catalogueStorage } from '@/store/Storage';
import type { OrderItem } from '@/store/StorageHelpers';
import { CatalogueItemType } from '@/Types/Catalogue';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import CartModal from './catalogueComponents/CartModal';
import { CatalogueFilterModal } from './catalogueComponents/CatalogueFilterModal';
import { CatalogueList } from './catalogueComponents/CatalogueList';
import { CataloguePageTitle } from './catalogueComponents/CataloguePageTitle';
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
  const params = useLocalSearchParams();
  const [catalogueData, setCatalogueData] = useState<CatalogueItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilters, setDietaryFilters] = useState<Record<string, boolean>>(DIETARY_FILTERS_INITIAL_STATE);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [cartModalOpen, setCartModalOpen] = useState<boolean>(false);
  const allOk = !loading && !error && catalogueData.length > 0;


  const getAndSetCatalogueData = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await catalogueStorage.getCatalogueData();
      if (Array.isArray(data) && data.length > 0) {
        setCatalogueData(data as CatalogueItemType[]);
        console.log('Catalogue data loaded from cache.');
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };


  const loadCartItems = async () =>
    await CartStorage.getCart().then((data) => setCart(data as OrderItem[])).catch(() => setCart([]));

  const handleOpenCart = async () => await loadCartItems().then(() => setCartModalOpen(true));


  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    quantity < 1 && (await CartStorage.removeFromCart(itemId).then(loadCartItems));
    if (quantity < 1) return;

    const item = cart.find((cartItem) => cartItem.id === itemId);
    if (!item) return;

    await CartStorage.updateCartItem({ ...item, quantity }).then(loadCartItems);
  };



  const handleRemoveItem = async (itemId: number) => await CartStorage.removeFromCart(itemId).then(loadCartItems);

  const handleItemSelect = async (item: CatalogueItemType) => {
    const { id, name, price } = item;

    await CartStorage.addToCart({ id, name, price, quantity: 1 } as OrderItem).then(loadCartItems);
  };


  useEffect(() => { getAndSetCatalogueData().then(loadCartItems) }, []);

  useEffect(() => { loadCartItems() }, [cartModalOpen === false]);

  useEffect(() => {
    (params.openCart === 'true') && loadCartItems().then(() => setCartModalOpen(true));
  }, [params.openCart]);

  useEffect(() => {
    params.category_filter === 'drink' && setSelectedCategory('drink');
  }, []);


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

      {allOk && <CatalogueList
        cart={cart}
        handleItemSelect={handleItemSelect}
        catalogueData={catalogueData}
        selectedCategory={selectedCategory}
        dietaryFilters={dietaryFilters}
      />
      }

      <CartModal
        visible={cartModalOpen}
        cart={cart}
        onClose={() => setCartModalOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          router.push('/checkout');
          setCartModalOpen(false);
        }}
      />

      {!cartModalOpen && <CartButton cartItems={cart} onPress={handleOpenCart} />}
    </View>
  );
}