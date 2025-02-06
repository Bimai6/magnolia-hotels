import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Restaurant from "../pages/Restaurant";
import Reservations from "../pages/Reservations";
import MyReservations from "../pages/MyReservations";
import RestaurantMenu from "../pages/RestaurantMenu";
import React from 'react'

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/reservations",
        element: <Reservations />
    },
    {
        path: "/restaurant",
        element: <Restaurant />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/restaurant-menu",
        element: <RestaurantMenu />
    },
    {
        path: "/my-reservations",
        element: <MyReservations />
    },
    
]);
