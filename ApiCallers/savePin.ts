
import { DEV_MODE } from "@/config";
import { callAPI } from "./callAPI";

type Response = {
    success: boolean;
    error?: string;
};

export const savePin = async (pin: number, user_id: number): Promise<Response> => {

    if (DEV_MODE) {
        return { success: true };
    }

    try {
        return await callAPI({
            values: { pin: pin, user_id: user_id },
            endpoint: '/user/update_pin',
            action: 'update_pin'
        }) as Response;

    } catch (error) {
        console.error('Error saving PIN:', error);
        throw error;
    }
};
