import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, BottomNavigation, BottomNavigationAction, useMediaQuery, Button} from '@mui/material';

const navItems = [
  { label: 'Inicio', value: 'home', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/isotype_idmria.svg', link: '/', width: 45, height: 45 },
  { label: 'Estancia', value: 'book', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/bed_2_kda2wz.svg', link: '/my-reservations', width: 39, height: 39, ml: 'auto'},
  { label: 'Restaurante', value: 'restaurant', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/restaurant_d16z1c.svg', link: '/restaurant', width: 33, height: 33, ml:2 },
  { label: 'Contacto', value: 'contact', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/contact_incmt5.svg', width: 33, height: 33, ml:2 },
  { label: 'Identificarse', value: 'profile', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/profile_d9xatr.svg', link: '/profile', width: 33, height: 33, ml:2 },
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

function DesktopHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            component={Link}
            to="/"
            size="large"
            edge="start"
            aria-label="logo"
            disableRipple
          >
            <img 
              src="https://res.cloudinary.com/dk1g12n2h/image/upload/v1739173714/IMG-20250202-WA0012_1_eic08v.png" 
              alt="Logo"
              style={{ objectFit: 'contain', width: '200px', height: 'auto' }} 
            />
          </IconButton>
          <Box sx={{ ml: 'auto', display: 'flex', gap: 8 }}>
            {navItems.slice(1).map((item) => (
              <Button 
                key={item.value} 
                component={Link} 
                to={item.link} 
                sx={{ 
                  color: 'black', 
                  textTransform: 'none', 
                  fontSize: '18px', 
                  position: 'relative',
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
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}



function Header() {
  const isMobile = useMediaQuery('(max-width:1023px)');
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}

export default Header;