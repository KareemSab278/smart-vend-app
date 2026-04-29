import { UserStorage } from "@/store/Storage";
import { User } from "@/Types/User";
import { callAPI } from "./callAPI";

const DEVELOPMENT_MODE = true;


export const fetchAndSaveUserInfoToCache = async (): Promise<void> => {
    const currentUser = await UserStorage.getUser();

    if (!currentUser || !currentUser.id) {
        throw new Error('No user found in storage. Cannot fetch user info without a valid user ID.');
    }

    if (DEVELOPMENT_MODE) {
        console.log('Development mode: saving dummy user for fetchUserInfo');
        await UserStorage.saveUser(fakeUser as User);
        return;
    }


    console.log('Attempting to fetch user info for user ID:', currentUser.id);
    const updatedUser = await
        callAPI({ values: { user_id: currentUser.id }, endpoint: 'fetch-user-info' })
            .then(res => res as User)
            .catch(e => { console.error('Error fetching user info:', e); throw new Error(e) });
    await UserStorage.saveUser(updatedUser).then(() => console.log('latest user info updated in storage'));

};

const fakeUser: User = {
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
    hot_drinks_count: 4,
    free_drinks: 2
};