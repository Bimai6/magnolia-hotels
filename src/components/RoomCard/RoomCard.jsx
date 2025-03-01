import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './RoomCard.css';

const MySwal = withReactContent(Swal);

const RoomCard = ({ id, title, description, stars, price, img, setRooms, entry, departure, reservationTime, reservationVisibility, priceVisibility, manageReservationButtonVisibility, reservationButtonVisibility, reservationManagement }) => {
  const handleReservation = async () => {
    try {
      // Obtener los datos de la habitación
      const response = await fetch(`http://localhost:3000/rooms/${id}`);
      const roomData = await response.json();

      //generacion de id unico
      const totalIds = roomData.reservations.length +1;
      

      // Crear una nueva reserva
      const newReservation = {
        entry: entry.format('YYYY-MM-DD'), // Formatear la fecha en formato 'YYYY-MM-DD'
        departure: departure.format('YYYY-MM-DD'), // Formatear la fecha en formato 'YYYY-MM-DD'
        reservationId: roomData.id + totalIds,
      };

      // Actualizar la habitación con la nueva reserva
      const updatedRoom = {
        ...roomData,
        reservations: [...roomData.reservations, newReservation]
      };

      // Enviar los datos actualizados al servidor
      await fetch(`http://localhost:3000/rooms/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRoom)
      });

      //----------------añadir cosas a usuario-----------------------
      const user = localStorage.getItem('user');
      const userId = JSON.parse(user).id;

      const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
      const userData = await userResponse.json();

      console.log(userData); //passed

      //crear un id de reserva para usuario igual que el de la reserva de habitacion

      const newReservationId = {
        reservationId: newReservation.reservationId
      }

      //actualizas user con la reserva nueva 

      const updatedUser = {
        ...userData,
        myReservations: [...userData.myReservations, newReservationId]
      }

      // Enviar los datos actualizados al servidor

      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser)
      });

      //-------------------------------------------------------------

      // Actualizar la lista de habitaciones en el componente principal
      setRooms(prevRooms => prevRooms.filter(room => room.id !== id));
      
      MySwal.close();
      MySwal.fire('¡Reservado!', 'Tu reserva ha sido guardada.', 'success').then(() => {
        location.reload();
      });
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      MySwal.fire('Error', 'Hubo un problema al hacer la reserva. Intenta de nuevo.', 'error');
    }
  };

  const handleReservationDesktop = () => {
    MySwal.fire({
      html: `
        <div class="main-content">
          <img alt="${title}" src="${img}" class="room-image" /> 
          <div class="sweetalert-info-container">
            <h3 class="title">${title}</h3>
            <div class="description-container">
              <p class="description">${description}</p>
              <h4 class="price">Total: <strong>${price} EUR</strong></h4>
            </div>
            <button id="customConfirmButton" class="custom-confirm-button">Reservar</button>
          </div>
        </div>
      `,
      showConfirmButton: false,
      customClass: {
        popup: 'custom-swal-popup',
        backdrop: 'custom-backdrop'
      },
      didOpen: () => {
        document.getElementById("customConfirmButton").addEventListener("click", handleReservation);
      }
    });
  };

  return (
    <Card style={{ fontFamily: 'Manrope, sans-serif' }} className='bg-white border-0'>
      <Card.Img variant="top" src={img} className='card-image p-3'alt="card image"/>
      <Card.Body className='d-flex flex-column'>
        <Card.Title style={{ fontSize: '23px', minHeight: '55px' }}>{title}</Card.Title>
        <div>
          {Array.from({ length: stars }, (_, i) => (
            <FaStar key={i} color="lightgray" size={20} style={{ marginRight: '5px', marginBottom: '10px' }} 
            data-testid="star-icon"/>
          ))}
        </div>
        <Card.Text style={{display: `${priceVisibility}`}}>
          Desde {price} EUR/noche
        </Card.Text>
        <Card.Text style={{display: `${reservationVisibility}`}}>
          {reservationTime}
        </Card.Text>
        <Button onClick={handleReservationDesktop} variant="dark" size='lg' className='w-100 rounded-0 fs-6 mx-auto' style={{ maxWidth: '355px', display: `${reservationButtonVisibility}` }}>
          Reservar
        </Button>
        <Button onClick={() => {
          if(reservationManagement) reservationManagement();
        }} variant="dark" size='lg' className='w-100 rounded-0 fs-6 mx-auto' style={{ maxWidth: '355px', display: `${manageReservationButtonVisibility}` }}>
          Reservar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RoomCard;

