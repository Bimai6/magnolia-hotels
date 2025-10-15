import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import ContactSlider from "../ContactSlider/ContactSlider";

describe("ContactSlider", () => {

    it("Displays contact title correctly", () => {
        render(<ContactSlider />);
        expect(screen.getByText("Contacto")).toBeInTheDocument();
        expect(screen.getByText("Ponte en contacto con nosotros a través de:")).toBeInTheDocument();
    });

    it("Displays mail title correctly", () => {
        render(<ContactSlider />);
        expect(screen.getByText("Mail")).toBeInTheDocument();
    });

    it("Displays phone section correctly", () => {
        render(<ContactSlider />);
        expect(screen.getByText("Teléfono:")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "+34 222 222 222" })).toHaveAttribute("href", "tel:+34222222222");
        expect(screen.getByText("Servicio para llamadas desde España (ofrecido en Español)")).toBeInTheDocument();
    });

    it("Displays media icons correctly", () => {
        render(<ContactSlider />);
        expect(screen.getByAltText("Instagram")).toHaveAttribute("src", "https://res.cloudinary.com/dczjloaiy/image/upload/v1738835940/Frame_htcow1.png");
        expect(screen.getByAltText("Facebook")).toHaveAttribute("src", "https://res.cloudinary.com/dczjloaiy/image/upload/v1738835940/Frame_1_pk6tlv.png");
    })
})
