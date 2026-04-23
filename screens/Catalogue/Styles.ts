import { Platform, StyleSheet } from 'react-native';

export { styles };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    paddingTop: 24,
    // paddingHorizontal: 24,
    marginBottom: 12,
    fontSize: 30,
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
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
