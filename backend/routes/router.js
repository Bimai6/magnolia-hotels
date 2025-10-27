import express from "express"
import { createUser, deleteAnUser, getAllUsers, getAnUser, loginUser, registerUser, updateAnUserProfile, updateAnUserReservation } from "../controllers/UserController.js";
import { createRoom, createRooms, deleteARoom, getAllRooms, getARoom, updateARoomReservation } from "../controllers/RoomController.js";
import User from "../models/UserModel.js";
import Room from "../models/RoomModel.js";
import { verifyToken } from "../middlewares/auth.js";
import { createRestaurantReservation } from "../controllers/RestaurantReservationController.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        const rooms = await Room.find();
        res.json({ users, rooms });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', loginUser);
router.post('/register', registerUser);

router.get('/users', getAllUsers);
router.get('/users/:id', getAnUser);
//router.post('/users', createUser);
router.patch('/users/:id', verifyToken, updateAnUserProfile);
router.patch('/users/:id/reservations', verifyToken, updateAnUserReservation);
//router.delete('/users/:id', deleteAnUser);

router.get('/rooms', getAllRooms);
router.get('/rooms/:id', getARoom);
//router.post('/rooms', createRoom);
router.patch('/rooms/:id', verifyToken, updateARoomReservation);
//router.post('/rooms/bulk', createRooms);
//router.delete('/rooms/:id', deleteARoom);

router.post('/restaurantReservations', createRestaurantReservation);

export default router