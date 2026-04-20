import { MainButton } from '@/components/Button';
import { LoadingComponent, SomethingWentWrong } from '@/components/Loading';
import { CatalogueItemData, fetchCatalogueData } from '@/helpers/getCatalogueItemData';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CatalogueItem from '../../components/CatalogueItem';
import { CatalogueFilterModal } from './CatalogueFilterModal';

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
        <MainButton title="Filters" onPress={() => setFilterOpen(true)} style={styles.filterButton} />
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
                  onPress={() => console.log('Selected', item.name)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    paddingTop: 24,
    paddingHorizontal: 24,
    marginBottom: 12,
    fontSize: 32,
    fontWeight: '700',
  },
  headerWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  filters: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  scrollGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
  filterButton: {
    marginTop: 16,
  },
  modalContainer: {
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 18,
  },
  filterItem: {
    marginRight: 8,
  },
  toggleItem: {
    marginRight: 12,
    minWidth: 150,
  },
  applyButton: {
    marginTop: 18,
  },
  emptyText: {
    paddingHorizontal: 24,
    marginTop: 18,
    fontSize: 16,
    color: '#666',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 12,
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
