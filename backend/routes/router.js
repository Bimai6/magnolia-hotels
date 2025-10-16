import express from "express"

const router = express.Router();

//This has to be moved to controllers 
router.post('/users', (req, res) => {
    res.send("create user")
})

export default router