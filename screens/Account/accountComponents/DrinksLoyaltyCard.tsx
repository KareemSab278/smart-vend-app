import Progress from "@/components/ProgressBar";
import { User } from "@/Types/User";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { styles } from "../styles";


export const DrinksLoyaltyCard = ({ current, goal, freeCount, user }: { current: number, goal: number, freeCount: number, user: User }) => {
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
                <View style={styles.freeDrinkBanner}>
                    <MaterialCommunityIcons name="coffee" size={20} color="#023b00" />
                    <Text style={styles.freeDrinkText}>
                        You have {user?.free_drinks} free hot drink
                        {user?.free_drinks && user?.free_drinks > 1 ? 's' : ''}!
                    </Text>
                </View>
            )}
        </View>
    )
}