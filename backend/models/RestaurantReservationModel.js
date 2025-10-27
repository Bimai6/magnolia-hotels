import mongoose from "mongoose"

const restaurantReservationSchema = new mongoose.Schema({
    name: {type: String, required:true},
    mail: {type: String, required:true},
    phone: {type: String, min: 8, max: 15, required:true},
    guests: {type: Number, required:true},
    dateTime: {type: String, required:true}
}, {timestamps: true});

restaurantReservationSchema.set("toJSON",{ 
    transform: (doc, ret) => {
    ret.id = ret._id,
    delete ret._id,
    delete ret.__v
}})

export default mongoose.model("RestaurantReservation", restaurantReservationSchema);