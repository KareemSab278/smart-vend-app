import { MainButton } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { useState } from 'react';
import { ActivityIndicator, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type LogInFormProps = {
  onSwitchToRegister: () => void;
  onSubmit: (email: string, password: string) => Promise<void>;
};

export function LogInForm({ onSwitchToRegister, onSubmit }: LogInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(email.trim(), password);
    } catch (err) {
      setError('Unable to sign in. Please try again.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.formContainer}>
      <InputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        helperText="Enter the email you used to create your account."
      />
      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        helperText="Use at least 8 characters."
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <MainButton title={loading ? 'Signing in…' : 'Sign in'} onPress={handleLogin} />
      {loading ? <ActivityIndicator style={styles.spinner} color="#481186bd" /> : null}
      <TouchableOpacity onPress={onSwitchToRegister} style={styles.switchRow}>
        <Text style={styles.switchText}>Don't have an account?</Text>
        <Text style={styles.switchAction}> Create one</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          const url = 'https://expressrefreshments.co.uk/manage/forgotten_password.php';
          Linking.openURL(url).catch(() => {
            setError('Unable to open reset page right now.');
          });
        }}
      >
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    marginTop: 16,
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 12,
    fontSize: 14,
  },
  spinner: {
    marginTop: 12,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  switchText: {
    color: '#444',
    fontSize: 14,
  },
  switchAction: {
    color: '#481186bd',
    fontSize: 14,
    fontWeight: '700',
  },
  forgotPassword: {
    marginTop: 12,
    color: '#7c3aed',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
