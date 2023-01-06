import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("should contain copyright year", () => {
  render(<Footer />);
  const copyrightElement = screen.getByText(/2023/i);
  expect(copyrightElement).toBeInTheDocument();
});
