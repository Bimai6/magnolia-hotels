import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Wrapper = ({ children }) => {
    return (
        <AuthContext.Provider value={{ isLogged: false }}>
            <BrowserRouter>{children}</BrowserRouter>
        </AuthContext.Provider>
    );
};

describe("Header", () => {
    it("Displays header content correctly", () => {
        render(<Header />, { wrapper: Wrapper });

        const icon = screen.getByAltText('Logo');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('src', 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1739173714/IMG-20250202-WA0012_1_eic08v.png');

        const buttonText = ['Estancia', 'Restaurante', 'Identificarse'];
        buttonText.forEach((text) => {
            expect(screen.getByText(text)).toBeInTheDocument();
        });

        const contactoButton = screen.getByRole('button', { name: /Contacto/i });
        expect(contactoButton).toBeInTheDocument();
    });
});