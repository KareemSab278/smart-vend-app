import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        marginTop: 12,
    },
    listContent: {
        paddingBottom: 16,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    itemDetails: {
        flex: 1,
        marginRight: 12,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemQty: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 16,
        paddingBottom: 32,
        gap: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '700',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#773eb9',
    },
    cancelButton: {
        borderWidth: 1.5,
        borderColor: '#aaa',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 15,
        color: '#555',
        fontWeight: '600',
    },
    modeSwitchButton: {
        borderWidth: 1.5,
        borderColor: '#aaa',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 20,
    },
    modeSwitchText: {
        fontSize: 15,
        color: '#555',
        fontWeight: '600',
    },
    pinText: {
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
});