import { checkUser } from "@/Security/checkUser";
import { RelativePathString, useRouter } from "expo-router";
import { useEffect } from "react";

const router = useRouter();

export const IfUserNotSignedIn = ({ goTo }: { goTo: string }) => {
    useEffect(() => {
        (async () => { await checkUser().then(auth => !auth && router.replace(goTo as RelativePathString)) })()
    }, [router]);

    return null;
}

export const IfUserSignedIn = ({ goTo }: { goTo: string }) => {
    useEffect(() => {
        (async () => { await checkUser().then(auth => auth && router.replace(goTo as RelativePathString)) })()
    }, [router]);

    return null;
}
