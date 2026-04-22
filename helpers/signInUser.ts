import { User } from "@/store/Storage";

interface SignInValues {
    email: string;
    password: string;
}

export { signInUser, SignInValues };

const signInUser = async (values: SignInValues): Promise<User> => {
    try {
        const response = await fetch('https://coinadrink-backend.onrender.com/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            throw new Error('Failed to sign in');
        }

        const data = await response.json();
        return data as User;
        
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

const handleGoogleSignIn = async (googleUser: any): Promise<string> => {
    return ''; 
    // https://dev.to/yhoungbrown/google-sign-in-in-react-native-expo-a-practical-production-ready-guide-5g48;
};

const handleAppleSignIn = async (): Promise<string> => {
    return ''; 
    // https://dev.to/yhoungbrown/apple-sign-in-in-react-native-expo-a-practical-production-ready-guide-5g48;
};