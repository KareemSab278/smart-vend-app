
// designed User to be single source of truth for all app at all times
export interface User extends marketCard { // fields are required. if any missing then refuse app use or sign in/sign up!
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
    address1: string;
    address2?: string;
    city: string;
    county: string;
    postcode: string;
    phone: string;
}

interface marketCard {
  market_card_number: number | string;
  market_card_pin: number | null;
  market_card_balance: number | 0; // balance can be 0 but not null!!!!!!!!
  hot_drinks_count: number | 0; // can be 0 but not null!!!!!!!!
  free_drinks: number | 0; // user can have more than 1 free drink, so this is a count of free drinks, can be 0 but not null!!!!!!!!
}

export interface SignInValues {
    email: string;
    password: string;
}

export interface AddressValues {
  address1: string;
  address2?: string;
  city: string;
  county: string;
  postcode: string;
  phone: string;
};

export interface SignUpValues extends SignInValues, AddressValues {
  first_name: string;
  last_name: string;
  phone: string;
  subscribe?: boolean;
}
