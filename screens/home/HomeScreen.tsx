import { AppButton, LinkButton } from '@/components/Button';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>A cleaner starter screen for your app.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Navigation</Text>
        <LinkButton
          href="/explore"
          title='Explore'
        />
        <AppButton
          title="I do nothing"
          onPress={() => console.log('Button pressed')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Project structure</Text>
        <Text style={styles.text}>Screens live in the screens/ folder. Components can be added later in components/.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>
          Developer tools: {Platform.select({ ios: 'cmd + d', android: 'cmd + m', web: 'F12' })}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    gap: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  section: {
    gap: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  code: {
    fontFamily: Platform.OS === 'web' ? 'monospace' : 'Courier',
    backgroundColor: '#f2f2f2',
    padding: 4,
  },

});
