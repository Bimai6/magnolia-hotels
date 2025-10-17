import RoomModel from "../models/RoomModel.js";
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

export const getARoom = async (req, res) => {
    try{
        const {id} = req.params;
        const room = await RoomModel.findById(id);

        if(!room){
            res.status(404).json({message: 'Habitacion no encontrada'});
        }
    
        res.json((room));
    }catch(error){ 
        res.json({message : error});
    };
}

export const deleteARoom = async (req, res) => {
    try {
        const {id} = req.params;
        const room = await RoomModel.findByIdAndDelete(id);

        if(!room){
            res.status(404).json({message: 'Habitacion no encontrada'})
        }
        res.json({message: `Habitacion ${room.title} eliminada correctamente`});
    } catch (error) {
        res.json({message : error});
    }
}