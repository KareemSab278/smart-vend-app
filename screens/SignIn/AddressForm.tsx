import { InputField } from '@/components/InputField';
import { View } from 'react-native';
import { RegisterStyles } from './Styles';

export type AddressValues = {
  address1: string;
  address2: string;
  city: string;
  county: string;
  postcode: string;
  phone: string;
};

type AddressFormProps = {
  values: AddressValues;
  onChange: (field: keyof AddressValues, value: string) => void;
};

export function AddressForm({ values, onChange }: AddressFormProps) {
  return (
    <View style={RegisterStyles.addressSection}>
      <InputField
        label="Address 1"
        value={values.address1}
        onChangeText={(text) => onChange('address1', text)}
        helperText="Street address, house number or PO box."
        autoCapitalize="words"
      />
      <InputField
        label="Address 2"
        value={values.address2}
        onChangeText={(text) => onChange('address2', text)}
        helperText="Apartment, suite, unit, building, floor, etc."
        autoCapitalize="words"
      />
      <InputField
        label="City"
        value={values.city}
        onChangeText={(text) => onChange('city', text)}
        autoCapitalize="words"
      />
      <InputField
        label="County"
        value={values.county}
        onChangeText={(text) => onChange('county', text)}
        autoCapitalize="words"
      />
      <InputField
        label="Postcode"
        value={values.postcode}
        onChangeText={(text) => onChange('postcode', text)}
        autoCapitalize="characters"
      />
      <InputField
        label="Phone number"
        value={values.phone}
        onChangeText={(text) => onChange('phone', text)}
        keyboardType="phone-pad"
        helperText="Mobile number for order updates."
      />
    </View>
  );
}
