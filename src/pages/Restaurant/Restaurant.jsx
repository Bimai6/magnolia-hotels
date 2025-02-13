import React from 'react';
import './Restaurant.css';
import ButtonRestaurant from '../../components/ButtonRestaurant/ButtonRestaurant';

const Restaurant = () => {
  return (
    <div className="restaurant-container">
      <img src="https://res.cloudinary.com/dczjloaiy/image/upload/v1739180961/construction_16080058_1_iwgnb0.png" alt="Ebano Restaurant Logo" />
      <img src="https://res.cloudinary.com/dczjloaiy/image/upload/v1739180953/Titulo_Logo_ej81de.png" alt="Ebano Restaurant Title" />
      <div id="buttonsRestaurant">
        <ButtonRestaurant title="Reservar" action="" />
        <ButtonRestaurant title="Modificar Reserva" action="" />
        <ButtonRestaurant title="Carta" action="" />
      </div>
    </div>
  );
};

export default Restaurant;
