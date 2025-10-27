import RestaurantReservation from "../models/RestaurantReservationModel.js";
import restaurantReservationSchema from "../models/RestaurantReservationModel.js"

export const createRestaurantReservation = (req, res) => {
    const reservation = restaurantReservationSchema(req.body);
    reservation
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message : error}));
}