import Progress from "@/components/ProgressBar";
import { User } from "@/Types/User";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";
import { styles } from "../styles";


export const DrinksLoyaltyCard = ({ current, goal, freeCount, user }: { current: number, goal: number, freeCount: number, user: User }) => {
    const router = useRouter();
    
    const handleFreeDrinkPress = () => {
        Alert.alert('Redeem a free drink!', 'Would you like to redeem a free hot drink now?', [
            { text: 'No', style: 'cancel' },
            { text: 'Yes', onPress: () => router.push('/catalogue?category_filter=drink') },
        ]);
    };

    const progress: number = Math.min(current / goal, 1);
    const hasFree: boolean = freeCount > 0;
    return (
        <View style={styles.section}>
            <View style={styles.loyaltyCard}>
                <View style={styles.loyaltyRow}>
                    <MaterialCommunityIcons name="coffee" size={24} color="#481186" />
                    <Text style={styles.loyaltyCount}>
                        {current} / {goal} hot drinks
                    </Text>
                </View>
                <Progress progress={progress} color="purple" />
            </View>

            {hasFree && (
                <View style={styles.freeDrinkBanner} onTouchStart={handleFreeDrinkPress}>
                    <Text style={styles.freeDrinkText}>
                        You have {user?.free_drinks} free hot drink
                        {user?.free_drinks && user?.free_drinks > 1 ? 's' : ''}!
                    </Text>
                </View>
            )}
        </View>
    )
}