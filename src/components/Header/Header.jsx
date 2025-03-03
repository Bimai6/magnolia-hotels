import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, BottomNavigation, BottomNavigationAction, useMediaQuery, Button, Dialog } from '@mui/material';
import Register from '../Auth/Register';
import ContactSlider from '../ContactSlider/ContactSlider';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const navItems = [
  { label: 'Inicio', value: 'home', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/isotype_idmria.svg', link: '/', width: 45, height: 45 },
  { label: 'Estancia', value: 'book', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/bed_2_kda2wz.svg', link: '/my-reservations', width: 39, height: 39, ml: 'auto' },
  { label: 'Restaurante', value: 'restaurant', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/restaurant_d16z1c.svg', link: '/restaurant', width: 33, height: 33, ml: 2 },
  { label: 'Contacto', value: 'contact', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/contact_incmt5.svg', width: 33, height: 33, ml: 2 },
  { label: 'Identificarse', value: 'profile', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/profile_d9xatr.svg', link: '/profile', width: 33, height: 33, ml: 2 },
];

const MobileHeader = () => {
  const { isLogged } = React.useContext(AuthContext);
  const [value, setValue] = React.useState('home');
  const [open, setOpen] = React.useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <BottomNavigation
        sx={{ width: '100%', position: 'fixed', bottom: 0, backgroundColor: 'white', boxShadow: 'none', zIndex: '100' }}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            component={item.label === 'Identificarse' ? isLogged ? Link : 'button' : Link}
            to={item.label === 'Identificarse' ? isLogged ? item.link : undefined : item.link}
            value={item.value}
            onClick={item.label === 'Contacto' ? () => setIsContactOpen(true) : item.label === 'Identificarse' ? isLogged ? undefined : handleOpen : undefined}
            icon={<img src={item.icon} alt={item.label} width={item.width} height={item.height} style={{ margin: 0 }} />}
          />
        ))}
      </BottomNavigation>

      <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth sx={{ zIndex: 1200 }}>
        <Register />
      </Dialog>

      <ContactSlider isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

function DesktopHeader() {
  const { isLogged } = React.useContext(AuthContext);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrolling, setScrolling] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 70);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position={scrolling ? 'fixed' : 'absolute'}
          sx={{
            backgroundColor: scrolling || !isHome ? 'white' : 'transparent',
            boxShadow: scrolling || !isHome ? '0px 5px 10px rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'background-color 0.3s, box-shadow 0.3s',
            width: '100%'
          }}
        >
          <Toolbar>
            <IconButton component={Link} to="/" size="large" edge="start" aria-label="logo" disableRipple>
              <img
                src="https://res.cloudinary.com/dk1g12n2h/image/upload/v1739173714/IMG-20250202-WA0012_1_eic08v.png"
                alt="Logo"
                style={{ objectFit: 'contain', width: '200px', height: 'auto', margin: '0' }}
              />
            </IconButton>
            <Box sx={{ ml: 'auto', display: 'flex', gap: 8 }}>
              {navItems.slice(1).map((item) => (
                <Button
                  key={item.value}
                  component={item.label === 'Identificarse' ? isLogged ? Link : 'button' : Link}
                  to={item.label === 'Identificarse' ? isLogged ? item.link : undefined : item.link}
                  onClick={item.label === 'Contacto' ? () => setIsContactOpen(true) : item.label === 'Identificarse' ? isLogged ? undefined : handleOpen : undefined}
                  sx={{
                    color: scrolling || !isHome ? 'black' : 'white',
                    textTransform: 'none',
                    fontSize: '18px',
                    position: 'relative',
                    fontWeight: 300,
                    '&::after': {
                      content: '""',
                      display: 'block',
                      width: 0,
                      height: '2px',
                      background: scrolling || !isHome ? 'black' : 'white',
                      transition: 'width .3s',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  {isLogged ? (item.label === 'Identificarse' ? 'Mi perfil' : item.label) : item.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <ContactSlider isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <Dialog open={open} onClose={handleClose} maxWidth={'xl'} fullWidth sx={{ zIndex: 1200 }}>
        <Register />
      </Dialog>
    </div>
  );
}


function Header() {
  const isMobile = useMediaQuery('(max-width:1286px)');
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}

export default Header;
