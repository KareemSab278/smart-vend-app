import { CatalogueItemType } from '@/Types/Catalogue';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { CatalogueItem, HorizontalItemCard } from './index';

jest.mock('@expo/vector-icons', () => {
  const { createElement } = require('react');
  const { View } = require('react-native');
  return {
    MaterialCommunityIcons: ({ name }: { name: string }) =>
      createElement(View, { testID: `icon-${name}` }),
  };
});

jest.mock('react-native-paper', () => {
  const { createElement } = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    Card: Object.assign(
      ({ children, onPress, style }: any) =>
        createElement(TouchableOpacity, { onPress, style }, children),
      {
        Cover: () => createElement(View, { testID: 'card-cover' }),
        Content: ({ children }: any) => createElement(View, null, children),
      }
    ),
    Chip: ({ children }: any) =>
      createElement(View, { testID: 'chip' }, createElement(Text, null, children)),
  };
});

const baseItem: CatalogueItemType = {
  id: 1,
  name: 'Cola',
  description: 'A fizzy drink',
  price: 1.5,
};

const itemWithImage: CatalogueItemType = {
  ...baseItem,
  image: 'https://example.com/cola.png',
};

const itemWithDietary: CatalogueItemType = {
  ...baseItem,
  vegan: true,
  gluten_free: true,
};

describe('CatalogueItem', () => {
  it('renders the item name', () => {
    const { getByText } = render(<CatalogueItem item={baseItem} />);
    expect(getByText('Cola')).toBeTruthy();
  });

  it('renders the item price', () => {
    const { getByText } = render(<CatalogueItem item={baseItem} />);
    expect(getByText('£1.50')).toBeTruthy();
  });

  it('renders the description', () => {
    const { getByText } = render(<CatalogueItem item={baseItem} />);
    expect(getByText('A fizzy drink')).toBeTruthy();
  });

  it('calls onPress when the card is pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<CatalogueItem item={baseItem} onPress={onPress} />);
    fireEvent.press(getByText('Cola'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows quantity badge when quantity > 0', () => {
    const { getByText } = render(<CatalogueItem item={baseItem} quantity={3} />);
    expect(getByText('3')).toBeTruthy();
  });

  it('does not show quantity badge when quantity is 0', () => {
    const { queryByText } = render(<CatalogueItem item={baseItem} quantity={0} />);
    expect(queryByText('0')).toBeNull();
  });

  it('renders the image cover when image is provided', () => {
    const { getByTestId } = render(<CatalogueItem item={itemWithImage} />);
    expect(getByTestId('card-cover')).toBeTruthy();
  });
});

describe('HorizontalItemCard', () => {
  it('renders the item name', () => {
    const { getByText } = render(
      <HorizontalItemCard item={baseItem} onPress={jest.fn()} />
    );
    expect(getByText('Cola')).toBeTruthy();
  });

  it('renders the item price', () => {
    const { getByText } = render(
      <HorizontalItemCard item={baseItem} onPress={jest.fn()} />
    );
    expect(getByText('£1.50')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <HorizontalItemCard item={baseItem} onPress={onPress} />
    );
    fireEvent.press(getByText('Cola'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders image placeholder icon when no image', () => {
    const { getByTestId } = render(
      <HorizontalItemCard item={baseItem} onPress={jest.fn()} />
    );
    expect(getByTestId('icon-image-off-outline')).toBeTruthy();
  });
});
