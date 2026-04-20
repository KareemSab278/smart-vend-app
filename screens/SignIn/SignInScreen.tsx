import { useState } from 'react';
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
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSignIn = async (email: string, password: string) => {
    setStatusMessage(`Signed in with ${email}`);
    return Promise.resolve();
  };

  const handleRegister = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setStatusMessage(`Welcome, ${data.firstName}!`);
    return Promise.resolve();
  };

  return (
    <KeyboardAvoidingView
      style={SignInStyles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={SignInStyles.container} keyboardShouldPersistTaps="handled">
        <View style={SignInStyles.header}>
          <Text style={SignInStyles.title}>{mode === 'login' ? 'Welcome back' : 'Create your account'}</Text>
          <Text style={SignInStyles.subtitle}>
            {mode === 'login'
              ? 'Sign in to access your vending dashboard and orders.'
              : 'Register for your account and start browsing the catalogue today.'}
          </Text>
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


