import "./ContactSlider.css";
import EmailButton from "../EmailButton/EmailButton";

const ContactSlider = ({ isOpen, onClose }) => {
  return (
    <>

      <div className={`overlay ${isOpen ? "visible" : ""}`} onClick={onClose}></div>

      <div className={`contact-slider ${isOpen ? "open" : ""}`}>
        <div className="contact-slider-content">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          <h2>Contacto</h2>
          <p>Ponte en contacto con nosotros a través de:</p>
          <h4 className="contact-titles">Mail</h4>
          <EmailButton />
          <h4 className="contact-titles">Teléfono:</h4>
          <h3>+34 903-410-048</h3>
          <p className="coment">Servicio para llamadas desde España (ofrecido en Español)</p>
            <div className="footer-icons">
              <a href="#" aria-label="Instagram">
                <img src="https://res.cloudinary.com/dczjloaiy/image/upload/v1738835940/Frame_htcow1.png" alt="Instagram" />
              </a>
              <a href="#" aria-label="Facebook">
                <img src="https://res.cloudinary.com/dczjloaiy/image/upload/v1738835940/Frame_1_pk6tlv.png" alt="Facebook" />
              </a>
            </div>
        </div>
      </div>
    </>
  );
};

export default ContactSlider;
