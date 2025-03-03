import React, { useEffect, useState } from 'react';
import RoomCard from '../../components/RoomCard/RoomCard';
import './MyReservations.css';
import Header from '../../components/Header/Header';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_API_URL;
const MySwal = Swal.mixin();

const MyReservations = () => {
  const [userReservations, setUserReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.myReservations) return;

        const roomsResponse = await fetch(`${API_URL}/rooms`);
        const rooms = await roomsResponse.json();

        const reservationIds = user.myReservations.map(r => r.reservationId);
        const reservationsData = rooms.flatMap(room => 
          room.reservations
            .filter(res => reservationIds.includes(res.reservationId))
            .map(res => ({
              ...room,
              entry: res.entry,
              departure: res.departure,
              reservationId: res.reservationId
            }))
        );

        setUserReservations(reservationsData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchReservations();
  }, []);

  const handleDeleteReservation = async (reservationId) => {
    const result = await MySwal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
      // Eliminar de rooms
      const roomsResponse = await fetch(`${API_URL}/rooms`);
      const rooms = await roomsResponse.json();
      
      const roomWithReservation = rooms.find(room => 
        room.reservations.some(res => res.reservationId === reservationId)
      );
      
      if (!roomWithReservation) throw new Error('Habitación no encontrada');
      
      const updatedRoomReservations = roomWithReservation.reservations.filter(
        res => res.reservationId !== reservationId
      );
      
      await fetch(`${API_URL}/rooms/${roomWithReservation.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...roomWithReservation,
          reservations: updatedRoomReservations
        })
      });

      // Eliminar de usuarios
      const user = JSON.parse(localStorage.getItem('user'));
      const updatedUserReservations = user.myReservations.filter(
        res => res.reservationId !== reservationId
      );
      
      await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...user,
          myReservations: updatedUserReservations
        })
      });

      // Actualizar almacenamiento local
      localStorage.setItem('user', JSON.stringify({
        ...user,
        myReservations: updatedUserReservations
      }));

      // Actualizar estado
      setUserReservations(prev => 
        prev.filter(res => res.reservationId !== reservationId)
      );

      MySwal.fire('¡Eliminado!', 'La reserva fue eliminada.', 'success');
    } catch (error) {
      console.error('Error eliminando reserva:', error);
      MySwal.fire('Error', 'No se pudo eliminar la reserva', 'error');
    }
  };
  console.log(localStorage.getItem('user'));
  return (
    <div className="main-container">
      <div className='header-container'>
        <Header />
      </div>
      
      <h1 className="reservation-title text-center mt-4">Mis reservas</h1>
      <div className="rooms-view row justify-content-center">
        {userReservations.map((reservation) => (
          <div key={reservation.reservationId} 
               className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
            <RoomCard
              title={reservation.title}
              stars={reservation.stars}
              img={reservation.img}
              reservationTime={`${reservation.entry} a ${reservation.departure}`}
              priceVisibility="none"
              reservationButtonVisibility="none"
              reservationVisibility="block"
              manageReservationButtonVisibility="block"
              handleDeleteReservation={() => handleDeleteReservation(reservation.reservationId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReservations;