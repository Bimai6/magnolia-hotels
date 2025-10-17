import express from "express"
import { createUser, deleteAnUser, getAllUsers, getAnUser } from "../controllers/UserController.js";
import { createRoom, deleteARoom, getAllRooms, getARoom } from "../controllers/RoomController.js";
import User from "../models/UserModel.js";
import Room from "../models/RoomModel.js";

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

router.get('/users', getAllUsers);
router.get('/users/:id', getAnUser);
router.post('/users', createUser);
router.delete('/users/:id', deleteAnUser);

router.get('/rooms', getAllRooms);
router.get('/rooms/:id', getARoom);
router.post('/rooms', createRoom);
router.delete('/rooms/:id', deleteARoom);

export default router