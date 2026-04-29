import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { MD2Colors } from 'react-native-paper';

export { LoadingComponent, SomethingWentWrong };

const LoadingComponent = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} color={MD2Colors.purple100} size={'large'} />
            <Text style={styles.subtitle}>Loading...</Text>
        </View>
    );
};

const SomethingWentWrong = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.errorMessage}>Oops!</Text>
            <Text style={styles.subtitle}>Something went wrong</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    errorMessage: {
        fontSize: 18,
        color: '#555',
    },
    subtitle: {
        marginTop: 8,
        fontSize: 16,
        color: '#555',
    }
})