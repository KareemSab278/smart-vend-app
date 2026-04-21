import { checkUser } from '@/helpers/checkUser';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './Styles';

export default function HomeScreen() {
  const router = useRouter();

  const validateUser = async () => { await checkUser().then(auth => !auth && router.replace('/sign-in') ) };
  useEffect(() => { validateUser() }, [router]);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.text}>This is the main page</Text>
      </View>
    </ScrollView>
  );
}

