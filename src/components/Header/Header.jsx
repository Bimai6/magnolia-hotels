import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, BottomNavigation, BottomNavigationAction, useMediaQuery, Button, Grid, Typography, Container } from '@mui/material';

const navItems = [
  { label: 'Inicio', value: 'home', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/isotype_idmria.svg', link: '/', width: 40, height: 40 },
  { label: 'Estancia', value: 'book', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/bed_2_kda2wz.svg', link: '/my-reservations', width: 34, height: 34, ml: 'auto' },
  { label: 'Restaurante', value: 'restaurant', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/restaurant_d16z1c.svg', link: '/restaurant', width: 28, height: 28, ml: 2 },
  { label: 'Contacto', value: 'contact', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/contact_incmt5.svg', width: 28, height: 28, ml: 2 },
  { label: 'Perfil', value: 'profile', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/profile_d9xatr.svg', link: '/profile', width: 28, height: 28, ml: 2 },
];

const benefits = [
  { label: 'Protocolo de experiencia cliente', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175372/isotipo_1_k7fbrd.png'},
  { label: 'Servicio de piscina y SPA', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175372/image_5_qwnp9q.png'},
  { label: 'Garantía de calidad', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175371/image_6_nsr9wa.png'},
  { label: 'Excelencia gastronómica', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175372/image_7_oglx3g.png'},
];

const MobileHeader = () => {
  const [value, setValue] = React.useState('home');

  return (
    <BottomNavigation
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: 'white',
        boxShadow: '0px -2px 5px rgba(0,0,0,0.1)'
      }}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
    >
      {navItems.map((item) => (
        <BottomNavigationAction
          key={item.value}
          component={Link}
          to={item.link || '#'}
          value={item.value}
          icon={<img src={item.icon} alt={item.label} width={item.width} height={item.height} />}
        />
      ))}
    </BottomNavigation>
  );
};

const DesktopHeader = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
      <Toolbar>
        <IconButton component={Link} to="/" size="large" edge="start" aria-label="logo" disableRipple>
          <img 
            src="https://res.cloudinary.com/dk1g12n2h/image/upload/v1739173714/IMG-20250202-WA0012_1_eic08v.png" 
            alt="Logo"
            style={{ objectFit: 'contain', width: '200px' }} 
          />
        </IconButton>
        {navItems.slice(1).map((item) => (
          <Button 
            key={item.value} 
            component={Link} 
            to={item.link} 
            sx={{ color: 'black', textTransform: 'none', fontSize: '16px', ml: item.ml, position: 'relative',
              '&::after': {
                content: '""',
                display: 'block',
                width: 0,
                height: '2px',
                background: 'black',
                transition: 'width .3s',
                position: 'absolute',
                bottom: 0,
                left: 0
              },
              '&:hover::after': {
                width: '100%'
              }
            }}
          >
            {item.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  </Box>
);

export default function HomePage() {
  const isMobile = useMediaQuery('(max-width:1023px)');

  return (
    <Container maxWidth="lg">

      {isMobile ? <MobileHeader /> : <DesktopHeader />}

      <Grid container spacing={4} alignItems="center" sx={{ my: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight="bold">
            Tus vacaciones como nunca
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Lorem fistrum condemor me cago en tus muelas amatomaa te va a hasé pupitaa...
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img 
            src="https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175372/fondo_hp9223.png" 
            alt="Hotel Magnolia"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} justifyContent="center" sx={{ my: 4 }}>
        {benefits.map((benefit, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} textAlign="center">
            <img src={benefit.icon} alt={benefit.label} width="140" />
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              {benefit.label}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ my: 4 }}>
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
  );
}
