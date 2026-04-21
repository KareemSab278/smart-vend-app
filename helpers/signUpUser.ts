import { User } from '@/store/Storage';

export interface SignUpValues {
  firstName: string;
  lastName: string;
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

export { signUpUser };

const signUpUser = async (values: SignUpValues) => {
  try {
    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      address1: values.address1,
      address2: values.address2,
      city: values.city,
      county: values.county,
      postcode: values.postcode,
      phone: values.phone,
      subscribe: values.subscribe,
    };

    const response = await fetch('https://coinadrink-backend.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }

    const data = await response.json();
    return data as User;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};
