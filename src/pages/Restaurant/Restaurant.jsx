import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Restaurant.css';
import ButtonRestaurant from '../../components/ButtonRestaurant/ButtonRestaurant';

const MySwal = withReactContent(Swal);

const handleMenuClick = () => {
  const isMobile = window.innerWidth < 768;

  const images = isMobile
    ? [
        "https://res.cloudinary.com/dczjloaiy/image/upload/v1739952437/Mobile_Carta_Restaurante_Pag_1_1_telmro.png",
        "https://res.cloudinary.com/dczjloaiy/image/upload/v1739788112/Mobile_Carta_Restaurante_2_hmpv3x.png",
        "https://res.cloudinary.com/dczjloaiy/image/upload/v1739788113/Mobile_Carta_Cocktails_e4mpdq.png"
      ]
    : [
        "https://res.cloudinary.com/dczjloaiy/image/upload/v1739785736/Carta_Menu_jfzv5r.png",
        "https://res.cloudinary.com/dczjloaiy/image/upload/v1739785738/Carta_Cocktails_beuuhh.png"
      ];

  let currentIndex = 0;

  const updateImage = (index) => {
    currentIndex = index;
    MySwal.update({
      html: `
        <div class="swal-menu-container">
          <img src="${images[currentIndex]}" class="swal-menu-image" alt="Carta">
          <div class="swal-menu-nav">
            <button id="prevImage" class="swal-menu-button">🡸</button>
            <button id="nextImage" class="swal-menu-button">🡺</button>
          </div>
        </div>
      `,
    });

    document.getElementById('prevImage').addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
      updateImage(currentIndex);
    });

    document.getElementById('nextImage').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateImage(currentIndex);
    });
  };

  MySwal.fire({
    title: 'Nuestra Carta',
    html: `
      <div class="swal-menu-container">
        <img src="${images[0]}" class="swal-menu-image" alt="Carta">
        <div class="swal-menu-nav">
          <button id="prevImage" class="swal-menu-button">🡸</button>
          <button id="nextImage" class="swal-menu-button">🡺</button>
        </div>
      </div>
    `,
    showConfirmButton: false,
    showCloseButton: true,
    heightAuto: false,
    width: "80vw",
    maxWidth: "80vw",
    background: 'rgba(255, 255, 255, 0.9)',
    customClass: {
      popup: 'custom-swal-popup',
    },
    didOpen: () => {
      document.getElementById('prevImage').addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        updateImage(currentIndex);
      });

      document.getElementById('nextImage').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage(currentIndex);
      });
    }
  });
};

const handleReservationClick = () => {
  MySwal.fire({
    title: 'Estás a un simple paso de vivir una experiencia inolvidable.',
    html: `
      <div class="swal-reserva-container" style="display: flex; flex-direction: column; gap: 16px; text-align: center; align-items: center; width: 100%;">
  <div style="display: flex; align-items: center; gap: 10px; justify-content: center; width: 100%; white-space: nowrap;">
    <label for="name" style="width: 170px; text-align: right;">Nombre</label>
    <input type="text" id="name" class="swal-reserva-input" style="text-align: left;" required>
  </div>

  <div style="display: flex; align-items: center; gap: 10px; justify-content: center; width: 100%; white-space: nowrap;">
    <label for="email" style="width: 170px; text-align: right;">Correo electrónico</label>
    <input type="email" id="email" class="swal-reserva-input" style="text-align: left;" required>
  </div>

  <div style="display: flex; align-items: center; gap: 10px; justify-content: center; width: 100%; white-space: nowrap;">
    <label for="phone" style="width: 170px; text-align: right;">Teléfono de contacto</label>
    <input type="tel" id="phone" class="swal-reserva-input" style="text-align: left;" required>
  </div>

  <div style="display: flex; align-items: center; gap: 10px; justify-content: center; width: 100%; white-space: nowrap;">
    <label for="guests" style="width: 170px; text-align: right;">Comensales</label>
    <input type="number" id="guests" class="swal-reserva-input" style="text-align: left;" min="1" required>
  </div>

  <div style="display: flex; align-items: center; gap: 10px; justify-content: center; width: 100%; white-space: nowrap;">
    <label for="dateTime" style="width: 170px; text-align: right;">Fecha y hora</label>
    <input type="datetime-local" id="dateTime" class="swal-reserva-input" style="text-align: left;" required>
  </div>
</div>

    `,
    showConfirmButton: true,
    confirmButtonText: 'Confirmar',
    confirmButtonColor: '#DAA520',
    showCancelButton: true,
    cancelButtonText: 'Volver',
    cancelButtonColor: '#DAA520',
    focusConfirm: false,
    heightAuto: false,
    width: "60vw",
    maxWidth: "500px",
    background: 'rgba(79, 78, 78, 0.66)',
    color: '#fff',
    customClass: {
      popup: 'custom-swal-popup',
      actions: 'swal-reserva-actions',
      confirmButton: 'swal-reserva-confirm',
      cancelButton: 'swal-reserva-cancel'
    },
    preConfirm: () => {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const guests = parseInt(document.getElementById('guests').value, 10);
      const dateTime = document.getElementById('dateTime').value;
      const reservationNumber = Math.floor(100000000 + Math.random() * 900000000);
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const selectedDate = new Date(dateTime);
      const currentDate = new Date();

      if (!name || !email || !phone || !guests || !dateTime) {
        MySwal.showValidationMessage('Por favor, rellena todos los campos');
        return false;
      }
      if (!emailRegex.test(email)) {
        MySwal.showValidationMessage('Por favor, introduce un correo electrónico válido');
        return false;
      }
      if (guests < 1) {
        MySwal.showValidationMessage('El número de comensales debe ser al menos 1');
        return false;
      }

      if (guests > 12) {
        MySwal.showValidationMessage('Lo sentimos, no aceptamos reservas para más de 12 comensales, contacta con nosotros para más información');
        return false;
      }

      
      if (selectedDate < currentDate) {
        MySwal.showValidationMessage('No puedes reservar en una fecha pasada');
        return false;
      }

      return { name, email, phone, guests, dateTime, reservationNumber };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { name, email, phone, guests, dateTime, reservationNumber } = result.value;
      MySwal.fire({
        title: 'Reserva Confirmada',
        html: `Gracias ${name}, tu reserva para ${guests} comensales el ${dateTime} ha sido confirmada.<br><br>
               <strong>Número de reserva:</strong> ${reservationNumber}<br><br>
               Se enviará una confirmación a tu correo: ${email}`,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#DAA520'
      });
    }
  });
};

const Restaurant = () => {
  return (
    <div className="restaurant-container">
      <img src="https://res.cloudinary.com/dczjloaiy/image/upload/v1739180961/construction_16080058_1_iwgnb0.png" alt="Ebano Restaurant Logo" />
      <img className='restaurantTitle' src="https://res.cloudinary.com/dczjloaiy/image/upload/v1739180953/Titulo_Logo_ej81de.png" alt="Ebano Restaurant Title" />
      <div id="buttonsRestaurant">
        <ButtonRestaurant title="Reservar" action={handleReservationClick} />
        <ButtonRestaurant title="Modificar Reserva" action="" />
        <ButtonRestaurant title="Carta" action={handleMenuClick} />
      </div>
    </div>
  );
};

export default Restaurant;