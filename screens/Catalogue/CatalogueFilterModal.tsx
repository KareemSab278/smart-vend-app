import { StyleSheet, Text, View } from 'react-native';
import AppModal from '../../components/Modal';
import RadioButton from '../../components/RadioButton';
import Toggle from '../../components/Toggle';

type CatalogueFilterModalProps = {
  visible: boolean;
  selectedCategory: string;
  dietaryFilters: Record<string, boolean>;
  onCategoryChange: (value: string) => void;
  onDietaryChange: (key: string, value: boolean) => void;
  onDismiss: () => void;
};

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
export { CatalogueFilterModal };

const CatalogueFilterModal = ({
  visible,
  selectedCategory,
  dietaryFilters,
  onCategoryChange,
  onDietaryChange,
  onDismiss,
}: CatalogueFilterModalProps) => {
  return (
    <AppModal visible={visible} title="Filters" onClose={onDismiss}>
      <Text style={styles.filterTitle}>Categories</Text>
      <View style={styles.categoryGridGroup}>
        {categoryOptions.map((option) => (
          <RadioButton
            key={option.value}
            label={option.label}
            value={option.value}
            selectedValue={selectedCategory}
            onChange={onCategoryChange}
            style={styles.filterItem}
          />
        ))}
      </View>

      <Text style={styles.filterTitle}>Dietary</Text>
      <View style={styles.dietaryGridGroup}>
        {dietaryOptions.map((option) => (
          <Toggle
            key={option.value}
            label={option.label}
            value={dietaryFilters[option.value] ?? false}
            onChange={(value) => onDietaryChange(option.value, value)}
            style={styles.toggleItem}
          />
        ))}
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  filterTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  categoryGridGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  dietaryGridGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  filterItem: {
    marginRight: 8,
    marginBottom: 8,
  },
  toggleItem: {
    width: '48%',
    marginBottom: 16,
  },
  applyButton: {
    marginTop: 18,
  },
});
