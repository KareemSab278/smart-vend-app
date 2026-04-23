import { fakeCatalogueData } from './fakeCatalogueData';
import { CatalogueItemData } from './fetchCatalogue';

export { fetchFavourites };

const fetchFavourites = async (_userId?: number | string, _token?: string): Promise<CatalogueItemData[]> => {
    const fakeFavoriteIds = [1, 4, 7, 8];
    // ill get the real favorite ids from the api in the future soon
    const favoriteIds = await new Promise<number[]>((resolve) => setTimeout(() => resolve(fakeFavoriteIds), 500));
    return fakeCatalogueData.filter((item) => favoriteIds.includes(Number(item.id)));
};
