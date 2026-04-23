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
  const existingCatalogue = await catalogueStorage.getCatalogueData();
  if (Array.isArray(existingCatalogue) && existingCatalogue.length > 0) {
    return existingCatalogue as CatalogueItemData[];
  }

  await new Promise((resolve) => setTimeout(resolve, 1700));
  await catalogueStorage.saveCatalogueData(fakeCatalogueData);
  return fakeCatalogueData;
};

const getCachedCatalogueData = async (): Promise<CatalogueItemData[] | null> => {
  const existingCatalogue = await catalogueStorage.getCatalogueData();
  return Array.isArray(existingCatalogue) ? (existingCatalogue as CatalogueItemData[]) : null;
};

export { fetchCatalogueData, getCachedCatalogueData };

