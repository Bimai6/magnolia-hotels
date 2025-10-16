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