import { SignInValues, User } from "@/Types/User";
import { callAPI } from "./callAPI";


const DEVELOPMENT_MODE = true;

export const signInUser = async (values: SignInValues): Promise<User> => {

    if (DEVELOPMENT_MODE) {
        console.log('Development mode: returning dummy user for sign-in');
        return {
            id: 1234,
            market_card_number: 123456789000,
            market_card_pin: 1234, // can be null in real API response
            market_card_balance: 5.80, // can be 0 in real API response but not null
            first_name: 'Tester',
            last_name: 'User',
            email: 'tester@example.com',
            token: 'dummy-token',
            address1: '123 Main St',
            address2: 'Apt 4B',
            city: 'Anytown',
            county: 'Anycounty',
            postcode: '12345',
            phone: '555-1234',
            hot_drinks_count: 3, 
            free_drinks: 2
        } as User;
    };

    console.log('Attempting to sign in user with email:', values.email);
    return await
        callAPI({ values: values, endpoint: 'sign-in' })
            .then(res => res as User)
            .catch(e => { console.error('Error signing in:', e); throw new Error(e) })
};

const handleGoogleSignIn = async (googleUser: any): Promise<string> => {
    return '';
    // https://dev.to/yhoungbrown/google-sign-in-in-react-native-expo-a-practical-production-ready-guide-5g48;
};

const handleAppleSignIn = async (): Promise<string> => {
    return '';
    // https://dev.to/yhoungbrown/apple-sign-in-in-react-native-expo-a-practical-production-ready-guide-5g48;
};