import * as React from 'react';
import dayjs from 'dayjs';
import './SearchResult.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material'; // Asegúrate de importar Box
import { Height } from '@mui/icons-material';

const SearchResult = () => {

  const [entry, setEntry] = React.useState(dayjs());
  const [departure, setDeparture] = React.useState(dayjs().add(1, 'day'));

  return (
    <div className='container'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          {/* Fecha entrada */}
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
          
          {/* Fecha salida */}
          <DatePicker 
            minDate={entry.add(1, 'day')}
            value={departure}
            sx={{ width: 250, borderRadius: '5px', backgroundColor: '#ffffff'}}
            onChange={(newValue) => {
              setDeparture(newValue);
              if(newValue.isBefore(entry)){
                setDeparture(newValue.add(1, 'day'));
              }
            }} 
          />
        </Box>
      </LocalizationProvider>
    </div>
  );
}

export default SearchResult;
