import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import PureInput from './PureInput';

configure({ adapter: new Adapter() });


test('change callback is called', () => {
  const mockCallBack = jest.fn();
  const inputWrapper = shallow((<PureInput text={""} onEditText={mockCallBack}></PureInput>));
  inputWrapper.simulate('focus');
  inputWrapper.simulate('blur', { target: { value: 'Changed' } });
  expect(mockCallBack.mock.calls.length).toEqual(1);
});
