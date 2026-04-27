import { SignInValues } from '@/Types/User';
import { MainButton } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { useState } from 'react';
import { ActivityIndicator, Linking, Text, TouchableOpacity, View } from 'react-native';
import { LogInStyles } from './Styles';
type LogInFormProps = {
  onSwitchToRegister: () => void;
  onSubmit: (values: SignInValues) => Promise<void>;
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
      await onSubmit({ email: email.trim(), password });
    } catch (err) {
      setError('Unable to sign in. Please try again.');
    }
    setLoading(false);
  };

  return (
    <View style={LogInStyles.formContainer}>
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
      {error ? <Text style={LogInStyles.errorText}>{error}</Text> : null}
      <MainButton title={loading ? 'Signing in…' : 'Sign in'} onPress={handleLogin} />
      {loading ? <ActivityIndicator style={LogInStyles.spinner} color="#481186bd" /> : null}
      <TouchableOpacity onPress={onSwitchToRegister} style={LogInStyles.switchRow}>
        <Text style={LogInStyles.switchText}>Don't have an account?</Text>
        <Text style={LogInStyles.switchAction}> Create one</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          const url = 'https://expressrefreshments.co.uk/manage/forgotten_password.php';
          Linking.openURL(url).catch(() => {
            setError('Unable to open reset page right now.');
          });
        }}
      >
        <Text style={LogInStyles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
}

