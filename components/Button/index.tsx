import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { type ComponentProps } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";

export { FiltersButton, MainButton, SecondaryButton };

const MainButton = ({ title, onPress }: ButtonProps) => (
  <TouchableOpacity style={styles.appButton} onPress={onPress}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const FiltersButton = ({ onPress }: { onPress?: () => void }) => (
  <TouchableOpacity style={styles.filtersButton} onPress={onPress}>
    <MaterialCommunityIcons name="filter-variant" size={20} color="#fff"/>
  </TouchableOpacity>
);

const SecondaryButton = ({ title, onPress }: ButtonProps) => (
  <Button title={title} onPress={onPress} />
);

interface ButtonProps {
  title: string;
  onPress?: () => void;
};

type LinkProps = ComponentProps<typeof Link> & {
  title: string;
};

const styles = StyleSheet.create({
  appButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#481186bd',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  filtersButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#481186bd',
    borderRadius: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  appButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  linkText: {
    color: '#fff',
    fontWeight: '600',
  },
});