
import { LoadingComponent } from "@/components/Loading";
import AppModal from "@/components/Modal";
import { Animated, View } from "react-native";
import { styles } from "../styles";

interface MarketCardProps {
    loading: boolean;
    visible: boolean;
    onClose: () => void;
    revealPinDigits: string[];
    revealPinAnimations: React.MutableRefObject<Animated.Value[]>;
}

export const PinReveal = ({ loading, visible, onClose, revealPinDigits, revealPinAnimations }: MarketCardProps) => (
    <AppModal
        title={loading ? 'Getting Your PIN...' : 'Keep Your PIN Safe'}
        visible={visible}
        onClose={onClose}
        children={
            <>
                {loading ? (
                    <LoadingComponent />
                ) : (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        {revealPinDigits.map((digit: string, index: number) => {
                            const animation = revealPinAnimations.current[index] ?? new Animated.Value(0);
                            return (
                                <Animated.Text key={index}
                                    style={[styles.pinDigit,
                                    {
                                        opacity: animation, transform:
                                            [{ translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }]
                                    }]}
                                >
                                    {digit}
                                </Animated.Text>
                            );
                        })}
                    </View>
                )}
            </>
        }
    />
)