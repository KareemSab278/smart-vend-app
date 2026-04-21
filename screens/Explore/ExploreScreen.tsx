import { IfUserNotSignedIn } from '@/Security/signInCheck';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './Styles';

export default function ExploreScreen() {
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IfUserNotSignedIn goTo="/sign-in" />
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>This is the new explore screen layout.</Text>
      </View>
    </ScrollView>
  );
}


