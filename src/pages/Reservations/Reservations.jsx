import React from 'react';
import RoomCard from '../../components/roomCard/RoomCard';
import SearchResult from '../../components/searchResult/SearchResult';
const rooms = [
  { title: 'Habitación Doble', stars: 3, price: 43,   },
  { title: 'Habitación Individual', stars: 4, price: 38,   },
  { title: 'Suite Deluxe', stars: 5, price: 99,   },
  { title: 'Habitación Familiar', stars: 4, price: 55,  },
  { title: 'Habitación Económica', stars: 3, price: 30,   },
  { title: 'Habitación Económica', stars: 3, price: 30,   },
  { title: 'Habitación Económica', stars: 3, price: 30,   },
  { title: 'Habitación Económica', stars: 3, price: 30,   },
  { title: 'Habitación Económica', stars: 3, price: 30,   },
  { title: 'Habitación Económica', stars: 3, price: 30,   },
];

//la variable room es un array de prueba para comprobar como se veria si extrayesemos los datos de una api o un json local

const Reservations = () => {
  return (
    <div className="container">
    <div className='search-result-container'>
      <SearchResult />
    </div>

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