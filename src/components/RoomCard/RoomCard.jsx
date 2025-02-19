import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './RoomCard.css';

const MySwal = withReactContent(Swal);

const RoomCard = ({title, description, stars, price, img }) => {

  

  const handleReservationDesktop = () => {
    MySwal.fire({
      html: `
      <div class="main-content">
        <img alt="${title}" src="${img}" class="room-image" /> 
        <div class="sweetalert-info-container">
          <h3 class="title">${title}</h3>
          <div class="description-container">
            <p class="description">${description}</p>
            <h4 class="price">Total: <strong>${price * 1} EUR</strong></h4>
          </div>
          <!-- Botón personalizado dentro del modal -->
          <button id="customConfirmButton" class="custom-confirm-button">Reservar</button>
        </div>
      </div>
      `,
      
      showConfirmButton: false, // Oculta el botón predeterminado
      customClass: {
        popup: 'custom-swal-popup',
        backdrop: 'custom-backdrop'
      },
      
      didOpen: () => {
        // Agregamos evento al botón personalizado cuando se abra la alerta
        document.getElementById("customConfirmButton").addEventListener("click", () => {
          MySwal.close(); // Cierra el SweetAlert
          MySwal.fire(
            '¡Reservado!',
            'Puedes gestionar la reserva en Mis reservas',
          );
        });
      }
    });
};



  return (
      <Card style={{fontFamily: 'Manrope, sans-serif'  }} className='bg-white border-0' >
        <Card.Img variant="top" src={img} className='card-image p-3'   />
        <Card.Body className='d-flex flex-column'>
          <Card.Title style={{fontSize: '23px',  minHeight: '55px'}}>{title}</Card.Title>
          <div>
            {Array.from({ length: stars }, (_ , i) => (
              <FaStar key={i} color="lightgray" size={20} style={{marginRight: '5px', marginBottom: '10px'}}/>
            ))}
          </div>
          <Card.Text>
            Desde <strong>{price} EUR</strong>/noche
          </Card.Text>
          <Button onClick={handleReservationDesktop} variant="dark" size='lg' className='w-100 rounded-0 fs-6 mx-auto ' style={{ maxWidth: '355px'}} >Reservar</Button>
        </Card.Body>
      </Card>
  )
}

export default RoomCard;