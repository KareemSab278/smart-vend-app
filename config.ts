export const DEV_MODE = (): boolean => {
    const isDev = process.env.EXPO_PUBLIC_DEVELOPMENT_MODE === 'true' as string;
    return isDev as boolean;
};