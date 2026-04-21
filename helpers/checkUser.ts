import { UserStorage } from "@/store/Storage";
export { checkUser };

const IGNORE_SECURITY = 1; // for development purposes, set to true to ignore user authentication and always return true from checkUser

// if user does not exist on device in storage, return false, else return true. home and sign in handle this fn
const checkUser = async () => {
    return IGNORE_SECURITY ? true : Boolean(await UserStorage.getUser());
};
