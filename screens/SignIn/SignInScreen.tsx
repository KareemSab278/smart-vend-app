import { signInUser } from '@/ApiCallers/signInUser';
import { signUpUser } from '@/ApiCallers/signUpUser';
import { LoadingComponent, SomethingWentWrong } from '@/components/Loading';
import AppModal from '@/components/Modal';
import { checkUser } from '@/Security/checkUser';
import { IfUserSignedIn } from '@/Security/signInCheck';
import { UserStorage } from '@/store/Storage';
import { SignInValues, SignUpValues, User } from '@/Types/User';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { LogInForm } from './LogInForm';
import { RegisterForm } from './RegisterForm';
import { SignInStyles } from './Styles';

export default function SignInScreen({ initialMode = 'login' }: { initialMode?: 'login' | 'register' }) {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => { (async () => { await checkUser().then(auth => auth && router.replace('/')) })() }, [router]);

  const handleSignIn = async ({ email, password }: SignInValues) => {
    try {
      setLoading(true);
      const user: User = await signInUser({ email: email, password: password });
      await UserStorage.saveUser(user);
      setStatusMessage(`Signing you in`);
      setTimeout(() => {
        router.replace('/');
      }, 1500);
    } catch {
      setError(true);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const handleRegister = async (data: SignUpValues) => {
    try {
      setLoading(true);
      const user = await signUpUser(data) as unknown as User;
      await UserStorage.saveUser(user);
      setStatusMessage(`Registering your account`);
      setTimeout(() => {
        router.replace('/');
      }, 1500);
    } catch {
      setError(true);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <KeyboardAvoidingView
      style={SignInStyles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <IfUserSignedIn goTo="/" />

      <ScrollView contentContainerStyle={SignInStyles.container} keyboardShouldPersistTaps="handled">
        <View style={SignInStyles.header}>
          <Text style={SignInStyles.title}>{mode === 'login' ? 'Welcome back' : 'Create your account'}</Text>
        </View>

        <View style={SignInStyles.switchButtons}>
          <TouchableOpacity
            style={[SignInStyles.switchTab, mode === 'login' && SignInStyles.switchTabActive]}
            onPress={() => setMode('login')}
          >
            <Text style={[SignInStyles.switchTabText, mode === 'login' && SignInStyles.switchTabTextActive]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[SignInStyles.switchTab, mode === 'register' && SignInStyles.switchTabActive]}
            onPress={() => setMode('register')}
          >
            <Text style={[SignInStyles.switchTabText, mode === 'register' && SignInStyles.switchTabTextActive]}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <View style={SignInStyles.card}>
          {mode === 'login' ? (
            <LogInForm
              onSwitchToRegister={() => setMode('register')}
              onSubmit={handleSignIn}
            />
          ) : (
            <RegisterForm onSwitchToLogin={() => setMode('login')} onSubmit={handleRegister} />
          )}
        </View>

        <AppModal visible={error} onClose={() => setError(false)}>
          <SomethingWentWrong />
        </AppModal>

        <AppModal visible={loading}>
          <LoadingComponent />
          {statusMessage && <Text style={SignInStyles.statusMessage}>{statusMessage}</Text>}
        </AppModal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


