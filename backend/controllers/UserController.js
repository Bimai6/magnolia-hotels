import UserModel from "../models/UserModel.js";
import userSchema from "../models/UserModel.js";
import Joi from "joi";
import jwt from "jsonwebtoken";

const passwordValidator = Joi.string()
  .pattern(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/
  )
  .required()
  .messages({
    "string.pattern.base":
      "La contraseña debe tener al menos 8 caracteres e incluir letras y números",
    "string.empty": "La contraseña es obligatoria",
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
        message: `El ${field === "user" ? "usuario" : "email"} ya está en uso`,
      });
    }

    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
};

export const getAnUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

export const registerUser = async (req, res) => {
  try {
    const { fullName, user, email, password } = req.body;

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { user }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El usuario o el email ya están registrados" });
    }

    const newUser = await UserModel.create({
      fullName,
      user,
      email,
      password,
      myReservations: [],
    });

    const token = generateToken(newUser.id);

    res.status(201).json({
      user: newUser.toJSON(),
      token,
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor durante el registro" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { user, password } = req.body;


    const existingUser = await UserModel.findOne({
      $or: [{ user }, { email: user }],
    });

    if (!existingUser) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await existingUser.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = generateToken(existingUser.id);

    res.status(200).json({
      user: existingUser.toJSON(),
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor durante el login" });
  }
};

export const updateAnUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, fullName, email, password } = req.body;

    const userToUpdate = await UserModel.findById(id);
    if (!userToUpdate) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (req.user.id !== id) {
      return res.status(403).json({ message: "No autorizado para modificar este perfil" });
    }

    if (user) userToUpdate.user = user;
    if (fullName) userToUpdate.fullName = fullName;
    if (email) userToUpdate.email = email;

    if (password && password.trim() !== "") {
      const { error } = passwordValidator.validate(password);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      userToUpdate.password = password;
    }

    await userToUpdate.save();

    const updatedUser = userToUpdate.toJSON();

    const newToken = generateToken(updatedUser.id);

    res.status(200).json({
      user: updatedUser,
      token: newToken,
    });

  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: `El ${field === "user" ? "usuario" : "email"} ya está en uso`,
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
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    userToUpdate.myReservations = myReservations;

    await userToUpdate.save();

    const updatedUser = userToUpdate.toJSON();

    const newToken = generateToken(updatedUser.id);

    res.status(200).json({
      user: updatedUser,
      token: newToken,
    });
    
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: `La habitación ya había sido reservada`,
      });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteAnUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: `Usuario ${user.fullName} eliminado correctamente` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
