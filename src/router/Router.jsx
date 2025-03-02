import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Profile from '../pages/Profile/Profile';
import Restaurant from '../pages/Restaurant/Restaurant';
import Reservations from '../pages/Reservations/Reservations';
import MyReservations from '../pages/MyReservations/MyReservations';


export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/reservations',
    element: <Reservations />, 
  },
  {
    path: '/restaurant',
    element: <Restaurant />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/my-reservations',
    element: <MyReservations />
  },
]);
