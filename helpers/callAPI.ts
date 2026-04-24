const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL as string;

type CallAPIProps = {
    values: Record<string, any>; // data struct to be sent to the API
    endpoint: string; // api endpoint
    action?: string | null; // to determine if delete, update, or create action is being performed in api (like function_call)
}

export const callAPI = async ({ values, endpoint, action }: CallAPIProps) => {

    if (!BASE_URL) throw new Error('BASE_URL is not defined in environment variables');

    try {
        const response = await fetch(`${BASE_URL}/${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...values, action: action ?? null }),
        });

        if (!response.ok) throw new Error(`Failed to call API: ${endpoint}`);

        return await response.json();

    } catch (error) {
        console.error(`Error calling API: ${endpoint}`, error);
        throw error;
    }
}