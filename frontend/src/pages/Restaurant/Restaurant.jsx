import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Restaurant.css';
import ButtonRestaurant from '../../components/ButtonRestaurant/ButtonRestaurant';
import emailjs from '@emailjs/browser';
import Header from '../../components/Header/Header';
emailjs.init('h0PZABPnZmb6RndN-');


const MySwal = withReactContent(Swal);

const getReservations = async () => {
  try {
    const response = await fetch('http://localhost:3000/restaurantReservations');
    const reservations = await response.json();
    return reservations;
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    return [];
  }
};

const saveReservation = async (reservation) => {
  try {
    const response = await fetch('http://localhost:3000/restaurantReservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    });
    const newReservation = await response.json();
    return newReservation;
  } catch (error) {
    console.error("Error al guardar la reserva:", error);
  }
};


const updateReservation = async (reservationNumber, updatedReservation) => {
  try {
    const reservations = await getReservations();

    const reservation = reservations.find(res => res.reservationNumber === reservationNumber);

    if (!reservation) {
      throw new Error(`No se encontró la reserva con el número ${reservationNumber}`);
    }

    const response = await fetch(`http://localhost:3000/restaurantReservations/${reservation.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updatedReservation, id: reservation.id }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const updated = await response.json();
    console.log("Reserva actualizada:", updated);
    return updated;
  } catch (error) {
    console.error("Error al actualizar la reserva:", error);
  }
};

const deleteReservation = async (reservationNumber) => {
  try {
    const reservations = await getReservations();
    const reservation = reservations.find(res => res.reservationNumber === reservationNumber);

    if (!reservation) {
      throw new Error(`No se encontró la reserva con el número ${reservationNumber}`);
    }

    await fetch(`http://localhost:3000/restaurantReservations/${reservation.id}`, {
      method: 'DELETE',
    });

    console.log(`Reserva ${reservationNumber} eliminada correctamente.`);
  } catch (error) {
    console.error("Error al eliminar la reserva:", error);
  }
};


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
    showCloseButton: false,
    heightAuto: false,
    width: "80vw",
    maxWidth: "80vw",
    background: "transparent",
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
      
      const phoneRegex = /^\+?[0-9]{8,15}$/;
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

      if (!phoneRegex.test(phone)) {
        MySwal.showValidationMessage('Por favor, ingresa un número de teléfono válido');
        return false;
      }

      return { name, email, phone, guests, dateTime, reservationNumber };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { name, email, phone, guests, dateTime, reservationNumber } = result.value;
      const reservation = { name, email, phone, guests, dateTime, reservationNumber };
      saveReservation(reservation);

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

const handleModifyReservationClick = async () => {
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
      const reservationId = parseInt(document.getElementById('reservationId').value.trim(), 10);
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
  }).then(async (result) => {
    if (result.isConfirmed) {
      const { email, reservationId } = result.value;
      const reservations = await getReservations();
      const reservation = reservations.find(res => res.reservationNumber === reservationId && res.email === email);

      if (reservation) {
        MySwal.fire({
          title: "Modificar Reserva",
          html: `
            <div class="swal-reserva-container">
              <div class="swal-reserva-row">
                <label for="name">Nombre</label>
                <input type="text" id="name" class="swal-reserva-input" value="${reservation.name}" required>
              </div>
              <div class="swal-reserva-row">
                <label for="phone">Teléfono de contacto</label>
                <input type="tel" id="phone" class="swal-reserva-input" value="${reservation.phone}" required>
              </div>
              <div class="swal-reserva-row">
                <label for="guests">Comensales</label>
                <input type="number" id="guests" class="swal-reserva-input" value="${reservation.guests}" min="1" required>
              </div>
              <div class="swal-reserva-row">
                <label for="dateTime">Fecha y hora</label>
                <input type="datetime-local" id="dateTime" class="swal-reserva-input" value="${reservation.dateTime}" required>
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
        }).then(async (modResult) => {
          if (modResult.isConfirmed) {
            const { name, phone, guests, dateTime, reservationId } = modResult.value;
            const updatedReservation = { 
              name, 
              email: reservation.email, 
              phone, 
              guests, 
              dateTime, 
              reservationNumber: reservationId 
            };
            const success = await updateReservation(reservationId, updatedReservation);
            if (success) {
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
            }
          } else if (modResult.isDenied) {
            await deleteReservation(reservationId);
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
      <Header/>
      <div className="restaurant-content">
        <img src="https://res.cloudinary.com/dczjloaiy/image/upload/v1739180961/construction_16080058_1_iwgnb0.png" alt="Ebano Restaurant Logo" />
        <img className='restaurantTitle' src="https://res.cloudinary.com/dczjloaiy/image/upload/v1739180953/Titulo_Logo_ej81de.png" alt="Ebano Restaurant Title" />
      </div>
      <div id="buttonsRestaurant">
        <ButtonRestaurant title="Reservar" action={handleReservationClick} />
        <ButtonRestaurant title="Modificar Reserva" action={handleModifyReservationClick} />
        <ButtonRestaurant title="Carta" action={handleMenuClick} />
      </div>
      
    </div>
  );
};

export default Restaurant;