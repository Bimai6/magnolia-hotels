import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const embebbedUserReservationSchema = new mongoose.Schema({
    reservationId: {type: String, required:true}
}, {_id:false})

const userSchema = new mongoose.Schema({
    user: {type: String, required:true, trim:true},
    fullName: {type: String, required:true, trim:true},
    email: {type: String, required:true, trim:true},
    password: {type: String, required: true, trim:true},
    myReservations: [embebbedUserReservationSchema]
}, {timestamps:true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

userSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id,
        delete ret._id,
        delete ret.__v
    }
})

export default mongoose.model("User", userSchema);