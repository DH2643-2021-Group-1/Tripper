import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from './input';

test('renders error text', () => {
  render(<Input name="Test" errorText={"Input Error"}></Input>);
  const linkElement = screen.getByText(/Input Error/i);
  expect(linkElement).toBeInTheDocument();
});
