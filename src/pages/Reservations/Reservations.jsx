import React from 'react';
import RoomCard from '../../components/RoomCard/RoomCard';

const rooms = [
  { title: 'Habitación Doble',description:"Disfruta de la combinación perfecta entre elegancia y confort en nuestra Suite Junior, un espacio diseñado para brindar una estancia exclusiva y relajante.", stars: 3, price: 43, img: 'https://res.cloudinary.com/dc732dg4w/image/upload/v1739780013/habitacion-superior_hdbplp.jpg'},
  { title: 'Habitación Individual', stars: 4, price: 38, img: 'https://res.cloudinary.com/dc732dg4w/image/upload/v1739780013/habitacion-superior_hdbplp.jpg'  },
  { title: 'Suite Deluxe', stars: 5, price: 99, img: 'https://res.cloudinary.com/dc732dg4w/image/upload/v1739780013/habitacion-superior_hdbplp.jpg'  },
  { title: 'Habitación Superior', stars: 4, price: 55, img: 'https://res.cloudinary.com/dc732dg4w/image/upload/v1739780013/habitacion-superior_hdbplp.jpg' },
  { title: 'Habitación Económica', stars: 3, price: 30, img: 'https://res.cloudinary.com/dc732dg4w/image/upload/v1739780013/habitacion-superior_hdbplp.jpg'  },
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