import { MainButton } from "@/components/Button";
import { InputField } from "@/components/InputField";
import AppModal from "@/components/Modal";
import { useState } from "react";
import { Alert } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "../styles";


export const SetCardNumModal = ({ visible, onClose, onSave }: Props) => {
    const [cardNum, setCardNum] = useState('');

    const handleSave = () => {
        if (cardNum.length < 12 || cardNum.length > 19) {
            Alert.alert('Invalid Card Number', 'Card number must be between 12 and 19 digits.');
            return;
        }
        onSave(cardNum);
        setCardNum('');
        onClose();
    };

    return (
        <AppModal visible={visible} title="Edit Card Number" onClose={onClose}>
            <Text style={styles.subtitle}>Enter a new card number for your market card.</Text>
            <InputField
                label="Card Number"
                value={cardNum}
                onChangeText={setCardNum}
                keyboardType="numeric"
                placeholder="1234 5678 9012 3456"
            />
            <MainButton title="Save" onPress={handleSave} />
        </AppModal>
    );
};

type Props = {
    visible: boolean;
    onClose: () => void;
    onSave: (cardNum: string) => void;
};

