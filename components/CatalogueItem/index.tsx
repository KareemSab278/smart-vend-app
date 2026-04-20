import React from 'react';
import { ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle, useWindowDimensions } from 'react-native';
import { Button, Card, Chip } from 'react-native-paper';

import { CatalogueItemData } from '@/helpers/getCatalogueItemData';

type CatalogueItemProps = {
  item: CatalogueItemData;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function CatalogueItem({ item, onPress, style }: CatalogueItemProps) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.floor((width - 32) / 2);

  return (
    <Card
      mode="elevated"
      style={[styles.card, { width: cardWidth }, style]}
      onPress={onPress}
    >
      {item.image ? (
        <Card.Cover source={{ uri: item.image }} resizeMode="cover" />
      ) : null}

      <Card.Content>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>

        <Text numberOfLines={3} style={styles.description}>
          {item.description}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {item.vegan ? <Chip compact style={styles.chip}>Vegan</Chip> : null}
          {item.vegetarian ? <Chip compact style={styles.chip}>Vegetarian</Chip> : null}
          {item.kosher ? <Chip compact style={styles.chip}>Kosher</Chip> : null}
          {item.halal ? <Chip compact style={styles.chip}>Halal</Chip> : null}
        </ScrollView>
      </Card.Content>

      <Card.Actions style={styles.actions}>
        <Button onPress={onPress}>Select</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    marginHorizontal: 8,
    borderRadius: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontSize: 16,
    marginBottom: 4,
    marginRight: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
  },
  description: {
    marginTop: 4,
    color: '#4a4a4a',
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  chip: {
    marginRight: 4,
  },
  actions: {
    justifyContent: 'flex-end',
  },
});
