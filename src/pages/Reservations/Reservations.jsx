import React, { useEffect, useState } from "react";
import RoomCard from "../../components/RoomCard/RoomCard";
import SearchResult from "../../components/SearchResult/SearchResult";
import "./Reservations.css";
import Header from "../../components/Header/Header";


const Reservations = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [entry, setEntry] = useState(null); 
  const [departure, setDeparture] = useState(null); 
  const [noRoomsAvailable, setNoRoomsAvailable] = useState(false);
  const [isSingleRoom, setIsSingleRoom] = useState(false); 

  useEffect(() => {
    fetch("http://localhost:3000/rooms")
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  },);

  useEffect(() => {
    setIsSingleRoom(filteredRooms.length === 1); 
  }, [filteredRooms]);

  const searchAnimation = () => {
    const searcherContainer = document.getElementsByClassName(
      "search-result-container"
    );
    searcherContainer[0].style.marginTop = "0px";
    searcherContainer[0].style.transition = "margin-top 0.5s";
  };

  const loadingAnimation = () => {
    const loadingGif = document.createElement("img");
    loadingGif.src =
      "https://res.cloudinary.com/dzecw7i0a/image/upload/v1740777897/89_aysk0b.gif";
    loadingGif.className = "loader";
    loadingGif.style.opacity = "1";

    const searcherContainer =
      document.getElementsByClassName("search-result-container");

    setTimeout(() => {
      searcherContainer[0].appendChild(loadingGif);
    }, 200);

    const roomsView = document.getElementsByClassName("rooms-view");
    roomsView[0].style.opacity = "0";

    setTimeout(() => {
      loadingGif.style.opacity = "0";
      loadingGif.style.transition = "opacity 0.3s";

      setTimeout(() => {
        roomsView[0].style.opacity = "1";
      }, 300);
    }, 1500);
  };

  return (
    <div className="container" style={{ display: "flex", alignItems: isSingleRoom ? "normal" : "center" }}>
      <Header />
      <div className="search-result-container">
        <SearchResult
          loadingAnimation={loadingAnimation}
          onExtraClick={searchAnimation}
          setFilteredRooms={(newFilteredRooms) => {
            setFilteredRooms(newFilteredRooms);
            setNoRoomsAvailable(newFilteredRooms.length === 0); 
          }}
          rooms={rooms}
          setEntry={setEntry}
          setDeparture={setDeparture}
        />
      </div>

      <div className="rooms-view row justify-content-center">
        {noRoomsAvailable && (
          <h1 className="no-result text-center">
            No hay habitaciones disponibles para las fechas seleccionadas
          </h1>
        )}

        {filteredRooms.map((room, index) => {
          const colClass = filteredRooms.length <= 3 ? "" : "col-lg-3";

          return (
            <div
              key={room.id}
              className={`col-12 col-sm-6 ${colClass} d-flex justify-content-center`}
              style={{marginBottom: "60px"}} 
            >
              <RoomCard
                {...room}
                setRooms={setRooms}
                entry={entry}
                departure={departure}
                reservationVisibility={'none'}
                manageReservationButtonVisibility={'none'}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reservations;
