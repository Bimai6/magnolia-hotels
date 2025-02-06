import React from "react";
import "./footer.css"; // Asegúrate de que el archivo CSS esté en la misma carpeta

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-contact">
        <h3>Contacto</h3>
        <p>Teléfono: <a href="tel:+34222222222">+34 222 222 222</a></p>
      </div>
      <div className="footer-icons">
        <a href="#" aria-label="Instagram">
          <img src="https://res.cloudinary.com/dczjloaiy/image/upload/v1738835940/Frame_htcow1.png" alt="Instagram" />
        </a>
        <a href="#" aria-label="Facebook">
          <img src="https://res.cloudinary.com/dczjloaiy/image/upload/v1738835940/Frame_1_pk6tlv.png" alt="Facebook" />
        </a>
      </div>
      <div className="footer-links">
        <a href="#">Aviso Legal</a>
        <a href="#">Política de Privacidad</a>
        <a href="#">Política de Cookies</a>
        <a href="#">Configuración de Cookies</a>
      </div>
      <div className="footer-logo">
        <img src="https://res.cloudinary.com/dczjloaiy/image/upload/v1738835926/IMG-20250202-WA0012_4_ccugjh.png" alt="Magnolia Hotels Logo" />
      </div>
      <p className="footer-copy">
        ©2025 Magnolia Hotels. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
