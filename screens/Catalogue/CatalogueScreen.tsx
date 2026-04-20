import { LoadingComponent, SomethingWentWrong } from '@/components/Loading';
import { CatalogueItemData, fetchCatalogueData } from '@/helpers/getCatalogueItemData';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CatalogueItem from '../../components/CatalogueItem';

export default function CatalogueScreen() {
    const [catalogueData, setCatalogueData] = useState<CatalogueItemData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const getAndSetCatalogueData = async () => {
        setLoading(true);
        try {
            await fetchCatalogueData().then(
                (data) => { data ? setCatalogueData(data as CatalogueItemData[]) : setError(true) });
        } catch (err) {
            console.error('Error fetching catalogue data:', err);
            setError(true);
        }
        setLoading(false);
    }

    useEffect(() => { getAndSetCatalogueData() }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Catalogue</Text>
            {loading && <LoadingComponent />}
            {error && <SomethingWentWrong />}
            {!loading && !error &&
                <FlatList
                    data={catalogueData}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <CatalogueItem
                            item={item}
                            onPress={() => console.log('Selected', item.name)}
                        />
                    )}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        paddingTop: 24,
        paddingHorizontal: 24,
        marginBottom: 12,
        fontSize: 32,
        fontWeight: '700',
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingVertical: 12,
        flexGrow: 1,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
});
