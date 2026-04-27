import { catalogueStorage } from "@/store/Storage";
import { CatalogueItemType } from '@/Types/Catalogue';
import { fakeCatalogueData } from "./fakeCatalogueData";


const fetchCatalogueData = async (): Promise<CatalogueItemType[]> => {
  // get fresh catalogue when this fn is called and save to cache
  console.log('Fetching catalogue data...');
  const catalogueData = await new Promise((resolve) => setTimeout(() => resolve(fakeCatalogueData), 1700));
  await catalogueStorage.saveCatalogueData(catalogueData);
  console.log('Catalogue data fetched and saved to cache successfully');
  return catalogueData as CatalogueItemType[];
};


export { fetchCatalogueData };

