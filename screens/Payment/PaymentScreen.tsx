import { MainButton, SecondaryButton } from '@/components/Button';
import { LoadingComponent } from '@/components/Loading';
import AppModal from '@/components/Modal';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { cardFieldStyle, styles } from './styles';

export const PaymentScreen = () => {
  const { client_secret, amount } = useLocalSearchParams<{ client_secret: string; amount: string }>();
  const { confirmPayment } = useStripe();
  const router = useRouter();

  const [cardComplete, setCardComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const amountGBP = parseFloat(amount ?? '0');

  const handlePay = async () => {
    if (!client_secret) {
      setErrorMessage('Missing payment session. Please go back and try again.');
      return;
    }

    if (!cardComplete) {
      setErrorMessage('Please enter your complete card details.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await confirmPayment(client_secret, {
      paymentMethodType: 'Card',
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message ?? 'Payment failed. Please try again.');
      setPaymentResult('error');
    } else if (paymentIntent) {
      setPaymentResult('success');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppModal visible={loading}>
        <LoadingComponent />
        <Text style={styles.loadingText}>Processing payment...</Text>
      </AppModal>

      <AppModal visible={paymentResult === 'success'}>
        <Text style={styles.successIcon}>✓</Text>
        <Text style={styles.successTitle}>Top-up successful!</Text>
        <Text style={styles.successSubtitle}>
          £{amountGBP.toFixed(2)} has been added to your card.
        </Text>
        <MainButton title="Back to Account" onPress={() => router.replace('/account')} />
      </AppModal>

      <AppModal visible={(errorMessage && errorMessage?.length > 0) as boolean}>
        <Text style={styles.errorIcon}>✕</Text>
        <Text style={styles.errorTitle}>Payment failed</Text>
        <Text style={styles.errorSubtitle}>{errorMessage}</Text>
        <MainButton title="Try Again" onPress={() => { setPaymentResult(null); setErrorMessage(null); }} />
        <SecondaryButton title="Cancel" onPress={() => router.replace('/account')} />
      </AppModal>

      <Text style={styles.title}>Top Up Card</Text>
      <Text style={styles.amountLabel}>Amount: £{amountGBP.toFixed(2)}</Text>

      <CardField
        postalCodeEnabled={false}
        style={styles.cardField}
        cardStyle={cardFieldStyle}
        onCardChange={(details) => setCardComplete(details.complete)}
      />

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <View style={styles.actions}>
        <MainButton title={`Pay £${amountGBP.toFixed(2)}`} onPress={handlePay} />
        <SecondaryButton title="Cancel" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
};
