import * as React from 'react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './SearchResult.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material'; 
import Button from 'react-bootstrap/Button';

const SearchResult = ({ setFilteredRooms, rooms, setEntry, setDeparture, onExtraClick, loadingAnimation }) => {
  const [entryLocal, setEntryLocal] = React.useState(dayjs());
  const [departureLocal, setDepartureLocal] = React.useState(dayjs().add(1, 'day'));

  

  const handleSearch = () => {

    

    if (!rooms || !Array.isArray(rooms)) {
      console.error("Los datos no están disponibles o no son un array.");
      return;
    }

    // Filtrar habitaciones según el rango de fechas
    //-----------------------------------------------------------
    const filteredData = rooms.filter(room => {
      
      return !room.reservations.some(reservation => {
        const reservationStart = dayjs(reservation.entry).add(1, 'day');
        const reservationEnd = dayjs(reservation.departure);
        
        return (reservationStart.isBefore(departureLocal) && reservationEnd.isAfter(entryLocal));
      });
    });
    //----------------------------------------------------------
    setFilteredRooms(filteredData);
    setEntry(entryLocal);  // Pasar fecha de entrada
    setDeparture(departureLocal);  // Pasar fecha de salida
  };

  return (
    <div className='search-container'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Fecha entrada */}
          <div className='enter'>
            <p>Fecha de entrada</p>
            <DatePicker  
              minDate={dayjs()}
              value={entryLocal}
              onChange={(newValue) => {
                setEntryLocal(newValue);
                if (newValue.isAfter(departureLocal)) {
                  setDepartureLocal(newValue.add(1, 'day'));
                }
              }} 
            />
          </div>
          {/* Fecha salida */}
          <div className='exit'>
            <p>Fecha de salida</p>
            <DatePicker 
              minDate={entryLocal.add(1, 'day')}
              value={departureLocal}
              onChange={(newValue) => {
                setDepartureLocal(newValue);
                if (newValue.isBefore(entryLocal)) {
                  setDepartureLocal(newValue.add(1, 'day'));
                }
              }} 
            />
          </div>
        </Box>
      </LocalizationProvider>
      <Button onClick={() => {
        setTimeout(() => {
          if(loadingAnimation) loadingAnimation();
          handleSearch();

        }, 500) 
        if(onExtraClick) onExtraClick();}} variant="dark" size='lg' className='search-button rounded-5 fs-6 mx-auto' style={{ width: '110px' }}>Buscar</Button>
    </div>  
  );
};

export default SearchResult;
