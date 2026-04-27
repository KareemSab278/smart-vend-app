import { type ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

export { InputField };

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: ComponentProps<typeof TextInput>['keyboardType'];
  helperText?: string;
  error?: boolean;
  autoCapitalize?: ComponentProps<typeof TextInput>['autoCapitalize'];
  placeholder?: string;
};

const InputField = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  helperText,
  error,
  autoCapitalize = 'none',
  placeholder,
}: InputFieldProps) => (
  <View style={styles.fieldContainer}>
    <TextInput
      mode="outlined"
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      activeOutlineColor="#7c3aed"
      outlineColor="#d7d3ea"
      textColor="#111"
      placeholderTextColor="#667085"
      style={styles.input}
      error={error}
    />
    {helperText ? (
      <HelperText type={error ? 'error' : 'info'} visible={true} style={styles.helperText}>
        {helperText}
      </HelperText>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    color: '#111',
  },
  helperText: {
    marginTop: 4,
  },
});


