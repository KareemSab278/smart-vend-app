import { MainButton, SecondaryButton } from "@/components/Button";
import AppModal from "@/components/Modal";
import Progress from "@/components/ProgressBar";
import { User } from "@/Types/User";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

export const DrinksLoyaltyCard = ({
  current,
  goal,
  freeCount,
  user,
}: {
  current: number;
  goal: number;
  freeCount: number;
  user: User;
}) => {
  const router = useRouter();
  const [promptModalOpen, setPromptModalOpen] = useState(false);

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
      <AppModal
        visible={promptModalOpen}
        title="Redeem a free drink now?"
        message="Would you like to redeem a free hot drink now?"
        onClose={() => setPromptModalOpen(false)}
      >
        <MainButton
          title="Yes"
          onPress={() => {
            setPromptModalOpen(false);
            router.push("/catalogue?category_filter=drink");
          }}
        />
        <SecondaryButton
          title="Not now"
          onPress={() => setPromptModalOpen(false)}
        />
      </AppModal>
      {hasFree && (
        <View
          style={styles.freeDrinkBanner}
          onTouchStart={() => setPromptModalOpen(true)}
        >
          <Text style={styles.freeDrinkText}>
            You have {user?.free_drinks} free hot drink
            {user?.free_drinks && user?.free_drinks > 1 ? "s" : ""}!
          </Text>
        </View>
      )}
    </View>
  );
};
