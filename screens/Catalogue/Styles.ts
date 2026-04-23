import { Platform, StyleSheet } from 'react-native';

export { styles };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    paddingTop: 24,
    paddingHorizontal: 24,
    marginBottom: 12,
    fontSize: 32,
    fontWeight: '700',
  },
  headerWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filters: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  scrollGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,

  },
  filterButton: {
    marginTop: 16,
  },
  modalContainer: {
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 18,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  filterItem: {
    marginRight: 8,
  },
  toggleItem: {
    marginRight: 12,
    minWidth: 150,
  },
  applyButton: {
    marginTop: 18,
  },
  emptyText: {
    paddingHorizontal: 24,
    marginTop: 18,
    fontSize: 16,
    color: '#666',
  },
  list: {
    borderRadius: 22,
    flex: 1,
  },
  listContent: {
    paddingVertical: 12,
    flexGrow: 1,
    paddingBottom: Platform.OS === 'android' ? 100 : 0, // for android
    marginBottom: 100, // for web
    // idk about ios yet
  },
  columnWrapper: {
    justifyContent: 'space-between',
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
    fontWeight: '700',
    fontSize: 16,
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
