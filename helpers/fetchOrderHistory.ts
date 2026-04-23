import { fakeOrderHistoryData } from './fakeOrderHistoryData';
import { CatalogueItemData } from './fetchCatalogue';

export { fetchOrderHistory };

// TODO: replace with real API call once endpoint is available
// e.g. GET https://coinadrink-backend.onrender.com/api/users/:id/orders
// with Authorization: Bearer <token>
const fetchOrderHistory = async (_userId?: number | string, _token?: string): Promise<CatalogueItemData[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return fakeOrderHistoryData;
};
