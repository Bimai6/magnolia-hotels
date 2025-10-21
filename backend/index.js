import dotenv from "dotenv"
dotenv.config();
import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import router from "./routes/router.js";
import { corsOptions } from "./config/corsConfig.js";

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', router)

app.get('/', (req, res)=> {
    res.send('Welcome to my api');
})

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=> console.log("Connected to MongoDB Atlas"))
    .catch((error)=> console.log(error))

app.listen(9000, ()=> console.log('server listening on port 9000'));