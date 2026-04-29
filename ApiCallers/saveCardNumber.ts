import { DEV_MODE } from '@/config';
import { UserStorage } from '@/store/Storage';
import { callAPI } from "./callAPI";


type ExpectedResponse = {
    success: boolean;
    market_card_number?: number;
    error?: string;
};


export const saveCardNumber = async (card_num: number, user_id: number): Promise<ExpectedResponse> => {

    if (DEV_MODE()) {
        await saveUser(card_num);
        return { success: true, market_card_number: card_num };
    }

    try {
        const response = await callAPI({
            values: { card_number: card_num, user_id: user_id },
            endpoint: '/user/update_card_number',
            action: 'update_card_number'
        });

        if (response.success) {
            await saveUser(card_num);
        }

        return response as ExpectedResponse;

    } catch (error) {
        console.error('Error saving card number:', error);
        throw error;
    }
};

const saveUser = async (card_num: number) => {
    const user = await UserStorage.getUser();
    if (!user) throw new Error('No user found');
    const updatedUser = { ...user, market_card_number: card_num };
    await UserStorage.saveUser(updatedUser);
}