import { StyleProp, ViewStyle } from "react-native";

export type CatalogueItemType = {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image?: string;
  peanut_free?: boolean;
  gluten_free?: boolean;
  dairy_free?: boolean;
  kosher?: boolean;
  halal?: boolean;
  vegan?: boolean;
  vegetarian?: boolean;
  type?: 'drink' | 'snack' | 'other' | 'food' | 'sandwich' | 'dessert' | string;
  [key: string]: unknown;
};

export type CatalogueItemProps = {
  item: CatalogueItemType;
  onPress?: () => void;
  quantity?: number;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};