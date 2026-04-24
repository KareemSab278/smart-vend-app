import { CatalogueItemType } from '@/Types/Catalogue';
import { fakeCatalogueData } from './fakeCatalogueData';

export { fetchOrderHistory };


const fetchOrderHistory = async (_userId?: number | string, _token?: string): Promise<CatalogueItemType[]> => {
    const fakeOrderIds = [2, 3, 5, 6];
    const orderHistory = await new Promise<number[]>((resolve) => setTimeout(() => resolve(fakeOrderIds), 500));
    return fakeCatalogueData.filter((item) => orderHistory.includes(Number(item.id))).filter(Boolean); // no undefined items
};
