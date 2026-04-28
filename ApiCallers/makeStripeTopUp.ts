// Creates a Stripe PaymentIntent on the backend and returns the client_secret
// for the frontend to confirm the payment with the Stripe SDK.

import { callAPI } from "./callAPI";

const DEVELOPMENT_MODE = true;

export type PaymentIntentResponse = {
    success: boolean;
    client_secret?: string;
    payment_intent_id?: string;
    amount?: number;
    currency?: string;
    error?: string;
};

export const makeStripeTopUp = async (amount: number, currency = 'GBP'): Promise<PaymentIntentResponse> => {
    if (amount <= 0) {
        return { success: false, error: 'Amount must be greater than zero.' };
    }

    if (DEVELOPMENT_MODE) {
        console.log(`[DEV] Simulating PaymentIntent for £${amount.toFixed(2)}`);
        return new Promise((resolve) =>
            setTimeout(() => resolve({
                success: true,
                client_secret: 'pi_dev_secret_simulated',
                payment_intent_id: 'pi_dev_simulated',
                amount,
                currency: 'gbp',
            }), 500)
        );
    }

    try {
        const response = await callAPI({
            values: {
                amount: amount,
                currency: currency.toLowerCase() // MUST BE GBP FOR STRIPE TO ACCEPT IT
            },
            endpoint: 'stripe-top-up',
            action: 'validateStripeTopUp',
        });
        return response as PaymentIntentResponse;
    } catch (e) {
        console.error('Error creating PaymentIntent:', e);
        return { success: false, error: 'Failed to start payment. Please try again.' };
    }
};