import { MainButton, SecondaryButton, SignOutButton, UserButton } from '@/components/Button';
import { InputField } from '@/components/InputField';
import AppModal from '@/components/Modal';
import { UserStorage } from '@/store/Storage';
import { User } from '@/Types/User';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { userModalStyles } from '../styles';

type Props = {
    onUpdate?: ((values: User) => void) | null;
};

const editInputFields: { label: string; valueKey: keyof User; fn?: (v: string) => string }[] = [
    { label: 'First Name', valueKey: 'first_name', fn: (v: string) => v.trim() },
    { label: 'Last Name', valueKey: 'last_name', fn: (v: string) => v.trim() },
    { label: 'Email', valueKey: 'email', fn: (v: string) => v.trim() },
    { label: 'Address Line 1', valueKey: 'address1', fn: (v: string) => v.trim() },
    { label: 'Address Line 2', valueKey: 'address2', fn: (v: string) => v.trim() },
    { label: 'City', valueKey: 'city', fn: (v: string) => v.trim() },
    { label: 'County', valueKey: 'county', fn: (v: string) => v.trim() },
    { label: 'Postcode', valueKey: 'postcode', fn: (v: string) => v.trim() },
    { label: 'Phone', valueKey: 'phone', fn: (v: string) => v.trim() },
];

export const UserProfileModal = ({ onUpdate }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [visible, setVisible] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editValues, setEditValues] = useState<User>({} as User);
    const router = useRouter();

    const loadUserData = async () => {
        try {
            const storedUser = await UserStorage.getUser();
            if (!storedUser?.id) {
                return;
            }
            setUser(storedUser);
            setEditValues(storedUser as User);
        } catch (e) {
            console.error('Error loading user account details:', e);
        }
    };
    
    useEffect(() => { loadUserData() }, []);

    const openModal = () => {
        setEditing(false);
        setVisible(true);
    };

    const handleSignOut = async () => {
        await UserStorage.clearUser();
        setVisible(false);
        router.replace('/sign-in');
    };

    const handleSave = async () => {
        onUpdate && onUpdate(editValues);

        if (user) {
            setUser({ ...user, ...editValues });
        }

        await UserStorage.saveUser({ ...user, ...editValues } as User)
            .catch(e => console.error('Error saving user data:', e));

        setEditing(false);
    };

    const handleCancelEdit = () => {
        user && setEditValues(user as User);
        setEditing(false);
    };

    const initial = user?.first_name?.[0]?.toUpperCase() ?? '?';

    return (
        <>
            <UserButton title={initial} onPress={openModal} />

            <AppModal visible={visible} onClose={() => setVisible(false)}>
                {!editing ? (
                    <View style={userModalStyles.viewMode}>
                        <View style={userModalStyles.avatarLarge}>
                            <Text style={userModalStyles.avatarLargeText}>{initial}</Text>
                        </View>
                        <Text style={userModalStyles.name}>{user?.first_name} {user?.last_name}</Text>
                        <Text style={userModalStyles.email}>{user?.email}</Text>
                        <Text style={userModalStyles.card}>Card #{user?.market_card_number}</Text>

                        <SecondaryButton title="Edit Profile" onPress={() => setEditing(true)} />
                        <SignOutButton onPress={handleSignOut} />

                    </View>
                ) : (
                    <View>
                        <Text style={userModalStyles.editTitle}>Edit Profile</Text>
                        <ScrollView style={userModalStyles.editSection}>
                            {editInputFields.map(input => (
                                <InputField
                                    key={input.valueKey}
                                    label={input.label}
                                    value={String(editValues[input.valueKey])}
                                    onChangeText={v => setEditValues(prev => ({ ...prev, [input.valueKey]: input.fn ? input.fn(v) : v }))}
                                    keyboardType={input.valueKey === 'email' ? 'email-address' : 'default'}
                                />
                            ))}
                        </ScrollView>
                        <View style={userModalStyles.editActions}>
                            <MainButton title="Save" onPress={handleSave} />
                        </View>
                        <SecondaryButton title="Cancel" onPress={handleCancelEdit} />
                    </View>
                )}
            </AppModal>
        </>
    );
}
