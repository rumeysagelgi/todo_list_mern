import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import userRouter from "./routes/userRoute.js"
import taskRouter from "./routes/taskRoute.js"

// App config
dotenv.config()
const app = express()
const port = process.env.PORT || 8001
mongoose.set('strictQuery', true);

// Middlewares
app.use(express.json())
app.use(cors())

// Database config
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected to MongoDB")
    }
})

// API endpoints
app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)

// Listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))