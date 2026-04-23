import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  appButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: '#481186bd',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  searchToggleButton: {
    marginTop: 15,
    marginRight: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#773eb9',
    borderRadius: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.18)',
      },
    }),
  },
  filtersButton: {
    marginTop: 15,
    marginRight: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#773eb9',
    borderRadius: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.18)',
      },
    }),
  },
  appButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  linkText: {
    color: '#fff',
    fontWeight: '600',
  },
});