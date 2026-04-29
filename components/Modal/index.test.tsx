import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import AppModal from './index';

describe('AppModal', () => {
  it('renders title and message when visible', () => {
    const { getByText } = render(
      <AppModal visible title="Hello" message="This is a message" />
    );
    expect(getByText('Hello')).toBeTruthy();
    expect(getByText('This is a message')).toBeTruthy();
  });

  it('does not render title or message when not provided', () => {
    const { queryByText } = render(<AppModal visible />);
    expect(queryByText('Hello')).toBeNull();
  });

  it('renders children inside the modal', () => {
    const { getByText } = render(
      <AppModal visible>
        <Text>Child content</Text>
      </AppModal>
    );
    expect(getByText('Child content')).toBeTruthy();
  });

  it('calls onClose when backdrop is pressed', () => {
    const onClose = jest.fn();
    const { getAllByRole } = render(
      <AppModal visible title="Close me" onClose={onClose} />
    );
    // The outer Pressable is the backdrop
    const pressables = getAllByRole('button');
    fireEvent.press(pressables[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render content when visible is false', () => {
    const { queryByText } = render(
      <AppModal visible={false} title="Hidden" message="Not shown" />
    );
    expect(queryByText('Hidden')).toBeNull();
    expect(queryByText('Not shown')).toBeNull();
  });

  it('defaults to fade animation type', () => {
    // Just ensure it renders without errors when animationType is omitted
    const { getByText } = render(<AppModal visible title="Fade" />);
    expect(getByText('Fade')).toBeTruthy();
  });

  it('renders with slide animation type', () => {
    const { getByText } = render(
      <AppModal visible title="Slide" animationType="slide" />
    );
    expect(getByText('Slide')).toBeTruthy();
  });
});
