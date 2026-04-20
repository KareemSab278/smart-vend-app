import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

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

const UserStorage = {
    saveUser: async (user: any) => {
        try {
            await Storage.saveObjToKey('user', user);
        } catch (e) {
            console.error('Error saving user:', e);
        }
    },

    getUser: async () => {
        try {
            return await Storage.getObjFromKey('user');
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
    addToCart: async (item: any) => {
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
            return await Storage.getObjFromKey('cart') || [];
        } catch (e) {
            console.error('Error retrieving cart:', e);
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

export { CartStorage, Storage, UserStorage };

