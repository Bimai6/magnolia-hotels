import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Restaurant.css';
import ButtonRestaurant from '../../components/ButtonRestaurant/ButtonRestaurant';

const MySwal = withReactContent(Swal);

const handleCartaClick = () => {
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

const Restaurant = () => {
  return (
    <div className="restaurant-container">
      <img src="https://res.cloudinary.com/dczjloaiy/image/upload/v1739180961/construction_16080058_1_iwgnb0.png" alt="Ebano Restaurant Logo" />
      <img className='restaurantTitle' src="https://res.cloudinary.com/dczjloaiy/image/upload/v1739180953/Titulo_Logo_ej81de.png" alt="Ebano Restaurant Title" />
      <div id="buttonsRestaurant">
        <ButtonRestaurant title="Reservar" action="" />
        <ButtonRestaurant title="Modificar Reserva" action="" />
        <ButtonRestaurant title="Carta" action={handleCartaClick} />
      </div>
    </div>
  );
};

export default Restaurant;
