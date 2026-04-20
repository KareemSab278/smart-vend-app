import { Link } from 'expo-router';
import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>A cleaner starter screen for your app.</Text>
      </View>
      <Image
        style={styles.image}
      />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Get started</Text>
        <Text style={styles.text}>
          Open <Text style={styles.code}>screens/home/HomeScreen.tsx</Text> and edit this screen.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Navigation</Text>
        <Link href="/explore" style={styles.link}>
          <Text style={styles.linkText}>Go to Explore</Text>
        </Link>
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
  link: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginTop: 8,
  },
  linkText: {
    color: '#fff',
    fontWeight: '600',
  },
});
