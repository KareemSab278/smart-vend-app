import { catalogueStorage } from "@/store/Storage";
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

const fetchCatalogueData = async (): Promise<CatalogueItemData[]> => {
  // get fresh catalogue when this fn is called and save to cache
  console.log('Fetching catalogue data...');
  const catalogueData = await new Promise((resolve) => setTimeout(() => resolve(fakeCatalogueData), 1700));
  await catalogueStorage.saveCatalogueData(catalogueData);
  return catalogueData as CatalogueItemData[];
};


export { fetchCatalogueData };

