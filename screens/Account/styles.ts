import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 24,
    },
    header: {
        marginBottom: 24,
        gap: 8,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardActions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardOption: {
        maxWidth: '35%',
    },
    pinDigit: {
        fontSize: 26,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        marginVertical: 12,
        backgroundColor: '#00000020',
        paddingHorizontal: 13,
        paddingVertical: 5,
        borderRadius: 50,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
    },
    revealPin: {
        fontSize: 12,
        color: '#bbbbbb',
        paddingBottom: 4,
        fontWeight: '600',
    },
    revealPinButton: {
        width: '30%',
        alignItems: 'flex-end',
        flexDirection: 'row',
        gap: 5,
    },
    card: {
        backgroundColor: '#481186e3',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    cardLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        // marginBottom: 4,
    },
    cardNumber: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        letterSpacing: 2,
        marginBottom: 20,
        fontFamily: 'monospace',
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },
    balanceLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    balance: {
        fontSize: 40,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 8,
    },
    section: {
        gap: 12,
        marginBottom: 24,
    },
    sectionTitle: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '600',
    },
    loyaltyCard: {
        backgroundColor: '#f5f0ff',
        borderRadius: 12,
        padding: 16,
        gap: 10,
        width: '90%',
        alignSelf: 'center',
    },
    loyaltyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    loyaltyCount: {
        fontSize: 27,
        fontWeight: '700',
        color: '#481186',
    },
    loyaltyHint: {
        fontSize: 13,
        color: '#4811868f',
    },
    freeDrinkBanner: {
        backgroundColor: '#d4edda',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#28a745',
    },
    freeDrinkText: {
        fontSize: 15,
        color: '#155724',
        fontWeight: '600',
    },
});



export const userModalStyles = StyleSheet.create({
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
    editTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
        color: '#111',
    },
    editSection: {
        minHeight: 200,
        maxHeight: 400,
        overflowY: 'auto',
    },
    editActions: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 8,
    },
});
