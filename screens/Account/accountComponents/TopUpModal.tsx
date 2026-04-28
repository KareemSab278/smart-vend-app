import { MainButton, SecondaryButton } from '@/components/Button';
import { InputField } from '@/components/InputField';
import AppModal from '@/components/Modal';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    visible: boolean;
    onClose: () => void;
    onTopUp: (amount: number) => void;
};

export const TopUpModal = ({ visible, onClose, onTopUp }: Props) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handleAmountChange = (val: string) => {
        setError('');
        if (/^\d*\.?\d{0,2}$/.test(val)) {
            setAmount(val);
        }
    };

    const handleConfirm = () => {
        const parsed = parseFloat(amount);
        if (!amount || isNaN(parsed) || parsed <= 0) {
            setError('Please enter a valid amount');
            return;
        }
        if (parsed < 1) {
            setError('Minimum top-up is £1.00');
            return;
        }
        if (parsed > 100) {
            setError('Maximum top-up is £100.00');
            return;
        }
        onTopUp(parsed);
        setAmount('');
        setError('');
    };

    const handleClose = () => {
        setAmount('');
        setError('');
        onClose();
    };

    return (
        <AppModal visible={visible} title="Top Up Card" onClose={handleClose}>
            <Text style={styles.label}>Enter amount (£)</Text>
            <InputField
                label="Amount"
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="decimal-pad"
                helperText={error || 'Min £1.00 - Max £100.00'}
                error={!!error}
            />
            <View style={styles.actions}>
                <MainButton title="Top Up" onPress={handleConfirm} />
                <SecondaryButton title="Cancel" onPress={handleClose} />
            </View>
        </AppModal>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    actions: {
        gap: 4,
    },
});
