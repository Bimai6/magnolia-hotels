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

export const getRestaurantReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantReservation = await RestaurantReservation.findById(id);
    if(!restaurantReservation){
        return res.status(404).json({message: 'No se ha encontrado la reserva'})
    }
    return res.json(restaurantReservation)
  } catch (error) {
    return res.status(500).json({message: error});
  }
};

export const updateRestaurantReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mail, phone, guests, dateTime} = req.body;

    const restaurantReservationToUpdate = await RestaurantReservation.findById(id);

    if(!restaurantReservationToUpdate){
        return res.status(404).json({message: 'No se ha encontrado la reserva'})
    }

    restaurantReservationToUpdate.name = name;
    restaurantReservationToUpdate.mail = mail;
    restaurantReservationToUpdate.phone = phone;
    restaurantReservationToUpdate.guests = guests;
    restaurantReservationToUpdate.dateTime = dateTime;

    const response = await restaurantReservationToUpdate.save();

    return res.json(response);

  } catch (error) {
    return res.status(500).json({message: error});
  }
}