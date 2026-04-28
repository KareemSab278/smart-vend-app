import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { RelativePathString, Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import BottomNavigationBar from '@/components/BottomNavigation';
import { StripeWrapper } from '@/components/StripeWrapper';
import { useColorScheme } from '@/hooks/use-color-scheme';

const bottomRoutes = [
  { key: 'index', title: 'Home', focusedIcon: 'home', route: '/' },
  { key: 'catalogue', title: 'Catalogue', focusedIcon: 'food', route: '/catalogue' },
  { key: 'account', title: 'Account', focusedIcon: 'account', route: '/account' },
];
const hiddenRoutes = ['sign-in', 'sign-up', 'checkout', 'payment'];

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const currentSegment = segments[0] as string | undefined;
  const isAuthRoute = hiddenRoutes.includes(currentSegment || '');
  const activeKey = !currentSegment ? 'home' : currentSegment;
  const foundIndex = bottomRoutes.findIndex((route) => route.key === activeKey);
  const activeIndex = foundIndex >= 0 ? foundIndex : 0;

  const handleIndexChange = (newIndex: number) =>
    router.push((bottomRoutes[newIndex].route || '/') as RelativePathString);

    const SCREENS = [...bottomRoutes.map(route => route.key), ...hiddenRoutes];

  return (
    <StripeWrapper>
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, marginTop: 30 }}>
            <Stack>
              {SCREENS.map((name) => (
                <Stack.Screen key={name} name={name} options={{ headerShown: false }} />
              ))}
            </Stack>
          </View>
          {!isAuthRoute && (
            <BottomNavigationBar
              routes={bottomRoutes}
              index={activeIndex}
              onIndexChange={handleIndexChange}
              renderScene={() => <View />}
              sceneAnimationEnabled={false}
            />
          )}
        </View>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
    </StripeWrapper>
  );
}
