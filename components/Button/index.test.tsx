import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import {
    CartButton,
    FiltersButton,
    MainButton,
    SearchToggleButton,
    SecondaryButton,
    SignOutButton,
    UserButton,
} from './index';

jest.mock('@expo/vector-icons', () => {
  const { createElement } = require('react');
  const { View } = require('react-native');
  return {
    MaterialCommunityIcons: ({ name }: { name: string }) =>
      createElement(View, { testID: `icon-${name}` }),
  };
});

describe('MainButton', () => {
  it('renders the title', () => {
    const { getByText } = render(<MainButton title="Submit" />);
    expect(getByText('Submit')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<MainButton title="Submit" onPress={onPress} />);
    fireEvent.press(getByText('Submit'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders without onPress', () => {
    const { getByText } = render(<MainButton title="No Press" />);
    expect(getByText('No Press')).toBeTruthy();
  });
});

describe('SecondaryButton', () => {
  it('renders the title', () => {
    const { getByText } = render(<SecondaryButton title="Cancel" />);
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<SecondaryButton title="Cancel" onPress={onPress} />);
    fireEvent.press(getByText('Cancel'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('SearchToggleButton', () => {
  it('renders the search icon', () => {
    const { getByTestId } = render(<SearchToggleButton />);
    expect(getByTestId('icon-magnify')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<SearchToggleButton onPress={onPress} />);
    fireEvent.press(getByTestId('icon-magnify'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('FiltersButton', () => {
  it('renders the filter icon', () => {
    const { getByTestId } = render(<FiltersButton />);
    expect(getByTestId('icon-filter-variant')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<FiltersButton onPress={onPress} />);
    fireEvent.press(getByTestId('icon-filter-variant'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('UserButton', () => {
  it('renders the title initial', () => {
    const { getByText } = render(<UserButton title="JD" />);
    expect(getByText('JD')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<UserButton title="JD" onPress={onPress} />);
    fireEvent.press(getByText('JD'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('SignOutButton', () => {
  it('renders Sign Out text', () => {
    const { getByText } = render(<SignOutButton />);
    expect(getByText('Sign Out')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<SignOutButton onPress={onPress} />);
    fireEvent.press(getByText('Sign Out'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('CartButton', () => {
  it('renders nothing when cart is empty', () => {
    const { queryByTestId } = render(<CartButton cartItems={[]} />);
    expect(queryByTestId('icon-cart')).toBeNull();
  });

  it('renders cart icon and total quantity when items exist', async () => {
    const cartItems = [
      { id: 1, name: 'Cola', price: 1.5, quantity: 2 },
      { id: 2, name: 'Water', price: 1.0, quantity: 1 },
    ];
    const { getByText } = await act(async () =>
      render(<CartButton cartItems={cartItems} />)
    );
    expect(getByText('3')).toBeTruthy();
  });

  it('calls onPress when cart button is pressed', async () => {
    const onPress = jest.fn();
    const cartItems = [{ id: 1, name: 'Cola', price: 1.5, quantity: 1 }];
    const { getByText } = await act(async () =>
      render(<CartButton cartItems={cartItems} onPress={onPress} />)
    );
    fireEvent.press(getByText('1'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
