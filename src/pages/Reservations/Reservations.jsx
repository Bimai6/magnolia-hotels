import React, { useEffect, useState } from 'react';
import RoomCard from '../../components/RoomCard/RoomCard';
import SearchResult from '../../components/SearchResult/SearchResult';
import './Reservations.css';
//npx json-server --watch src/data/db.json --port 3000

const Reservations = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [entry, setEntry] = useState(null); // Fecha de entrada
  const [departure, setDeparture] = useState(null); // Fecha de salida

  useEffect(() => {
    fetch('http://localhost:3000/rooms')
      .then(response => response.json())
      .then(data => {
        const availableRooms = data.filter(room => room.reservations.length === 0);
        setRooms(availableRooms);
      })
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  return (
    <div className="container">
      <div className='search-result-container'>
        <SearchResult setFilteredRooms={setFilteredRooms} rooms={rooms} setEntry={setEntry} setDeparture={setDeparture} />
      </div>

      <div className="row justify-content-center">
        {filteredRooms.map((room) => (
          <div key={room.id} className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center g-2">
            <RoomCard {...room} setRooms={setRooms} entry={entry} departure={departure} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
