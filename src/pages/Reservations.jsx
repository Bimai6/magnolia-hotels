import React from 'react';
import RoomCard from '../components/roomCard/RoomCard';
import doubleRoom from '../double-room.png';

const rooms = [
  { title: 'Habitación Doble', stars: 3, price: 43, img: doubleRoom },
  { title: 'Habitación Individual', stars: 4, price: 38, img: doubleRoom },
  { title: 'Suite Deluxe', stars: 5, price: 99, img: doubleRoom },
  { title: 'Habitación Familiar', stars: 4, price: 55, img: doubleRoom },
  { title: 'Habitación Económica', stars: 3, price: 30, img: doubleRoom },
  { title: 'Habitación Económica', stars: 3, price: 30, img: doubleRoom },
  { title: 'Habitación Económica', stars: 3, price: 30, img: doubleRoom },
  { title: 'Habitación Económica', stars: 3, price: 30, img: doubleRoom },
  { title: 'Habitación Económica', stars: 3, price: 30, img: doubleRoom },
  { title: 'Habitación Económica', stars: 3, price: 30, img: doubleRoom },
];

//la variable room es un array de prueba para comprobar como se veria si extrayesemos los datos de una api o un json local

const Reservations = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        {rooms.map((room, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
            <RoomCard {...room} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;