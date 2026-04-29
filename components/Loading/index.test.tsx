import { render } from '@testing-library/react-native';
import React from 'react';
import { LoadingComponent, SomethingWentWrong } from './index';

jest.mock('react-native-paper', () => ({
  MD2Colors: { purple100: '#e1bee7' },
}));

describe('LoadingComponent', () => {
  it('renders the loading text', () => {
    const { getByText } = render(<LoadingComponent />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders an ActivityIndicator', () => {
    const { UNSAFE_getByType } = render(<LoadingComponent />);
    const { ActivityIndicator } = require('react-native');
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });
});

describe('SomethingWentWrong', () => {
  it('renders the error heading', () => {
    const { getByText } = render(<SomethingWentWrong />);
    expect(getByText('Oops!')).toBeTruthy();
  });

  it('renders the error subtitle', () => {
    const { getByText } = render(<SomethingWentWrong />);
    expect(getByText('Something went wrong')).toBeTruthy();
  });
});
