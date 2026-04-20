import NavigationBar from '@/components/BottomNavigation';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

const bottomRoutes = [
  { key: 'home', title: 'Home', focusedIcon: 'home' },
  { key: 'explore', title: 'Explore', focusedIcon: 'compass' },
  { key: 'catalogue', title: 'Catalogue', focusedIcon: 'food' },
];

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const activeKey = segments[0] ?? 'home';
  const activeIndex = bottomRoutes.findIndex((route) => route.key === activeKey);

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

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="explore" options={{ headerShown: false }} />
              <Stack.Screen name="catalogue" options={{ headerShown: false }} />
            </Stack>
          </View>

          <NavigationBar
            routes={bottomRoutes}
            index={activeIndex === -1 ? 0 : activeIndex}
            onIndexChange={handleIndexChange}
            renderScene={() => null}
            sceneAnimationEnabled={false}
          />
        </View>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
