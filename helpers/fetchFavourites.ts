import { fakeFavouritesData } from './fakeFavorites';
import { CatalogueItemData } from './fetchCatalogue';

export { fetchFavourites };

const fetchFavourites = async (_userId?: number | string, _token?: string): Promise<CatalogueItemData[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return fakeFavouritesData;
};
