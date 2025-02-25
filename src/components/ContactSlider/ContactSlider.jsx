import "./ContactSlider.css";
import EmailButton from "../EmailButton/EmailButton";

const ContactSlider = ({ isOpen, onClose }) => {
  return (
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
      </div>
    </div>
  );
};

export default ContactSlider;
