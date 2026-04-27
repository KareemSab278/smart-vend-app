import { UserStorage } from '@/store/Storage';
import { HotDrinks, MarketCard } from '@/Types/MarketCard';
import { callAPI } from './callAPI';

const DEVELOPMENT_MODE = true;

export type FetchedMarketCard = {
    marketCard: MarketCard;
    hotDrinks: HotDrinks;
};

export const fetchMarketCard = async (): Promise<FetchedMarketCard> => {

    const user = await UserStorage.getUser();
    if (!user) throw new Error('No user found');

    if (DEVELOPMENT_MODE) {
        return {
            marketCard: {
                market_card_number: user.market_card_number,
                credit: 4.50,
            },
            hotDrinks: {
                hot_drinks_count: 7,
                has_free_drink: false,
            },
        };
    }

    return await callAPI({
        values: { market_card_number: user.market_card_number, token: user.token },
        endpoint: 'market-card',
    })
        .then(res => res as FetchedMarketCard)
        .catch(e => { console.error('Error fetching market card:', e); throw new Error(e); });
};

