import { StyleSheet } from "react-native";
export { styles };
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    height: '100%',
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
    fontSize: 18,
    lineHeight: 24,
    color: '#333',
  },
  goToCartButton: {
        borderWidth: 1.5,
        borderColor: '#aaa',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 20,
    },
    goToCartText: {
        fontSize: 15,
        color: '#555',
        fontWeight: '600',
    },
});

