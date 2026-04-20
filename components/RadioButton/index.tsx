import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { RadioButton as PaperRadioButton } from 'react-native-paper';

type RadioButtonProps = {
  label: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
  style?: ViewStyle;
};

export default function RadioButton({
  label,
  value,
  selectedValue,
  onChange,
  style,
}: RadioButtonProps) {
  const checked = selectedValue === value;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onChange(value)}
      activeOpacity={0.75}
    >
      <PaperRadioButton.Android
        value={value}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => onChange(value)}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    marginRight: 8,
  },
});
