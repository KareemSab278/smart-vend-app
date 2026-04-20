import { FiltersButton } from '@/components/Button';
import { LoadingComponent, SomethingWentWrong } from '@/components/Loading';
import { CatalogueItemData, fetchCatalogueData } from '@/helpers/getCatalogueItemData';
import { CartStorage } from '@/store/Storage';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import CatalogueItem from '../../components/CatalogueItem';
import { CatalogueFilterModal } from './CatalogueFilterModal';
import { styles } from './Styles';

const categoryOptions = [
  { label: 'All', value: 'all' },
  { label: 'Drinks', value: 'drink' },
  { label: 'Snacks', value: 'snack' },
  { label: 'Food', value: 'food' },
  { label: 'Dessert', value: 'dessert' },
];

const dietaryOptions = [
  { label: 'Gluten-Free', value: 'gluten_free' },
  { label: 'Dairy-Free', value: 'dairy_free' },
  { label: 'Peanut-Free', value: 'peanut_free' },
  { label: 'Kosher', value: 'kosher' },
  { label: 'Halal', value: 'halal' },
  { label: 'Vegan', value: 'vegan' },
];

const handleItemSelect = async (item: CatalogueItemData) => {
  const cartItem = {
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: 1,
  };
  await CartStorage.addToCart(cartItem);
  console.log('Added to cart:', cartItem);
  console.log('Current cart:', await CartStorage.getCart());
};

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

  useEffect(() => { getAndSetCatalogueData(); }, []);

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
    </View>
  );
}

