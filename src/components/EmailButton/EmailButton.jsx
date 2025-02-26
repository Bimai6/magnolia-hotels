import "./EmailButton.css";

const GmailButton = () => {
  const email = "magnoliaHotelsDev@gmail.com";
  const subject = "Consulta desde la web";

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}`;

  const handleClick = () => {
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button className="email-button" onClick={handleClick}>
      Enviar Email
    </button>
  );
};

export default GmailButton;
