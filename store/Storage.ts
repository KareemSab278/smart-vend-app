import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { OrderItem, organiseOrder } from './StorageHelpers';

const isWeb = Platform.OS === 'web';

const Storage = {
    saveValToKey: async (key: string, value: string) => {
        try {
            if (isWeb) {
                localStorage.setItem(key, value);
            } else {
                await AsyncStorage.setItem(key, value);
            }
        } catch (e) {
            console.error('Error storing value to key:', e);
        }
    },

    getDataFromKey: async (key: string) => {
        try {
            if (isWeb) {
                return localStorage.getItem(key);
            }
            return await AsyncStorage.getItem(key);
        } catch (e) {
            console.error('Error retrieving data from key:', e);
        }
    },

    saveObjToKey: async (key: string, value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            if (isWeb) {
                localStorage.setItem(key, jsonValue);
            } else {
                await AsyncStorage.setItem(key, jsonValue);
            }
        } catch (e) {
            console.error('Error storing object to key:', e);
        }
    },

    getObjFromKey: async (key: string) => {
        try {
            const jsonValue = isWeb
                ? localStorage.getItem(key)
                : await AsyncStorage.getItem(key);
            return jsonValue !== null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error('Error retrieving object from key:', e);
        }
    },

    removeDataFromKey: async (key: string) => {
        try {
            if (isWeb) {
                localStorage.removeItem(key);
            } else {
                await AsyncStorage.removeItem(key);
            }
        } catch (e) {
            console.error('Error removing data from key:', e);
        }
    },

    clearAllData: async () => {
        try {
            if (isWeb) {
                localStorage.clear();
            } else {
                await AsyncStorage.clear();
            }
        } catch (e) {
            console.error('Error clearing all data:', e);
        }
    },


};

interface User { // fields are required. if any missing then refuse app use or sign in/sign up!
    id: number;
    market_card_number: number;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
}

const UserStorage = {
    saveUser: async (user: User) => {
        try {
            await Storage.saveObjToKey('user', user);
        } catch (e) {
            console.error('Error saving user:', e);
        }
    },

    getUser: async () => {
        try {
            return await Storage.getObjFromKey('user') as User | null;
        } catch (e) {
            console.error('Error retrieving user:', e);
        }
    },

    clearUser: async () => { // for sign out
        try {
            await Storage.removeDataFromKey('user');
        } catch (e) {
            console.error('Error clearing user:', e);
        }
    }
}

const CartStorage = {
    addToCart: async (item: OrderItem) => {
        try {
            const cart = await Storage.getObjFromKey('cart') || [];
            cart.push(item);
            await Storage.saveObjToKey('cart', cart);
        } catch (e) {
            console.error('Error adding item to cart:', e);
        }
    },

    getCart: async () => {
        try {
            const cart = await Storage.getObjFromKey('cart') || [];
            return organiseOrder(cart as OrderItem[]);
        } catch (e) {
            console.error('Error retrieving cart:', e);
        }
    },

    saveCartItems: async (items: OrderItem[]) => {
        try {
            await Storage.saveObjToKey('cart', items);
        } catch (e) {
            console.error('Error saving cart items:', e);
        }
    },

    updateCartItem: async (item: OrderItem) => {
        try {
            const cart = (await Storage.getObjFromKey('cart')) || [];
            const filteredCart = (cart as OrderItem[]).filter(
                (cartItem) => cartItem.id !== item.id
            );

            if (item.quantity > 0) {
                filteredCart.push(item);
            }

            await Storage.saveObjToKey('cart', filteredCart);
        } catch (e) {
            console.error('Error updating cart item:', e);
        }
    },

    removeFromCart: async (itemId: number) => {
        try {
            const cart = (await Storage.getObjFromKey('cart')) || [];
            const filteredCart = (cart as OrderItem[]).filter(
                (cartItem) => cartItem.id !== itemId
            );
            await Storage.saveObjToKey('cart', filteredCart);
        } catch (e) {
            console.error('Error removing cart item:', e);
        }
    },

    clearCart: async () => {
        try {
            await Storage.removeDataFromKey('cart');
        } catch (e) {
            console.error('Error clearing cart:', e);
        }
    }
}

export { CartStorage, Storage, User, UserStorage };

