// this will do the stripe top up.

import { callAPI } from "./callAPI";

const DEVELOPMENT_MODE = true;


type paymentSuccessResponse = {
    success: boolean;
    message: string;
};

export const makeStripeTopUp = async (amount: number): Promise<paymentSuccessResponse> => {
    if (DEVELOPMENT_MODE) {
        console.log(`Simulating Stripe top-up of £${amount.toFixed(2)}`);
        return new Promise<paymentSuccessResponse>((resolve) => {
            setTimeout(() => resolve({ success: true, message: 'Simulated top-up successful' }), 3000);
        });
    }

    try {
        const response = await callAPI({
            values: { amount },
            endpoint: 'stripe-top-up',
        });
        return response as paymentSuccessResponse;
    } catch (e) {
        console.error('Error during Stripe top-up:', e);
        return { success: false, message: 'Top-up failed. Please try again.' };
    }
};