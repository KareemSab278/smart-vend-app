import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { MD2Colors } from 'react-native-paper';

export { LoadingComponent };
const LoadingComponent = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator animating={true} color={MD2Colors.purple100} size={'large'} />
            <Text style={styles.subtitle}>Loading</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 16,
        color: '#555',
    }
})