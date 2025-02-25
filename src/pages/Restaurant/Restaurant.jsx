import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Restaurant.css';
import ButtonRestaurant from '../../components/ButtonRestaurant/ButtonRestaurant';
import emailjs from '@emailjs/browser';

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
        "https://res.cloudinary.com/dczjloaiy/image/upload/v1740044125/Carta_Menu_2_dmx6om.png",
        "https://res.cloudinary.com/dczjloaiy/image/upload/v1740044121/Carta_Cocktails_2_hxyhcj.png"
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

    const image = document.querySelector('.swal-menu-image');
    image.addEventListener('click', () => {
      image.classList.toggle('zoomed');
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
    color: '#fff',
    showConfirmButton: false,
    showCloseButton: true,
    heightAuto: false,
    width: "80vw",
    maxWidth: "80vw",
    background: 'rgba(79, 78, 78, 0.66)',
    customClass: {
      popup: 'custom-swal-popup',
    },
    didOpen: () => {
    
      const image = document.querySelector('.swal-menu-image');
      image.addEventListener('click', () => {
        image.classList.toggle('zoomed');
      });

      
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
  const isMobile = window.innerWidth <= 768;
  const titleText = isMobile
    ? "Reserva tu mesa"
    : "Estás a un simple paso de vivir una experiencia inolvidable.";
  MySwal.fire({
    title: titleText,
    html: `
     <div class="swal-reserva-container">
        <div class="swal-reserva-row">
          <label for="name">Nombre</label>
          <input type="text" id="name" class="swal-reserva-input" required>
        </div>

        <div class="swal-reserva-row">
          <label for="email">Correo electrónico</label>
          <input type="email" id="email" class="swal-reserva-input" required>
        </div>

        <div class="swal-reserva-row">
          <label for="phone">Teléfono de contacto</label>
          <input type="tel" id="phone" class="swal-reserva-input" required>
        </div>

        <div class="swal-reserva-row">
          <label for="guests">Comensales</label>
          <input type="number" id="guests" class="swal-reserva-input" min="1" required>
        </div>

        <div class="swal-reserva-row">
          <label for="dateTime">Fecha y hora</label>
          <input type="datetime-local" id="dateTime" class="swal-reserva-input" required>
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
        html: `Gracias ${name}, tu reserva para ${guests} comensales el ${formatDateTime(dateTime)} ha sido confirmada.<br><br>
               <strong>Número de reserva:</strong> ${reservationNumber}<br><br>
               Se enviará una confirmación a tu correo: ${email}`,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#DAA520',
        color: '#fff',
        background: 'rgba(79, 78, 78, 0.66)',
      });

      emailjs.send(
        'service_qgjhvea',
        'template_8c7fits',
        {
          name: name,
          email: email,
          phone: phone,
          guests: guests,
          dateTime: formatDateTime(dateTime),
          reservationNumber: reservationNumber
        },
        'h0PZABPnZmb6RndN-'
      )
      .then((response) => {
        console.log('Correo enviado con éxito:', response);
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
      });
      
    }
  });
};

const handleModifyReservationClick = () => {
  MySwal.fire({
    title: "Modificar Reserva",
    html: `
      <div class="swal-reserva-container">
        <div class="swal-reserva-row">
          <label for="email">Correo electrónico</label>
          <input type="email" id="email" class="swal-reserva-input" required>
        </div>
        <div class="swal-reserva-row">
          <label for="reservationId">Número de reserva</label>
          <input type="number" id="reservationId" class="swal-reserva-input" required>
        </div>
      </div>
    `,
    showConfirmButton: true,
    confirmButtonText: 'Continuar',
    confirmButtonColor: '#DAA520',
    showCancelButton: true,
    cancelButtonText: 'Volver',
    cancelButtonColor: '#DAA520',
    color: '#fff',
    background: 'rgba(79, 78, 78, 0.66)',
    preConfirm: () => {
      const email = document.getElementById('email').value.trim();
      const reservationId = document.getElementById('reservationId').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !reservationId) {
        MySwal.showValidationMessage('Por favor, introduce ambos campos');
        return false;
      }
      if (!emailRegex.test(email)) {
        MySwal.showValidationMessage('Por favor, introduce un correo válido');
        return false;
      }

      return { email, reservationId };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { email, reservationId } = result.value;
      //dejo anotado que por aqui hay que hacer la validacion con el json.
      const reservationExists = true;
      if (reservationExists) {
        MySwal.fire({
          title: "Modificar Reserva",
          html: `
            <div class="swal-reserva-container">
              <div class="swal-reserva-row">
                <label for="name">Nombre</label>
                <input type="text" id="name" class="swal-reserva-input" required>
              </div>
              <div class="swal-reserva-row">
                <label for="phone">Teléfono de contacto</label>
                <input type="tel" id="phone" class="swal-reserva-input" required>
              </div>
              <div class="swal-reserva-row">
                <label for="guests">Comensales</label>
                <input type="number" id="guests" class="swal-reserva-input" min="1" required>
              </div>
              <div class="swal-reserva-row">
                <label for="dateTime">Fecha y hora</label>
                <input type="datetime-local" id="dateTime" class="swal-reserva-input" required>
              </div>
            </div>
          `,
          showConfirmButton: true,
          confirmButtonText: 'Guardar Cambios',
          confirmButtonColor: '#DAA520',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#DAA520',
          showDenyButton: true,
          denyButtonText: 'Anular Reserva',
          denyButtonColor: '#FF0000',
          color: '#fff',
          background: 'rgba(79, 78, 78, 0.66)',
          preConfirm: () => {
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const guests = parseInt(document.getElementById('guests').value, 10);
            const dateTime = document.getElementById('dateTime').value;
            const selectedDate = new Date(dateTime);
            const currentDate = new Date();

            if (!name || !phone || !guests || !dateTime) {
              MySwal.showValidationMessage('Por favor, rellena todos los campos');
              return false;
            }
            if (guests < 1 || guests > 12) {
              MySwal.showValidationMessage('Número de comensales entre 1 y 12');
              return false;
            }
            if (selectedDate < currentDate) {
              MySwal.showValidationMessage('No puedes reservar en una fecha pasada');
              return false;
            }
            
            return { name, phone, guests, dateTime, reservationId };
          }
        }).then((modResult) => {
          if (modResult.isConfirmed) {
            const { name, phone, guests, dateTime, reservationId } = modResult.value;
            MySwal.fire({
              title: 'Reserva Modificada',
              html: `Tu reserva <strong>${reservationId}</strong> ha sido actualizada.<br>
                     <strong>Nombre:</strong> ${name}<br>
                     <strong>Teléfono:</strong> ${phone}<br>
                     <strong>Comensales:</strong> ${guests}<br>
                     <strong>Fecha y hora:</strong> ${formatDateTime(dateTime)}`,
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#DAA520',
              color: '#fff',
              background: 'rgba(79, 78, 78, 0.66)',
            });
          } else if (modResult.isDenied) {
            MySwal.fire({
              title: 'Reserva Anulada',
              text: `Tu reserva: ${reservationId}, ha sido anulada.`,
              icon: 'info',
              background: 'rgba(79, 78, 78, 0.66)',
              color: '#fff',
              confirmButtonText: 'OK',
              confirmButtonColor: '#DAA520'
            });
          }
        });
      } else {
        MySwal.fire({
          title: 'Error',
          text: 'No se encontró la reserva con los datos proporcionados.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#DAA520',
          background: 'rgba(79, 78, 78, 0.66)',
          color: '#fff',
        });
      }
    }
  });
};

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const Restaurant = () => {
  return (
    <div className="restaurant-container">
      <img src="https://res.cloudinary.com/dczjloaiy/image/upload/v1739180961/construction_16080058_1_iwgnb0.png" alt="Ebano Restaurant Logo" />
      <img className='restaurantTitle' src="https://res.cloudinary.com/dczjloaiy/image/upload/v1739180953/Titulo_Logo_ej81de.png" alt="Ebano Restaurant Title" />
      <div id="buttonsRestaurant">
        <ButtonRestaurant title="Reservar" action={handleReservationClick} />
        <ButtonRestaurant title="Modificar Reserva" action={handleModifyReservationClick} />
        <ButtonRestaurant title="Carta" action={handleMenuClick} />
      </div>
    </div>
  );
};

export default Restaurant;