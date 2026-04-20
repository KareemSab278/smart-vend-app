import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LogInForm } from './LogInForm';
import { RegisterForm } from './RegisterForm';

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
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>{mode === 'login' ? 'Welcome back' : 'Create your account'}</Text>
          <Text style={styles.subtitle}>
            {mode === 'login'
              ? 'Sign in to access your vending dashboard and orders.'
              : 'Register for your account and start browsing the catalogue today.'}
          </Text>
        </View>

        <View style={styles.switchButtons}>
          <TouchableOpacity
            style={[styles.switchTab, mode === 'login' && styles.switchTabActive]}
            onPress={() => setMode('login')}
          >
            <Text style={[styles.switchTabText, mode === 'login' && styles.switchTabTextActive]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchTab, mode === 'register' && styles.switchTabActive]}
            onPress={() => setMode('register')}
          >
            <Text style={[styles.switchTabText, mode === 'register' && styles.switchTabTextActive]}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          {mode === 'login' ? (
            <LogInForm
              onSwitchToRegister={() => setMode('register')}
              onSubmit={handleSignIn}
            />
          ) : (
            <RegisterForm onSwitchToLogin={() => setMode('login')} onSubmit={handleRegister} />
          )}
        </View>

        {statusMessage ? <Text style={styles.statusMessage}>{statusMessage}</Text> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 24,
    paddingTop: 32,
  },
  header: {
    gap: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  switchButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  switchTab: {
    flex: 1,
    backgroundColor: '#f4efff',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  switchTabActive: {
    backgroundColor: '#481186bd',
  },
  switchTabText: {
    color: '#5d5d5d',
    fontSize: 15,
    fontWeight: '700',
  },
  switchTabTextActive: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#faf7ff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#ece8f7',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 5,
  },
  statusMessage: {
    marginTop: 18,
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
  },
});
