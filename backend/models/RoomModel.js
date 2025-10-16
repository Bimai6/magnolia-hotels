import mongoose from "mongoose"

const embebbedRoomReservationSchema = new mongoose.Schema({
    entry: {type: String, required:true},
    departure: {type: String, required:true},
    reservationId: {type: String, required:true}
}, {_id: false})

const roomSchema = new mongoose.Schema({
    title: {type: String, required:true},
    description: {type: String, required:true},
    stars: {type: Number, min: 1, max: 5, required:true},
    price: {type: Number, required:true},
    img: {type: String, required:true},
    reservations: [embebbedRoomReservationSchema]
}, {timestamps: true});

roomSchema.set("toJSON", (doc, ret) => {
    ret.id = ret._id,
    delete ret._id,
    delete ret.__v
})

export default mongoose.model("Room", roomSchema);