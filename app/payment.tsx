import { Platform } from 'react-native';

let PaymentScreen: React.ComponentType;

if (Platform.OS === 'web') {
  PaymentScreen = require('@/screens/Payment/PaymentScreen.web').default;
} else {
  PaymentScreen = require('@/screens/Payment/PaymentScreen').PaymentScreen;
}

export default PaymentScreen;
