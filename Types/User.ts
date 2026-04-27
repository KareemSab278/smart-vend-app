export interface User { // fields are required. if any missing then refuse app use or sign in/sign up!
    id: number;
    market_card_number: number;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
    market_card_pin?: number | null;
    address1: string;
    address2?: string;
    city: string;
    county: string;
    postcode: string;
    phone: string;
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
