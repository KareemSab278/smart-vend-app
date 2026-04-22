import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import BottomNavigationBar from '@/components/BottomNavigation';
import { useColorScheme } from '@/hooks/use-color-scheme';

const bottomRoutes = [
  { key: 'home', title: 'Home', focusedIcon: 'home' },
  { key: 'catalogue', title: 'Catalogue', focusedIcon: 'food' },
  { key: 'explore', title: 'Explore', focusedIcon: 'compass' },
];

const hiddenRoutes = ['sign-in', 'sign-up', 'checkout'];

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const currentSegment = segments[0] as string | undefined;
  const isAuthRoute = hiddenRoutes.includes(currentSegment || '');
  const activeKey = !currentSegment ? 'home' : currentSegment;
  const foundIndex = bottomRoutes.findIndex((route) => route.key === activeKey);
  const activeIndex = foundIndex >= 0 ? foundIndex : 0;

  const handleIndexChange = (newIndex: number) => {
    const selected = bottomRoutes[newIndex];

    switch (selected.key) {
      case 'home':
        router.push('/');
        break;

      case 'explore':
        router.push('/explore');
        break;

      case 'catalogue':
        router.push('/catalogue');
        break;
    }
  };

  const SCREENS = ['index', 'explore', 'catalogue', 'sign-in', 'checkout'];

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, marginTop: 30 }}>
            <Stack>
              {SCREENS.map((name) => (
                <Stack.Screen key={name} name={name} options={{ headerShown: false }}/>
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
  );
}
