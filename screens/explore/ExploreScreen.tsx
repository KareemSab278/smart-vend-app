import { LinkButton } from '@/components/Button';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>This is the new explore screen layout.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What you can do</Text>
        <Text style={styles.text}>The app now uses a flat screens/ folder for all screen entries.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next steps</Text>
        <Text style={styles.text}>Build out new screens in their own folders with local styles and docs.</Text>
      </View>
      <LinkButton href="/" title="Back to Home" />
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
});
