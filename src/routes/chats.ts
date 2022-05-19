import express, { Router } from "express"
import { postChat, fetchChat } from "../controllers/Chat"

const router=Router()





router
.post("/fetch-chats",fetchChat)
.post("/chats", postChat)
// .delete("/chats/:")

export default router