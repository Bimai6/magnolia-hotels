import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Profile from '../pages/Profile/Profile';
import Restaurant from '../pages/Restaurant/Restaurant';
import Reservations from '../pages/Reservations/Reservations';
import MyReservations from '../pages/MyReservations/MyReservations';
import RestaurantMenu from '../pages/RestaurantMenu/RestaurantMenu';
import PrivateRoute from '../components/PrivateRoute'; 

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/reservations',
    element: <PrivateRoute element={<Reservations />} />, 
  },
  {
    path: '/restaurant',
    element: <Restaurant />,
  },
  {
    path: '/profile',
    element: <PrivateRoute element={<Profile />} />,
  },
  {
    path: '/restaurant-menu',
    element: <RestaurantMenu />,
  },
  {
    path: '/my-reservations',
    element: <PrivateRoute element={<MyReservations />} />,
  },
]);
