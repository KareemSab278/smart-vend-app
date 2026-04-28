import { checkUser } from "@/Security/checkUser";
import { UserStorage } from "@/store/Storage";
import { RelativePathString, useRouter } from "expo-router";
import { useEffect } from "react";


const signInCheck = async (): Promise<boolean> => {
    return Boolean(await checkUser());
};


export const IfUserNotSignedIn = ({ goTo }: { goTo: string }) => {
    const router = useRouter();

    const checkUser = async () => {
        const isSignedIn = await signInCheck();

        if (!isSignedIn) {
            router.replace(goTo as RelativePathString);
        } else {
            await UserStorage.getUser()
        }
    };

    useEffect(() => { checkUser() }, []);

    return null;
}

export const IfUserSignedIn = ({ goTo }: { goTo: string }) => {
    useEffect(() => { signInCheck() }, []);
    return null;
}
