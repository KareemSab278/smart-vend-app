import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 4,
    },
    amountLabel: {
        fontSize: 16,
        color: '#555',
        marginBottom: 24,
    },
    cardField: {
        width: '100%',
        height: 56,
        marginBottom: 20,
    },
    errorText: {
        fontSize: 14,
        color: '#c00',
        marginBottom: 12,
    },
    actions: {
        gap: 8,
        marginTop: 4,
    },
    successIcon: {
        fontSize: 56,
        color: '#16a34a',
    },
    successTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#16a34a',
    },
    successSubtitle: {
        fontSize: 15,
        color: '#555',
        marginBottom: 8,
        textAlign: 'center',
    },
    errorIcon: {
        fontSize: 56,
        color: '#c00',
    },
    errorTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#c00',
    },
    errorSubtitle: {
        fontSize: 15,
        color: '#555',
        marginBottom: 8,
        textAlign: 'center',
    },
    loadingText: {
        fontSize: 15,
        color: '#555',
        marginTop: 12,
    },
});

export const cardFieldStyle = {
    backgroundColor: '#b6b6b6',
    borderRadius: 8,
    borderColor: '#d7d3ea',
    borderWidth: 1,
    color: '#000',
    placeholderColor: '#2b2b2b',
};
