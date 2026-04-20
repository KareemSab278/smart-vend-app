import { Link } from "expo-router";
import { type ComponentProps } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";

export { MainButton, SecondaryButton };

const MainButton = ({ title, onPress }: ButtonProps) => (
  <TouchableOpacity style={styles.appButton} onPress={onPress}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const SecondaryButton = ({ title, onPress }: ButtonProps) => (
  <Button title={title} onPress={onPress} />
);

interface ButtonProps {
  title: string;
  onPress: () => void;
};

type LinkProps = ComponentProps<typeof Link> & {
  title: string;
};

const styles = StyleSheet.create({
  appButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#00000085',
    borderRadius: 8,
    alignSelf: 'flex-start',
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