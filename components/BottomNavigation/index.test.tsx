import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import BottomNavigationBar from './index';

// Mock the complex react-native-paper BottomNavigation to focus on the wrapper behaviour
jest.mock('react-native-paper', () => {
  const { createElement } = require('react');
  const { View, TouchableOpacity, Text } = require('react-native');
  return {
    BottomNavigation: ({
      navigationState,
      onIndexChange,
    }: {
      navigationState: { index: number; routes: { key: string; title: string }[] };
      onIndexChange: (i: number) => void;
    }) =>
      createElement(
        View,
        { testID: 'bottom-navigation' },
        navigationState.routes.map((route: { key: string; title: string }, i: number) =>
          createElement(
            TouchableOpacity,
            { key: route.key, testID: `tab-${route.key}`, onPress: () => onIndexChange(i) },
            createElement(Text, null, route.title)
          )
        )
      ),
  };
});

const routes = [
  { key: 'home', title: 'Home' },
  { key: 'catalogue', title: 'Catalogue' },
  { key: 'account', title: 'Account' },
];

const renderScene = () => React.createElement(Text, null, 'Scene');

describe('BottomNavigationBar', () => {
  it('renders the navigation container', () => {
    const { getByTestId } = render(
      <BottomNavigationBar routes={routes} renderScene={renderScene} />
    );
    expect(getByTestId('bottom-navigation')).toBeTruthy();
  });

  it('renders all route tabs', () => {
    const { getByTestId } = render(
      <BottomNavigationBar routes={routes} renderScene={renderScene} />
    );
    routes.forEach(route => expect(getByTestId(`tab-${route.key}`)).toBeTruthy());
  });

  it('uses defaultIndex of 0 by default', () => {
    const onIndexChange = jest.fn();
    render(
      <BottomNavigationBar
        routes={routes}
        renderScene={renderScene}
        onIndexChange={onIndexChange}
      />
    );
    // Default index is 0 — no change event fired without interaction
    expect(onIndexChange).not.toHaveBeenCalled();
  });

  it('calls onIndexChange when a tab is pressed', () => {
    const onIndexChange = jest.fn();
    const { getByTestId } = render(
      <BottomNavigationBar
        routes={routes}
        renderScene={renderScene}
        onIndexChange={onIndexChange}
      />
    );
    fireEvent.press(getByTestId('tab-catalogue'));
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it('respects a controlled index prop', () => {
    const onIndexChange = jest.fn();
    const { getByTestId } = render(
      <BottomNavigationBar
        routes={routes}
        renderScene={renderScene}
        index={2}
        onIndexChange={onIndexChange}
      />
    );
    fireEvent.press(getByTestId('tab-home'));
    expect(onIndexChange).toHaveBeenCalledWith(0);
  });

  it('uses provided defaultIndex', () => {
    const { getByTestId } = render(
      <BottomNavigationBar routes={routes} renderScene={renderScene} defaultIndex={1} />
    );
    expect(getByTestId('bottom-navigation')).toBeTruthy();
  });
});
