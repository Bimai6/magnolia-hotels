import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, BottomNavigation, BottomNavigationAction, useMediaQuery, Button, Dialog } from '@mui/material';
import Register from '../Auth/Register';
import ContactSlider from '../ContactSlider/ContactSlider';

const navItems = [
  { label: 'Inicio', value: 'home', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/isotype_idmria.svg', link: '/', width: 45, height: 45 },
  { label: 'Estancia', value: 'book', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/bed_2_kda2wz.svg', link: '/my-reservations', width: 39, height: 39, ml: 'auto' },
  { label: 'Restaurante', value: 'restaurant', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/restaurant_d16z1c.svg', link: '/restaurant', width: 33, height: 33, ml: 2 },
  { label: 'Contacto', value: 'contact', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/contact_incmt5.svg', width: 33, height: 33, ml: 2 },
  { label: 'Identificarse', value: 'profile', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/profile_d9xatr.svg', link: '/profile', width: 33, height: 33, ml: 2 },
];

const MobileHeader = () => {
  const [value, setValue] = React.useState('home');
  const [open, setOpen] = React.useState(false);
  const [logged, setLogged] = React.useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  React.useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.name) {
        setLogged(true);
      }
    } catch (error) {
      console.error("Error al leer el usuario del localStorage", error);
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <>
      <BottomNavigation
        sx={{ width: '100%', position: 'fixed', bottom: 0, backgroundColor: 'white', boxShadow: 'none' }}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            component={item.label === 'Identificarse' ? logged === true ? Link : 'button' : Link}
            to={item.label === 'Identificarse' ? logged === true ? item.link : undefined : item.link}
            value={item.value}
            onClick={item.label === 'Contacto' ? () => setIsContactOpen(true) : item.label === 'Identificarse' ? logged === true ? undefined : handleOpen : undefined}
            icon={<img src={item.icon} alt={item.label} width={item.width} height={item.height} />}
          />
        ))}
      </BottomNavigation>
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth sx={{ zIndex: 1200 }}>
        <Register setLogged={setLogged} />
      </Dialog>
      <ContactSlider isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

function DesktopHeader() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='absolute' sx={{ backgroundColor: 'transparent', boxShadow: 'none', width: '100%' }}>
          <Toolbar>
            <IconButton component={Link} to="/" size="large" edge="start" aria-label="logo" disableRipple>
              <img src="https://res.cloudinary.com/dk1g12n2h/image/upload/v1739173714/IMG-20250202-WA0012_1_eic08v.png" alt="Logo" style={{ objectFit: 'contain', width: '200px', height: 'auto' }} />
            </IconButton>
            <Box sx={{ ml: 'auto', display: 'flex', gap: 8 }}>
              {navItems.slice(1).map((item) => (
                <Button
                  key={item.value}
                  component={Link}
                  to={item.link}
                  onClick={item.label === 'Contacto' ? (e) => { e.preventDefault(); setIsContactOpen(true); } : undefined}
                  sx={{ color: 'white', textTransform: 'none', fontSize: '18px' }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <ContactSlider isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}

function Header() {
  const isMobile = useMediaQuery('(max-width:1285px)');
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}

export default Header;
