import { StripeProvider } from '@stripe/stripe-react-native';
import React from 'react';

export const StripeWrapper = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => (
  <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''}>
    {children}
  </StripeProvider>
);
