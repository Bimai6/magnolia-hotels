import * as React from 'react';
import dayjs from 'dayjs';
import './SearchResult.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material'; 
import Button from 'react-bootstrap/Button';


const SearchResult = () => {

  const [entry, setEntry] = React.useState(dayjs());
  const [departure, setDeparture] = React.useState(dayjs().add(1, 'day'));

  return (
    <div className='search-container'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4   }}>
          {/* Fecha entrada */}
          <div>
            <p>Fecha de entrada</p>
            <DatePicker  
              minDate={dayjs()}
              value={entry}
              sx={{ width: 250, borderRadius: '5px', backgroundColor: '#ffffff' }} 
              onChange={(newValue) => {
                setEntry(newValue);
                if(newValue.isAfter(departure)){
                  setDeparture(newValue.add(1, 'day'));
                }
              }} 
            />
          </div>
          {/* Fecha salida */}
          <div>
          <p>Fecha de salida</p>
          <DatePicker 
            minDate={entry.add(1, 'day')}
            value={departure}
            sx={{ width: 250, borderRadius: '5px', backgroundColor: '#ffffff', marginRight: '30px' }}
            onChange={(newValue) => {
              setDeparture(newValue);
              if(newValue.isBefore(entry)){
                setDeparture(newValue.add(1, 'day'));
              }
            }} 
          />
          </div>
        </Box>
      </LocalizationProvider>
      <Button id='search-button' variant="dark" size='lg' className='rounded-5 fs-6 mx-auto' style={{width: '110px'}}>Reservar</Button>
    </div>  
  );
};
export default SearchResult;
