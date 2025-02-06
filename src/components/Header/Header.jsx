import * as React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const navItems = [
  { label: 'Inicio', value: 'home', icon: '/icons/isotype.svg', width: 40, height: 40, link: '/'},
  { label: 'Estancia', value: 'book', icon: '/icons/bed_2.svg' , width: 34, height: 34, link: '/my-reservations'},
  { label: 'Restaurante', value: 'restaurant', icon: '/icons/restaurant.svg', width: 28, height: 28, link: '/restaurant'},
  { label: 'Contacto', value: 'contact', icon: '/icons/contact.svg', width: 28, height: 28},
  { label: 'Perfil', value: 'profile', icon: '/icons/profile.svg', width: 28, height: 28, link: '/profile'},
];

function Header() {
  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      {navItems.map((item) => (
        <BottomNavigationAction
          key={item.value}
          component={Link}
          to={item.link}
          value={item.value}
          icon={<img src={item.icon} alt={item.label} width={item.width} height={item.height} />}
        />
      ))}
    </BottomNavigation>
  );
}

export default Header;