import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { type ComponentProps } from 'react';
import { Button, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export { FiltersButton, MainButton, SearchToggleButton, SecondaryButton };

const MainButton = ({ title, onPress }: ButtonProps) => (
  <TouchableOpacity style={styles.appButton} onPress={onPress}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const SearchToggleButton = ({ onPress }: { onPress?: () => void }) => (
  <TouchableOpacity style={styles.searchToggleButton} onPress={onPress}>
    <MaterialCommunityIcons name="magnify" size={20} color="#fff" />
  </TouchableOpacity>
);

const FiltersButton = ({ onPress }: { onPress?: () => void }) => (
  <TouchableOpacity style={styles.filtersButton} onPress={onPress}>
    <MaterialCommunityIcons name="filter-variant" size={20} color="#fff" />
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

