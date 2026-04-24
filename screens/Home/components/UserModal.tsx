import { MainButton, SecondaryButton, SignOutButton, UserButton } from '@/components/Button';
import { InputField } from '@/components/InputField';
import AppModal from '@/components/Modal';
import { UserStorage } from '@/store/Storage';
import { User, UserProfileEditValues } from '@/Types/User';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../Styles';

type Props = {
    onUpdate: (values: UserProfileEditValues) => void;
};

export const UserProfileModal = ({ onUpdate }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [visible, setVisible] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editValues, setEditValues] = useState<UserProfileEditValues>({
        first_name: '',
        last_name: '',
        email: '',
    });
    const router = useRouter();

    useEffect(() => {
        UserStorage.getUser().then(u => {
            setUser(u as User);
            setEditValues(u as UserProfileEditValues);
        });
    }, []);

    const openModal = () => {
        setEditing(false);
        setVisible(true);
    };

    const handleSignOut = async () => {
        await UserStorage.clearUser();
        setVisible(false);
        router.replace('/sign-in');
    };

    const handleSave = () => {
        onUpdate(editValues);
        if (user) {
            setUser({ ...user, ...editValues });
        }
        setEditing(false);
    };

    const handleCancelEdit = () => {
        user && setEditValues(user as UserProfileEditValues);
        setEditing(false);
    };

    const initial = user?.first_name?.[0]?.toUpperCase() ?? '?';

    return (
        <>
        <UserButton title={initial} onPress={openModal} />

        <AppModal visible={visible} onClose={() => setVisible(false)} animationType="fade">
            {!editing ? (
                <View style={styles.viewMode}>
                    <View style={styles.avatarLarge}>
                        <Text style={styles.avatarLargeText}>{initial}</Text>
                    </View>
                    <Text style={styles.name}>{user?.first_name} {user?.last_name}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                    <Text style={styles.card}>Card #{user?.market_card_number}</Text>

                    <SecondaryButton title="Edit Profile" onPress={() => setEditing(true)} />

                    <SignOutButton onPress={handleSignOut} />

                </View>
            ) : (
                <View>
                    <Text style={styles.editTitle}>Edit Profile</Text>
                    <InputField
                        label="First Name"
                        value={editValues.first_name}
                        onChangeText={v => setEditValues(prev => ({ ...prev, first_name: v }))}
                        autoCapitalize="words"
                    />
                    <InputField
                        label="Last Name"
                        value={editValues.last_name}
                        onChangeText={v => setEditValues(prev => ({ ...prev, last_name: v }))}
                        autoCapitalize="words"
                    />
                    <InputField
                        label="Email"
                        value={editValues.email}
                        onChangeText={v => setEditValues(prev => ({ ...prev, email: v }))}
                        keyboardType="email-address"
                    />
                    <View style={styles.editActions}>
                        <MainButton title="Save" onPress={handleSave} />
                    </View>
                        <SecondaryButton title="Cancel" onPress={handleCancelEdit} />
                </View>
            )}
        </AppModal>
        </>
    );
}
