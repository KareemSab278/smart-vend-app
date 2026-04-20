import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Switch } from 'react-native-paper';

type ToggleProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  style?: ViewStyle;
};

export default function Toggle({ label, value, onChange, style }: ToggleProps) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onChange(!value)}
      activeOpacity={0.75}
    >
      <Switch value={value} onValueChange={onChange} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  label: {
    fontSize: 15,
    flex: 1,
    marginLeft: 6,
  },
});
