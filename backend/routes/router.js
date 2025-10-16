import express from "express"
import { createUser, getAllUsers} from "../controllers/UserController.js";
import { createRoom, getAllRooms } from "../controllers/RoomController.js";
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
router.post('/users', createUser);

router.get('/rooms', getAllRooms);
router.post('/rooms', createRoom);

export default router