import { MainButton } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { AddressValues, SignUpValues } from '@/Types/User';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Checkbox, ProgressBar } from 'react-native-paper';
import { AddressForm } from './AddressForm';
import { RegisterStyles } from './Styles';

type RegisterFormProps = {
  onSwitchToLogin: () => void;
  onSubmit: (data: SignUpValues) => Promise<void>;
};

const initialAddressState: AddressValues = {
  address1: '',
  address2: '',
  city: '',
  county: '',
  postcode: '',
  phone: '',
};

export function RegisterForm({ onSwitchToLogin, onSubmit }: RegisterFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState<AddressValues>(initialAddressState);
  const [subscribe, setSubscribe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddressChange = (field: keyof AddressValues, value: string) => {
    setAddress((previous) => ({ ...previous, [field]: value }));
  };

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

    if (!address.address1.trim() || !address.city.trim() || !address.postcode.trim() || !address.phone.trim()) {
      setError('Please fill in your address and phone number.');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password,
        address1: address.address1.trim(),
        address2: address.address2.trim(),
        city: address.city.trim(),
        county: address.county.trim(),
        postcode: address.postcode.trim(),
        phone: address.phone.trim(),
        subscribe,
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
      <AddressForm values={address} onChange={handleAddressChange} />
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

