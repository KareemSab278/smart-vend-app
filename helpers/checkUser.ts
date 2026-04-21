
import { UserStorage } from '@/store/Storage';

export { checkUser };

const checkUser = async () => {
    const user = await UserStorage.getUser();
    return Boolean(user);
};
