import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import AppModal from '../Modal';

import { CatalogueItemProps, CatalogueItemType } from '@/Types/Catalogue';


export { CatalogueItem, CatalogueItemProps, HorizontalItemCard };

const CatalogueItem = ({ item, onPress, quantity = 0, selected = false, style }: CatalogueItemProps) => {
  const [infoModal, setInfoModal] = useState(false);
  const { width } = useWindowDimensions();
  const cardWidth = Math.floor((width - 32) / 2);

  const dietaryTags = [
    { label: 'Vegan', value: item.vegan },
    { label: 'Vegetarian', value: item.vegetarian },
    { label: 'Gluten-Free', value: item.gluten_free },
    { label: 'Dairy-Free', value: item.dairy_free },
    { label: 'Peanut-Free', value: item.peanut_free },
    { label: 'Kosher', value: item.kosher },
    { label: 'Halal', value: item.halal },
  ];

  return (
    <Card
      mode="elevated"
      style={[styles.card, selected && styles.selectedCard, { width: cardWidth }, style]}
      onPress={onPress}
    >
      {item.image ? (
        <Card.Cover source={{ uri: item.image }} resizeMode="cover" />
      ) : null}

      {quantity > 0 ? (
        <View style={styles.quantityBadge}>
          <Text style={styles.quantityBadgeText}>{quantity}</Text>
        </View>
      ) : null}

      <Card.Content>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>£{item.price.toFixed(2)}</Text>
        </View>

        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>


        <ScrollView
          horizontal
          bounces
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          <Text onPress={() => { setInfoModal(true) }} style={styles.chip} >
            <MaterialCommunityIcons name="information" size={30} color="#00000070" />
          </Text>

        </ScrollView>
      </Card.Content>

      <AppModal visible={infoModal} onClose={() => setInfoModal(false)}>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>Price: £{item.price.toFixed(2)}</Text>
        <View style={styles.dietaryTagsContainer}>
          {dietaryTags.filter(tag => tag.value).map((tag) => (
            <Chip key={tag.label} style={styles.dietaryTagChip} mode='flat'>
              {tag.value ? tag.label : null}
            </Chip>
          ))}
        </View>
      </AppModal>
    </Card>
  );
}

function HorizontalItemCard({ item, onPress }: { item: CatalogueItemType; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.hCard} onPress={onPress} activeOpacity={0.75}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.hCardImage} />
      ) : (
        <View style={styles.hCardImagePlaceholder}>
          <MaterialCommunityIcons name="image-off-outline" size={28} color="#ccc" />
        </View>
      )}
      <Text style={styles.hCardName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.hCardPrice}>£{item.price.toFixed(2)}</Text>
      <View style={styles.hCardAddRow}>
        <MaterialCommunityIcons name="cart-plus" size={14} color="#773eb9" />
        <Text style={styles.hCardAddText}>Add to cart</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    marginHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#fcfcfc',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontSize: 18,
    marginBottom: 4,
    marginRight: 8,
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  description: {
    marginTop: 4,
    color: '#4a4a4a',
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  dietaryTagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  dietaryTagChip: { marginRight: 4, marginBottom: 7, backgroundColor: '#22c55e', borderRadius: 50 },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#22c55e',
    backgroundColor: '#f4fff3',
  },
  quantityBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    zIndex: 10,
  },
  quantityBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  itemCount: {
    flex: 1,
    fontSize: 18,
    marginBottom: 4,
    marginRight: 8,
    marginTop: 4,
  },
  hCard: {
    width: 120,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  hCardImage: {
    width: '100%',
    height: 90,
    resizeMode: 'cover',
  },
  hCardImagePlaceholder: {
    width: '100%',
    height: 90,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hCardName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 8,
    paddingTop: 6,
  },
  hCardPrice: {
    fontSize: 12,
    color: '#773eb9',
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingTop: 2,
  },
  hCardAddRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 8,
  },
  hCardAddText: {
    fontSize: 11,
    color: '#773eb9',
    fontWeight: '600',
  },
});
