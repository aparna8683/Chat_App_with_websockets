import express from 'express'
import { protectRoute } from '../middlewares/auth.middleware.js'
import { getUsersForSidebar, getMessages, sentMessage } from '../controllers/messageController.js'

const messageRouter=express.Router()

messageRouter.get("/users",protectRoute, getUsersForSidebar)
messageRouter.get("/:id",protectRoute, getMessages)
messageRouter.post("/send/:id", protectRoute, sentMessage)

export default messageRouter