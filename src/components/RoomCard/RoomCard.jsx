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
      <div class="main-content"">
        <img alt=${title} src=${img} class="room-image" /> 
        <div class="sweetalert-info-container">
          <h2 class="title">${title}</h2>
          <div class="description-container">
            <p class="description">${description}</p>
            <h4 class="price">Total: <strong>${price*1} EUR</strong></h4>
          </div>
        </div>
      </div>
      `,

      confirmButtonText: 'Reservar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#000000',
      cancelButtonColor: '#d33',
      customClass: {
        popup: 'custom-swal-popup',
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
        backdrop: 'custom-backdrop'
        
      },
      
    }).then((result) => {
      if(result.isConfirmed){
        MySwal.fire(
          '¡Reservado!',
          'Puedes gestionar la reserva en Mis reservas',
          /*aqui iria la logica de añadir en la bd la reserva del usuario correspondiente*/
        )
      }
    })
  }


  return (
      <Card style={{fontFamily: 'Manrope, sans-serif'  }} className='bg-white border-0' >
        <Card.Img variant="top" src={img} className='p-3'   />
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