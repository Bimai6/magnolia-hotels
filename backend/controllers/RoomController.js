import RoomModel from "../models/RoomModel.js";
import roomSchema from "../models/RoomModel.js"

export const createRoom = (req, res) => {
    const room = roomSchema(req.body);
    room
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message : error}));
}

export const createRooms = async (req, res) => {
    try {
        const roomsArray = req.body;
    if (!Array.isArray(roomsArray) || roomsArray.length === 0) {
        return res.status(400).json({ message: "Se requiere un array de habitaciones válido" });
    }

    const createdRooms = await RoomModel.insertMany(roomsArray);
    res.status(201).json(createdRooms);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creando las habitaciones", error: error.message });
    }
};

export const getAllRooms = (req, res) => {
    
    roomSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message : error}));
}

export const getARoom = async (req, res) => {
    try{
        const {id} = req.params;
        const room = await RoomModel.findById(id);

        if(!room){
            res.status(404).json({message: 'Habitación no encontrada'});
        }
    
        res.json((room));
    }catch(error){ 
        res.json({message : error});
    };
}

export const updateARoomReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const { reservations } = req.body;

        const roomToUpdate = await RoomModel.findById(id);

        if (!roomToUpdate) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }

        roomToUpdate.reservations = reservations;

        await roomToUpdate.save();

        const roomResponse = roomToUpdate.toJSON();

        res.json(roomResponse);

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: `La habitación ya había sido reservada` 
            });
        }
        res.status(500).json({ message: error.message });
    }
};

export const deleteARoom = async (req, res) => {
    try {
        const {id} = req.params;
        const room = await RoomModel.findByIdAndDelete(id);

        if(!room){
            res.status(404).json({message: 'Habitación no encontrada'})
        }
        res.json({message: `Habitación ${room.title} eliminada correctamente`});
    } catch (error) {
        res.json({message : error});
    }
}