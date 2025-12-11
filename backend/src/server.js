import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
const app=express();
dotenv.config()
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
const PORT =process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.get("/home", (req,res)=>{
    res.send("Working right")
})

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)


app.listen((PORT), async (req,res)=>{
    console.log("Server is connected on port",PORT)
    connectDB()
})
