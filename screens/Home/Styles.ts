import { Platform, StyleSheet } from "react-native";
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
    cartButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 28,
    backgroundColor: '#773eb9',
    elevation: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
      },
      android: {
        elevation: 14,
      },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.24)',
      },
    }),
  },
      cartButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
        marginLeft: 10,
      },
      cartBadge: {
        marginLeft: 5,
        minWidth: 26,
        height: 26,
        borderRadius: 50,
        backgroundColor: '#481186bd',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
      },
      cartBadgeText: {
        color: '#ffffffbd',
        fontWeight: '700',
      },
});

