import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";
import { describe, it, expect } from "vitest";

describe("Footer", () => {
  it("Displays contact information correctly", () => {
    render(<Footer />);
    expect(screen.getByText("Contacto")).toBeInTheDocument();
    expect(screen.getByText("Teléfono:")).toBeInTheDocument();
    expect(screen.getByRole("link", {name: "+34 222 222 222"})).toHaveAttribute("href", "tel:+34222222222");
  });

  it("Social media icons have the correct images", () => {
    render(<Footer />);
    expect(screen.getByAltText("Instagram")).toBeInTheDocument();
    expect(screen.getByAltText("Facebook")).toBeInTheDocument();
  });

  it("Displays links information correctly", () => {
    render(<Footer />);
    expect(screen.getByText("Aviso Legal")).toBeInTheDocument();
    expect(screen.getByText("Política de Privacidad")).toBeInTheDocument();
    expect(screen.getByText("Política de Cookies")).toBeInTheDocument();
    expect(screen.getByText("Configuración de Cookies")).toBeInTheDocument();
  });

  it("Displays the logo correctly", () => {
    render(<Footer />);
    const logo = screen.getByAltText("Magnolia Hotels Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "https://res.cloudinary.com/dczjloaiy/image/upload/v1738835926/IMG-20250202-WA0012_4_ccugjh.png");
  });

  it("Displays footer copyright correctly"), () => {
    render(<Footer />);
    expect(screen.getByText("©2025 Magnolia Hotels. Todos los derechos reservados.")).toBeInTheDocument();
  }
});

