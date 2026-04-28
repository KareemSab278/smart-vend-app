import { fetchAndSaveUserInfoToCache } from "@/ApiCallers/fetchAndSaveUserInfoToCache";
import { checkUser } from "@/Security/checkUser";
import { User } from "@/Types/User";
import { RelativePathString, useRouter } from "expo-router";
import { useEffect } from "react";

const router = useRouter();


const signInCheck = async (): Promise<boolean> => {
    const user = await checkUser() as unknown as User;
    if (user.id > 0) {
        return true;
    }
    else { return false }
};


export const IfUserNotSignedIn = ({ goTo }: { goTo: string }) => {

    const checkUser = async () => {
        const isSignedIn = await signInCheck();

        if (!isSignedIn) {
            router.replace(goTo as RelativePathString);
        } else {
            await fetchAndSaveUserInfoToCache();
        }
    };

    useEffect(() => {
        checkUser();
    }, [router]);

    return null;
}

export const IfUserSignedIn = ({ goTo }: { goTo: string }) => {
    useEffect(() => { signInCheck() }, [router]);
    return null;
}
