import { MainButton } from '@/components/Button';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { styles } from './styles';

export default function PaymentScreenWeb() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Web payment is only supported on IOS and Android for now.</Text>
      <MainButton title="Back to account" onPress={() => router.replace('/account')} />
    </View>
  );
}