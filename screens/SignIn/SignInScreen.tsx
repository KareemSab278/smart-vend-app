import { signInUser, SignInValues } from '@/helpers/signInUser';
import { signUpUser, SignUpValues } from '@/helpers/signUpUser';
import { checkUser } from '@/Security/checkUser';
import { IfUserSignedIn } from '@/Security/signInCheck';
import { User, UserStorage } from '@/store/Storage';
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
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => { (async () => { await checkUser().then(auth => auth && router.replace('/') ) })() }, [router]);

  const handleSignIn = async ({ email, password }: SignInValues) => {
    try {
      const user: User = await signInUser({ email, password });
      await UserStorage.saveUser(user);
      setStatusMessage(`Welcome back, ${user.first_name}!`);
      setTimeout(() => {
        router.replace('/');
      }, 1500);
    } catch {
      setStatusMessage('Sign in failed. Please check your credentials and try again.');
    }
  };

  const handleRegister = async (data: SignUpValues) => {
    try {
      const user: User = await signUpUser(data);
      await UserStorage.saveUser(user);
      setStatusMessage(`Welcome, ${user.first_name}!`);
      setTimeout(() => {
        router.replace('/');
      }, 1500);
    } catch {
      setStatusMessage('Sign up failed. Please check your details and try again.');
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

        {statusMessage ? <Text style={SignInStyles.statusMessage}>{statusMessage}</Text> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


