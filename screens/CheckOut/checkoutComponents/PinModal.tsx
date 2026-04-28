import { MainButton, SecondaryButton } from "@/components/Button";
import { LoadingComponent } from "@/components/Loading";
import AppModal from "@/components/Modal";
import { Animated, View } from "react-native";
import { styles } from "../styles";

interface PinModalProps {
    isLoading: boolean;
    visible: boolean;
    onCameraSelect: () => void;
    onDone: () => void;
    pinDigits: string[];
    pinAnimations: React.MutableRefObject<Animated.Value[]>;
}

export const PinModal = ({ isLoading, visible, onCameraSelect, onDone , pinDigits, pinAnimations }: PinModalProps) => {
    
    return (

        <AppModal
            animationType="slide"
            title={isLoading ? "Generating Pin..." : "Use This Pin to Pay"}
            visible={visible}
            children={
                <>
                    {isLoading ? (<LoadingComponent />)
                        :
                        (
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    pinDigits.map((digit, index) => {
                                        const animation = pinAnimations.current[index] ?? new Animated.Value(0);
                                        const pinStyle = [styles.pinText, { opacity: animation, transform: [{ translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }] }];
                                        return (
                                            <Animated.Text
                                                key={index}
                                                style={pinStyle}
                                            >
                                                {digit}
                                            </Animated.Text>
                                        );
                                    })
                                }
                            </View>
                        )}
                    <SecondaryButton
                        title="Use Camera Instead"
                        onPress={onCameraSelect}
                    />
                    <MainButton
                        title="I'm Done"
                        // onPress={() => setActiveModal(null)}
                        onPress={onDone}
                    />
                </>
            }
        />

    )
}