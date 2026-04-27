import { MainButton, SecondaryButton } from '@/components/Button';
import { InputField } from '@/components/InputField';
import AppModal from '@/components/Modal';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    visible: boolean;
    hasPin: boolean;
    onClose: () => void;
    onSave: (pin: number) => void;
};

export const SetPinModal = ({ visible, hasPin, onClose, onSave }: Props) => {
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [error, setError] = useState('');

    const handlePinChange = (val: string) => {
        setError('');
        if (/^\d{0,4}$/.test(val)) setPin(val);
    };

    const handleConfirmPinChange = (val: string) => {
        setError('');
        if (/^\d{0,4}$/.test(val)) setConfirmPin(val);
    };

    const handleSave = () => {
        if (pin.length !== 4) {
            setError('PIN must be exactly 4 digits');
            return;
        }
        if (pin !== confirmPin) {
            setError('PINs do not match');
            return;
        }
        onSave(parseInt(pin, 10));
        setPin('');
        setConfirmPin('');
        setError('');
    };

    const handleClose = () => {
        setPin('');
        setConfirmPin('');
        setError('');
        onClose();
    };

    return (
        <AppModal
            visible={visible}
            title={hasPin ? 'Change PIN' : 'Set PIN'}
            onClose={handleClose}
        >
            <Text style={styles.description}>
                {hasPin
                    ? 'Enter a new 4-digit PIN for your market card.'
                    : 'Secure your market card with a 4-digit PIN.'}
            </Text>
            <InputField
                label="New PIN"
                value={pin}
                onChangeText={handlePinChange}
                secureTextEntry
                keyboardType="number-pad"
                helperText={error || undefined}
                error={!!error}
            />
            <InputField
                label="Confirm PIN"
                value={confirmPin}
                onChangeText={handleConfirmPinChange}
                secureTextEntry
                keyboardType="number-pad"
            />
            <View style={styles.actions}>
                <MainButton title="Save PIN" onPress={handleSave} />
                <SecondaryButton title="Cancel" onPress={handleClose} />
            </View>
        </AppModal>
    );
};

const styles = StyleSheet.create({
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 12,
    },
    actions: {
        gap: 4,
    },
});
