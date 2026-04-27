import { SignUpValues, User } from '@/Types/User';
import { callAPI } from './callAPI';

export const signUpUser = async (values: SignUpValues): Promise<User> => {
  return await
    callAPI({ values: values, endpoint: 'signup' })
      .then((res) => { return res as User })
      .catch((e) => { console.error('Error signing up:', e); throw new Error(e) })
      .finally(() => { console.log('Sign up process completed.') });
};
