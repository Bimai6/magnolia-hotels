import RestaurantReservation from "../models/RestaurantReservationModel.js";
import restaurantReservationSchema from "../models/RestaurantReservationModel.js";

export const createRestaurantReservation = (req, res) => {
  const reservation = restaurantReservationSchema(req.body);
  reservation
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

export const getRestaurantReservationByMailAndId = async (req, res) => {
  try {
    const { mail } = req.body;
    const { id } = req.params;
    const restaurantReservation = await RestaurantReservation.findById(id);
    if(!restaurantReservation || restaurantReservation.mail !== mail){
        return res.status(404).json({message: 'No se ha encontrado una reserva para el restaurante con esos datos'})
    }
    return res.json(restaurantReservation)
  } catch (error) {
    return res.status(500).json({message: error});
  }
};
