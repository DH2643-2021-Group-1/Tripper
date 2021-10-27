import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./card";

test("renders content inside card correctly", () => {
  render(<Card>Card Content</Card>);
  const linkElement = screen.getByText(/Card Content/i);
  expect(linkElement).toBeInTheDocument();
});
