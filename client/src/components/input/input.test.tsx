import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Input from './input';

configure({adapter: new Adapter()});

test('renders error text', () => {
  render(<Input name="Test" errorText={"Input Error"}></Input>);
  const linkElement = screen.getByText(/Input Error/i);
  expect(linkElement).toBeInTheDocument();
});

test('input register input change', () => {
  const mockCallBack = jest.fn();
  const inputWrapper = shallow((<Input onChange={mockCallBack} name="Test" errorText={"Input Error"}></Input>));
  const input = inputWrapper.find('input');
  input.simulate('focus');
  input.simulate('change', { target: { value: 'Changed' } });
  expect(mockCallBack.mock.calls.length).toEqual(1);
});

test('input register key presses', () => {
  const mockCallBack = jest.fn();
  const inputWrapper = shallow((<Input onInput={mockCallBack} name="Test" errorText={"Input Error"}></Input>));
  const input = inputWrapper.find('input');
  input.simulate('input');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});
