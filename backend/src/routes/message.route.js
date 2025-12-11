import express from 'express'
import { protectRoute } from '../middlewares/auth.middleware.js'
import { getUsersForSidebar } from '../controllers/messageController.js'
const messageRouter=express.Router()



messageRouter.get("/users",protectRoute, getUsersForSidebar)

export default messageRouter