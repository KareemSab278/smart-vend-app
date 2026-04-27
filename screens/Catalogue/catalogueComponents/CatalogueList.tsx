import { CatalogueItemData } from '@/ApiCallers/fetchCatalogue';
import { CatalogueItem } from '@/components/CatalogueItem';
import { SearchBar } from '@/components/SearchBar';
import { OrderItem } from '@/store/StorageHelpers';
import { useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { styles } from '../Styles';

interface CatalogueListProps {
    cart: OrderItem[];
    catalogueData: CatalogueItemData[];
    selectedCategory: string;
    dietaryFilters: Record<string, boolean>;
    handleItemSelect: (item: CatalogueItemData) => void;
}


export const CatalogueList = ({ cart, handleItemSelect, catalogueData, selectedCategory, dietaryFilters }: CatalogueListProps) => {

    const [searchQuery, setSearchQuery] = useState<string>('');

    const cartItemQuantities = useMemo(
        () => new Map(cart.map((cartItem) => [cartItem.id, cartItem.quantity])),
        [cart]
    );


    const filteredCatalogueData = useMemo(
        () => catalogueData.filter((item) => {
            if (selectedCategory !== 'all' && item.type !== selectedCategory) {
                return false;
            }
            for (const [key, value] of Object.entries(dietaryFilters)) {
                if (value && item[key] != true) {
                    return false;
                }
            }
            return true;
        }),
        [catalogueData, selectedCategory, dietaryFilters]
    );

    const visibleCatalogueData = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) {
            return filteredCatalogueData;
        }

        return filteredCatalogueData.filter((item) => {
            const name = item.name?.toString().toLowerCase() ?? '';
            const description = item.description?.toString().toLowerCase() ?? '';
            return name.includes(query) || description.includes(query);
        });
    }, [filteredCatalogueData, searchQuery]);


    return (
        <FlatList
            data={visibleCatalogueData}
            keyExtractor={(item) => String(item.id)}
            scrollEventThrottle={16}
            ListHeaderComponent={
                <View style={styles.searchBarContainer}>
                    <SearchBar
                        query={searchQuery}
                        onChangeQuery={setSearchQuery}
                        placeholder="Search products..."
                    />
                </View>
            }
            ListEmptyComponent={
                <Text style={styles.emptyText}>
                    "{searchQuery}" didn't match any items. Try adjusting your search or filters.
                </Text>
            }

            renderItem={({ item }) => {
                const itemId = Number(item.id);
                const quantity = cartItemQuantities.get(itemId) ?? 0;
                return (
                    <CatalogueItem
                        item={item}
                        onPress={() => handleItemSelect(item)}
                        quantity={quantity}
                        selected={quantity > 0}
                    />
                );
            }}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            style={styles.list}
        />
    )
}