const express=require("express")
const {postChat,fetchChat}=require("../controllers/Chat")

const router=express.Router()





router
.post("/fetch-chats",fetchChat)
.post("/chats", postChat)
// .delete("/chats/:")

module.exports=router