import UserModel from "../models/UserModel.js";
import userSchema from "../models/UserModel.js"

export const createUser = (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message : error}));
}

export const getAllUsers = (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message : error}));
}

export const getAnUser = async (req, res) => {

    try{
        const {id} = req.params;
        const user = await UserModel.findById(id);

        if(!user){
            res.status(404).json({message: 'Usuario no encontrado'})
        }
    
        res.json((user))
    }catch(error){ 
        res.json({message : error})
    };
}

export const deleteAnUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await UserModel.findByIdAndDelete(id);

    if(!user){
        res.status(404).json({message: 'Usuario no encontrado'})
    }
    
        res.json({message: `Usuario ${user.fullName} eliminado correctamente`})
    } catch (error) {
        res.json({message : error});
    }
}