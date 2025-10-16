import roomSchema from "../models/RoomModel.js"

export const createRoom = (req, res) => {
    const room = roomSchema(req.body);
    room
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message : error}));
}

export const getAllRooms = (req, res) => {
    
    roomSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message : error}));
}