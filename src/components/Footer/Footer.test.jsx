import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";
import { describe, it, expect } from "vitest";

describe("Footer", () => {
  it("renders the contact title", () => {
    render(<Footer />);
    const contactTitle = screen.getByText(/Contact/i);
    expect(contactTitle).toBeInTheDocument();
  });
});