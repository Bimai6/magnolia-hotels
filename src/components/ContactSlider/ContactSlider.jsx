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
          <div className="contact-title">
            <h2>Contacto</h2>
            <p>Ponte en contacto con nosotros a través de:</p>
          </div>
          <div className="email-btn">
            <h4>Mail</h4>
            <EmailButton />
          </div>
          <div className="phone-section">
            <h4 >Teléfono:</h4>
            <a href="tel:+34222222222"><h3>+34 222 222 222</h3></a>
            <p>Servicio para llamadas desde España (ofrecido en Español)</p>
          </div>
          <div className="media-icons">
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
