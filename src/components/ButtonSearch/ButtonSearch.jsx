import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './ButtonSearch.css';
import {Button} from '@mui/material';
import {Link} from 'react-router-dom';

const ButtonSearch = () => {
  return (
    <Button className='d-flex position-fixed shadow-none text-white btn-custom' component={Link}
    to={"/my-reservations"} variant="contained" startIcon={
      <img
        src="https://res.cloudinary.com/demqnwfff/image/upload/v1739175805/bed_1_ahw0kw.svg"
        alt="bed icon"
      />
    }>
    RESERVAR
    </Button>
  )
}

export default ButtonSearch;