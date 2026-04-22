import { fakeCatalogueData } from "./fakeCatalogueData";

export type CatalogueItemData = {
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

export { fetchCatalogueData };

const fetchCatalogueData = async (): Promise<CatalogueItemData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1700));
  return fakeCatalogueData as CatalogueItemData[];
};

