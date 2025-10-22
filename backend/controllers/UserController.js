import UserModel from "../models/UserModel.js";
import userSchema from "../models/UserModel.js";
import Joi from "joi";

const passwordValidator = Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/)
    .required()
    .messages({
    'string.pattern.base': 'La contraseña debe tener al menos 8 caracteres e incluir letras y números',
    'string.empty': 'La contraseña es obligatoria'
    });

export const createUser = async (req, res) => {
    try {
        const user = new UserModel(req.body);
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                message: `El ${field === 'user' ? 'usuario' : 'email'} ya está en uso`
            });
        }

        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({message : error.message}));
}

export const getAnUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await UserModel.findById(id);

        if(!user){
            res.status(404).json({message: 'Usuario no encontrado'})
        }
    
        res.json((user))
    }catch(error){ 
        res.status(500).json({ message: error.message });
    };
}

export const updateAnUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, fullName, email, password } = req.body;

        const userToUpdate = await UserModel.findById(id);

        if (!userToUpdate) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        userToUpdate.user = user;
        userToUpdate.fullName = fullName;
        userToUpdate.email = email;

        if (password && password.trim() !== '') {
            const { error } = passwordValidator.validate(password);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            userToUpdate.password = password;
        }

        await userToUpdate.save();

        const userResponse = userToUpdate.toJSON();

        res.json(userResponse);

    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ 
                message: `El ${field === 'user' ? 'usuario' : 'email'} ya está en uso` 
            });
        }
        res.status(500).json({ message: error.message });
    }
};

export const updateAnUserReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const { myReservations } = req.body;

        const userToUpdate = await UserModel.findById(id);

        if (!userToUpdate) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        userToUpdate.myReservations = myReservations;

        await userToUpdate.save();

        const userResponse = userToUpdate.toJSON();

        res.json(userResponse);

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: `La habitación ya había sido reservada` 
            });
        }
        res.status(500).json({ message: error.message });
    }
};

export const deleteAnUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await UserModel.findByIdAndDelete(id);

    if(!user){
        res.status(404).json({message: 'Usuario no encontrado'})
    }
        res.json({message: `Usuario ${user.fullName} eliminado correctamente`})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}