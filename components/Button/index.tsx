import { Link } from "expo-router";
import { type ComponentProps } from 'react';
import { Button, Pressable, StyleSheet, Text } from "react-native";

export { AppButton, LinkButton, SecondaryButton };

const AppButton = ({ title, onPress }: ButtonProps) => (
  <Pressable style={styles.appButton} onPress={onPress}>
    <Text style={styles.appButtonText}>{title}</Text>
  </Pressable>
);

const LinkButton = ({ href, title }: LinkProps) => (
  <Link href={href} style={styles.link}>
    <Text style={styles.linkText}>{title}</Text>
  </Link>
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
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  appButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  link: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  linkText: {
    color: '#fff',
    fontWeight: '600',
  },
});