import { StyleSheet } from "react-native";
export { styles };
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  emptyText: {
    fontSize: 14,
    color: '#aaa',
    fontStyle: 'italic',
    paddingVertical: 8,
  },
  hList: {
    paddingVertical: 8,
    gap: 12,
  },
  cartButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    flexDirection: 'row',
  },

  // user modal
  viewMode: {
        alignItems: 'center',
        gap: 6,
    },
    avatarLarge: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#481186',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatarLargeText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '700',
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
    card: {
        fontSize: 13,
        color: '#999',
        marginBottom: 12,
    },
    editButton: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#481186',
        alignItems: 'center',
        marginTop: 8,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
    editSection:{
      minHeight: 200,
      maxHeight: 400,
      overflowY: 'auto',
    },
    editTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
        color: '#111',
    },
    editActions: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 8,
    },
    saveButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#481186',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: '#aaa',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#555',
        fontWeight: '600',
        fontSize: 15,
    },
  
});

