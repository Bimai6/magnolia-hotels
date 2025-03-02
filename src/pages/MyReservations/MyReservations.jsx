import React, { useEffect, useState } from 'react';
import RoomCard from '../../components/RoomCard/RoomCard';
import SearchResult from '../../components/SearchResult/SearchResult';
import './MyReservations.css';
import Header from '../../components/Header/Header';
//npx json-server --watch src/data/db.json --port 3000

const MyReservations = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [entry, setEntry] = useState(null); // Fecha de entrada
  const [departure, setDeparture] = useState(null); // Fecha de salida

  useEffect(() => {
    fetch('http://localhost:3000/rooms')
      .then(response => response.json())
      .then(data => {
        
        setRooms(data);
      })
      .catch(error => console.error('Error fetching rooms:', error));
  });

  

  

  return (
    <div className="container">
      <Header />
      <div className="rooms-view row justify-content-center">
  {filteredRooms.map((room) => {
    
    const colClass = filteredRooms.length <= 3 ? 'col-lg-4' : 'col-lg-3';

    return (
      <div key={room.id} className={`col-12 col-sm-6 ${colClass} d-flex justify-content-center`}>
        <RoomCard {...room} setRooms={setRooms} entry={entry} departure={departure} reservationVisibility={'none'} manageReservationButtonVisibility={'none'}/>
      </div>
    );
  })}
</div>
    </div>
  );
};

export default MyReservations;
