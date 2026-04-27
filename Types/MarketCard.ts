
export interface MarketCard {
    market_card_number: number;
    credit: number;
    pin?: number; // they can add a pin if they want
}

export interface HotDrinks {
    hot_drinks_count: number;
    has_free_drink: boolean;
}