const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL as string;

type CallAPIProps = {
    values: Record<string, any>;
    endpoint: string;
}

export const callAPI = async ({ values, endpoint }: CallAPIProps) => {

    if (!BASE_URL) throw new Error('BASE_URL is not defined in environment variables');

    try {
        const response = await fetch(`${BASE_URL}/${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error(`Failed to call API: ${endpoint}`);

        return await response.json();

    } catch (error) {
        console.error(`Error calling API: ${endpoint}`, error);
        throw error;
    }
}