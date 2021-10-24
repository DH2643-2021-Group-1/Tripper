import React from "react";
import { configure, shallow } from "enzyme";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./button";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

test("renders button content correctly", () => {
  render(
    <Button
      onPress={() => {
        /** */
      }}
    >
      Button Content
    </Button>,
  );
  const linkElement = screen.getByText(/Button Content/i);
  expect(linkElement).toBeInTheDocument();
});

test("button register button click", () => {
  const mockCallBack = jest.fn();

  const button = shallow(
    <Button onPress={mockCallBack}>Button Content</Button>,
  );
  button.simulate("click");
  expect(mockCallBack.mock.calls.length).toEqual(1);
});

test("pressing a disabled button", () => {
  const mockCallBack = jest.fn();

  const button = shallow(
    <Button disabled={true} onPress={mockCallBack}>
      Button Content
    </Button>,
  );
  button.simulate("click");
  expect(mockCallBack.mock.calls.length).toEqual(0);
});
