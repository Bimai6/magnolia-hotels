import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from "react-icons/fa";

const RoomCard = ({title, stars, price, img }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card style={{fontFamily: 'Manrope, sans-serif'  }} className='bg-white border-0' >
        <Card.Img variant="top" src={img} className='p-3'   />
        <Card.Body className=''>
          <Card.Title style={{fontSize: '23px'}}>{title}</Card.Title>
          <div>
            {Array.from({ length: stars }, (_ , i) => (
              <FaStar key={i} color="lightgray" size={20} style={{marginRight: '5px', marginBottom: '10px'}}/>
            ))}
          </div>
          <Card.Text>
            Desde <strong>{price} EUR</strong>/noche
          </Card.Text>
          <Button variant="dark" size='lg' className='w-100 rounded-0 fs-6 mx-auto ' style={{ maxWidth: '355px'}} >Reservar</Button>
        </Card.Body>
      </Card>
    </div>
      
  )
}

export default RoomCard