const express=require("express")
const {postChat,fetchChat}=require("../controllers/Chat")

const router=express.Router()





router
.get("/chat",fetchChat)
.post("/chats", postChat)


module.exports=router