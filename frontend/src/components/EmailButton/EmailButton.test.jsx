import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import GmailButton from "../EmailButton/EmailButton";

describe("GmailButton", () => {
  test("Button render correctly", () => {
    render(<GmailButton />);
    const button = screen.getByRole("button", { name: /enviar email/i });
    expect(button).toBeInTheDocument();
  });

  test("Open Gmail in a new tab when you click", () => {
    global.open = vi.fn();

    render(<GmailButton />);
    const button = screen.getByRole("button", { name: /enviar email/i });

    fireEvent.click(button);

    expect(global.open).toHaveBeenCalledWith(
      expect.stringContaining("https://mail.google.com/mail/"),
      "_blank",
      "noopener,noreferrer"
    );
  });
});
