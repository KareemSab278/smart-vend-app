import { fetchUserPin } from '@/ApiCallers/fetchUserPin';
import { makeStripeTopUp } from '@/ApiCallers/makeStripeTopUp';
import { saveCardNumber } from '@/ApiCallers/saveCardNumber';
import { savePin } from '@/ApiCallers/savePin';
import { MainButton } from '@/components/Button';
import { LoadingComponent } from '@/components/Loading';
import AppModal from '@/components/Modal';
import Progress from '@/components/ProgressBar';
import { IfUserNotSignedIn } from '@/Security/signInCheck';
import { UserStorage } from '@/store/Storage';
import { User } from '@/Types/User';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, Easing, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SetCardNumModal } from './accountComponents/setCardNumModal';
import { SetPinModal } from './accountComponents/SetPinModal';
import { TopUpModal } from './accountComponents/TopUpModal';
import { UserProfileModal } from './accountComponents/UserModal';
import { styles } from './styles';

const HOT_DRINKS_GOAL = 8;

export default function AccountScreen() {
    const [user, setUser] = useState<User>(null as unknown as User);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const [showPayResult, setShowPayResult] = useState(false);

    const [topUpVisible, setTopUpVisible] = useState(false);
    const [pinVisible, setPinVisible] = useState(false);
    const [cardNumVisible, setCardNumVisible] = useState(false);

    const payResMessage = useRef<string | null>(null);

    const [revealPinShown, setRevealPinShown] = useState(false);
    const [revealedPin, setRevealedPin] = useState<string | null>(null);
    const [revealPinDigits, setRevealPinDigits] = useState<string[]>([]);
    const [loadingRevealPin, setLoadingRevealPin] = useState(false);
    const revealPinAnimations = useRef<Animated.Value[]>([]);


    const handleRevealPin = async () => {
        setRevealedPin(null);
        setRevealPinShown(true);
        setLoadingRevealPin(true);
        try {
            const pin = await fetchUserPin();
            setRevealedPin(pin);
        } catch (e) {
            console.error('Failed to fetch PIN:', e);
        } finally {
            setLoadingRevealPin(false);
        }
    };


    const handleTopUp = async (amount: number) => {
        setLoading(true);
        setTopUpVisible(false);

        const result = await makeStripeTopUp(amount);
        setLoading(false);

        if (!result.success || !result.client_secret) {
            payResMessage.current = result.error ?? 'Failed to start payment.';
            setShowPayResult(true);
            return;
        }

        router.push({
            pathname: '/payment' as never,
            params: { client_secret: result.client_secret, amount: String(amount) },
        });
    };


    const handleSavePin = async (pin: number) => {
        if (!user?.id) {
            return;
        }

        await savePin(pin, user.id)
            .then(res => {
                res.success ? Alert.alert('Success', 'Your PIN has been saved successfully') : Alert.alert('Error', 'Failed to save PIN')
            })
            .catch(e => {
                Alert.alert('Error', 'An error occurred while saving your PIN. Please try again.');
            })
            .finally(() => setPinVisible(false));
    };


    const loadData = async () => {
        setLoading(true);
        await Promise.all([
            UserStorage.getUser()
                .then(u => setUser(u as User)),
        ]).catch(e => console.error('Error loading account data:', e));
        setLoading(false);
    };


    const handleSaveCardNum = async (cardNum: string) => {
        const digits = cardNum.replace(/\D/g, '');
        const parsedCardNum = parseInt(digits, 10);

        if (digits.length < 12 || digits.length > 19) {
            throw new Error('Card number must be between 12 and 19 digits');
        }

        if (Number.isNaN(parsedCardNum)) {
            throw new Error('Invalid card number');
        }
        setLoading(true);
        typeof user?.id === 'number' &&
            await saveCardNumber(parsedCardNum, user.id)
                .then(async res => { res.success && await loadData() && Alert.alert('Success', 'Card number updated successfully'); })
                .catch(e => { Alert.alert('Error', 'Failed to update card number. Please try again.'); })
                .finally(() => setLoading(false));
    };


    useEffect(() => { loadData() }, []);

    useFocusEffect(
        useCallback(() => { loadData(); }, [])
    );

    useEffect(() => {
        if (!revealedPin) {
            setRevealPinDigits([]);
            revealPinAnimations.current = [];
            return;
        }
        const digits = revealedPin.split('');
        setRevealPinDigits(digits);
        revealPinAnimations.current = digits.map(() => new Animated.Value(0));
        Animated.stagger(
            120,
            revealPinAnimations.current.map(val =>
                Animated.timing(val, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                })
            )
        ).start();
    }, [revealedPin]);



    const hotCount = user?.hot_drinks_count ?? 0;
    const hasFree = user?.free_drinks ?? 0;
    const progress = Math.min(hotCount / HOT_DRINKS_GOAL, 1);
    const hasPin = !!user?.market_card_pin;

    return (
        <View style={styles.screen}>

            <IfUserNotSignedIn goTo="/sign-in" />

            <AppModal
                visible={loading}>
                {<LoadingComponent />}
            </AppModal>

            {user?.market_card_pin && (
                <AppModal
                    title={loadingRevealPin ? 'Getting Your PIN...' : 'Keep Your PIN Safe'}
                    visible={revealPinShown}
                    onClose={() => { setRevealPinShown(false); setRevealedPin(null); }}
                    children={
                        <>
                            {loadingRevealPin ? (
                                <LoadingComponent />
                            ) : (
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    {revealPinDigits.map((digit, index) => {
                                        const animation = revealPinAnimations.current[index] ?? new Animated.Value(0);
                                        return (
                                            <Animated.Text
                                                key={index}
                                                style={[styles.pinDigit, { opacity: animation, transform: [{ translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }] }]}
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
            )}

            <AppModal
                visible={showPayResult}
                message={payResMessage.current ?? undefined}
                title="Payment Status"
                onClose={() => setShowPayResult(false)}
            />


            <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.title}>My Account</Text>
                    <Text style={styles.subtitle}>
                        {user?.first_name} {user?.last_name}
                    </Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardLabel}>Market Card</Text>
                        {hasPin && (
                            <TouchableOpacity style={styles.revealPinButton} onPress={handleRevealPin}>
                                <Text style={styles.revealPin}>
                                    Reveal PIN
                                </Text>
                                <MaterialCommunityIcons name="eye-outline" size={22} color="#fff" />
                            </TouchableOpacity>
                        )}
                    </View>

                    <Text style={styles.cardNumber}>{String(user.market_card_number ?? '')}</Text>

                    <Text style={styles.balanceLabel}>Current Balance</Text>
                    <Text style={styles.balance}>
                        £{(user.market_card_balance ?? 0).toFixed(2)}
                    </Text>
                    <View style={styles.cardActions}>

                        <View style={styles.cardOption}><MainButton
                            title={'Edit Card'}
                            onPress={() => setCardNumVisible(true)}
                        /></View>

                        <View style={styles.cardOption}><MainButton
                            title="Top Up"
                            onPress={() => setTopUpVisible(true)}
                        /></View>

                        <View style={styles.cardOption}><MainButton
                            title={hasPin ? 'Edit PIN' : 'Add PIN'}
                            onPress={() => setPinVisible(true)}
                        /></View>

                    </View>
                </View>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Hot Drinks</Text>

                    {hasFree ? (
                        <View style={styles.freeDrinkBanner}>
                            <Text style={styles.freeDrinkText}>
                                You have a free hot drink! Redeem it at the machine.
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.loyaltyCard}>
                            <View style={styles.loyaltyRow}>
                                <Text style={styles.loyaltyCount}>
                                    <MaterialCommunityIcons name="coffee" size={24} color="#481186" /> {hotCount} / {HOT_DRINKS_GOAL}
                                </Text>
                            </View>
                            <Text style={styles.loyaltyHint}>
                                ({HOT_DRINKS_GOAL - hotCount} more to go)
                            </Text>
                            <Progress progress={progress} color="purple" />
                        </View>
                    )}
                </View>

            </ScrollView>

            <TopUpModal
                visible={topUpVisible}
                onClose={() => setTopUpVisible(false)}
                onTopUp={handleTopUp}
            />

            <SetPinModal
                visible={pinVisible}
                hasPin={hasPin}
                onClose={() => setPinVisible(false)}
                onSave={handleSavePin}
            />

            <UserProfileModal onUpdate={loadData} />

            <SetCardNumModal
                visible={cardNumVisible}
                onClose={() => setCardNumVisible(false)}
                onSave={handleSaveCardNum}
            />
        </View>
    )
}


