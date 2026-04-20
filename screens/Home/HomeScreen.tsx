import { ScrollView, Text, View } from 'react-native';
import { styles } from './Styles';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.text}>This is the main page</Text>
      </View>
    </ScrollView>
  );
}

