import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox, ProgressBar } from 'react-native-paper';
import { MainButton } from '@/components/Button';
import { InputField } from '@/components/InputField';

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
    <View style={styles.formContainer}>
      <View style={styles.nameRow}>
        <View style={styles.nameField}>
          <InputField
            label="First name"
            value={firstName}
            onChangeText={setFirstName}
            helperText="Your given name"
            autoCapitalize="words"
          />
        </View>
        <View style={styles.nameField}>
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
        style={styles.checkboxRow}
        onPress={() => setSubscribe((previous) => !previous)}
      >
        <Checkbox status={subscribe ? 'checked' : 'unchecked'} />
        <Text style={styles.checkboxText}>Subscribe to newsletter</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <MainButton title={loading ? 'Creating account…' : 'Sign up'} onPress={handleRegister} />
      {loading ? <ProgressBar indeterminate color="#7c3aed" style={styles.progress} /> : null}
      <TouchableOpacity onPress={onSwitchToLogin} style={styles.switchRow}>
        <Text style={styles.switchText}>Already have an account?</Text>
        <Text style={styles.switchAction}> Sign in</Text>
      </TouchableOpacity>
      <View style={styles.googleSection}>
        <Text style={styles.googleText}>Or sign up with</Text>
        <TouchableOpacity style={styles.googleButton} onPress={() => setError('Google sign up is not available yet.')}> 
          <Text style={styles.googleButtonText}>Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    marginTop: 16,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameField: {
    flex: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 12,
  },
  checkboxText: {
    fontSize: 14,
    color: '#444',
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 12,
    fontSize: 14,
  },
  progress: {
    marginTop: 12,
    height: 4,
    borderRadius: 4,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
  googleSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  googleText: {
    color: '#666',
    marginBottom: 10,
    fontSize: 14,
  },
  googleButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d7d3ea',
    minWidth: 160,
  },
  googleButtonText: {
    color: '#481186bd',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});
