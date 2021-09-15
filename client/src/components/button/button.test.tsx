import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './button';

test('renders button content correctly', () => {
  render(<Button onPress={() => {/** */}}>Button Content</Button>);
  const linkElement = screen.getByText(/Button Content/i);
  expect(linkElement).toBeInTheDocument();
});
