import React from 'react';
import Header from '../../components/Header/Header';
import { Box, Grid, Typography, Container } from '@mui/material';
import { Button } from 'bootstrap';
import ButtonSearch from '../../components/buttonSearch/ButtonSearch';

const Home = () => {

  const benefits = [
    { label: 'Protocolo de experiencia cliente', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175372/isotipo_1_k7fbrd.png'},
    { label: 'Servicio de piscina y SPA', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175372/image_5_qwnp9q.png'},
    { label: 'Garantía de calidad', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175371/image_6_nsr9wa.png'},
    { label: 'Excelencia gastronómica', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175372/image_7_oglx3g.png'},
  ];

  return (
    <>
    
      <Header />
      <Container maxWidth="lg">

      <Grid container spacing={4} alignItems="center" sx={{ my: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight="bold">
            Tus vacaciones como nunca
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
          Lorem fistrum condemor me cago en tus muelas amatomaa te va a hasé pupitaa a gramenawer benemeoor. Hasta lu
          ego Lucas jarl ese que llega mamaar. Sexuarl a gramenawer te voy a borrar el cerito papaar papaar me cago en tus muelas. Tiene musho peligro.
          </Typography>
        </Grid>
        <Box sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: { xs: '100%', md: '50%' },
            height: '100%',
            zIndex: -1
              }}>
          <img 
            src="https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175372/fondo_hp9223.png" 
            alt="Hotel Magnolia"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      </Grid>

<Grid 
  container 
  spacing={4} 
  justifyContent="center" 
  sx={{ 
    my: 4, 
    minHeight: '150vh',
    '& .MuiGrid-item': { 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    } 
  }} 
>
  {benefits.map((benefit, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={benefit.icon} alt={benefit.label} width="150" />

        <Typography 
          variant="subtitle1" 
          sx={{ 
          position: 'relative', left: '10px',
          mt: 2, 
          textAlign: 'center',
          minHeight: '4em', 
          display: 'flex',
          align: 'center'
              }}>
          {benefit.label}
        </Typography>
        
      </Box>
    </Grid>
  ))}
</Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.123456789!2d-5.984459!3d37.389092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126f6e5a2a3b4f%3A0xabcdef1234567890!2sCalle%20Pedro%20del%20Toro%2018%2C%20Sevilla%2C%20España!5e0!3m2!1ses!2ses!4v1610000000000!5m2!1ses!2ses" 
            width="100%" 
            height="300" 
            style={{ border: 0, borderRadius: '10px'}}
            allowFullScreen 
            loading= "lazy"
          />
        </Grid>
      </Grid>
    </Container>
    <ButtonSearch />
    </>
  )
}

export default Home;