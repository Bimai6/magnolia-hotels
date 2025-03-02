import React, { useEffect, useState } from 'react';
import RoomCard from '../../components/RoomCard/RoomCard';
import './MyReservations.css';
import Header from '../../components/Header/Header';

const MyReservations = () => {
  const [userReservations, setUserReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Obtener datos del usuario
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        if (!user?.myReservations) return;

        // Obtener todas las habitaciones
        const roomsResponse = await fetch('http://localhost:3000/rooms');
        const rooms = await roomsResponse.json();

        // Filtrar reservas del usuario
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
 
        console.log(localStorage.getItem('user'));
  return (
    <div className="main-container">
      <Header />
      <h1 className="reservation-title text-center mt-4">Mis reservas</h1>
      <div className="rooms-view row justify-content-center">
        {userReservations.map((reservation) => {
          const colClass = userReservations.length <= 3 ? 'col-lg-4' : 'col-lg-3';
          
          return (
            <div key={reservation.reservationId} 
                 className={`col-12 col-sm-6 ${colClass} d-flex justify-content-center`}>
              <RoomCard
                title={reservation.title}
                stars={reservation.stars}
                img={reservation.img}
                reservationTime={`${reservation.entry} a ${reservation.departure}`}
                priceVisibility="none"
                reservationButtonVisibility="none"
                reservationVisibility="block"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyReservations;