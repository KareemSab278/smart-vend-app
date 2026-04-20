import { MainButton } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Checkbox, ProgressBar } from 'react-native-paper';
import { RegisterStyles } from './Styles';

type RegisterFormProps = {
  onSwitchToLogin: () => void;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
};

export function RegisterForm({ onSwitchToLogin, onSubmit }: RegisterFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');

    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter both first and last name.');
      return;
    }

    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
      });
    } catch (err) {
      setError('Unable to create account. Please try again.');
    }
    setLoading(false);
  };

  return (
    <View style={RegisterStyles.formContainer}>
      <View style={RegisterStyles.nameRow}>
        <View style={RegisterStyles.nameField}>
          <InputField
            label="First name"
            value={firstName}
            onChangeText={setFirstName}
            helperText="Your given name"
            autoCapitalize="words"
          />
        </View>
        <View style={RegisterStyles.nameField}>
          <InputField
            label="Last name"
            value={lastName}
            onChangeText={setLastName}
            helperText="Your family name"
            autoCapitalize="words"
          />
        </View>
      </View>
      <InputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        helperText="We will use this for sign in."
      />
      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        helperText="At least 8 characters with a number or symbol."
      />
      <InputField
        label="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        helperText="Re-enter your password."
      />
      <TouchableOpacity
        style={RegisterStyles.checkboxRow}
        onPress={() => setSubscribe((previous) => !previous)}
      >
        <Checkbox status={subscribe ? 'checked' : 'unchecked'} />
        <Text style={RegisterStyles.checkboxText}>Subscribe to newsletter</Text>
      </TouchableOpacity>
      {error ? <Text style={RegisterStyles.errorText}>{error}</Text> : null}
      <MainButton title={loading ? 'Creating account…' : 'Sign up'} onPress={handleRegister} />
      {loading ? <ProgressBar indeterminate color="#7c3aed" style={RegisterStyles.progress} /> : null}
      <TouchableOpacity onPress={onSwitchToLogin} style={RegisterStyles.switchRow}>
        <Text style={RegisterStyles.switchText}>Already have an account?</Text>
        <Text style={RegisterStyles.switchAction}> Sign in</Text>
      </TouchableOpacity>
      <View style={RegisterStyles.googleSection}>
        <Text style={RegisterStyles.googleText}>Or sign up with</Text>
        <TouchableOpacity style={RegisterStyles.googleButton} onPress={() => setError('Google sign up is not available yet.')}> 
          <Text style={RegisterStyles.googleButtonText}>Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

