export interface User { // fields are required. if any missing then refuse app use or sign in/sign up!
    id: number;
    market_card_number: number;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
}

export interface UserProfileEditValues {
  first_name: string;
  last_name: string;
  email: string;
}

export interface SignUpValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address1: string;
  address2?: string;
  city: string;
  county: string;
  postcode: string;
  phone: string;
  subscribe?: boolean;
}

export interface SignInValues {
    email: string;
    password: string;
}

export interface AddressValues {
  address1: string;
  address2: string;
  city: string;
  county: string;
  postcode: string;
  phone: string;
};

