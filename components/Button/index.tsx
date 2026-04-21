import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { type ComponentProps } from 'react';
import { Button, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";

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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.18)',
      },
    }),
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