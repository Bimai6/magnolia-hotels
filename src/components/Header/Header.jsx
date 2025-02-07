import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import useMediaQuery from '@mui/material/useMediaQuery';

const navItems = [
  { label: 'Inicio', value: 'home', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/isotype_idmria.svg', link: '/' },
  { label: 'Estancia', value: 'book', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/bed_2_kda2wz.svg', link: '/my-reservations' },
  { label: 'Restaurante', value: 'restaurant', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/restaurant_d16z1c.svg', link: '/restaurant' },
  { label: 'Contacto', value: 'contact', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/contact_incmt5.svg' },
  { label: 'Perfil', value: 'profile', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/profile_d9xatr.svg', link: '/profile' },
];

const DesktopHeader = () => (
  <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)' }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        {navItems.map((item) => (
          <IconButton key={item.value} component={Link} to={item.link || '#'}>
            <img src={item.icon} alt={item.label} width={30} height={30} />
          </IconButton>
        ))}
      </Box>
    </Toolbar>
  </AppBar>
);

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
          icon={<img src={item.icon} alt={item.label} width={28} height={28} />}
        />
      ))}
    </BottomNavigation>
  );
};

function Header() {
  const isMobile = useMediaQuery('(max-width:1023px)');
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}

export default Header;
