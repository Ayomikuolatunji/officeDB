import { RequestHandler } from "express"
import Chat from "../../models/chat"

export const fetchChat:RequestHandler=async(req,res,next)=>{
    const from=req.body.from
    const to=req.body.to
    try {
        const messages=await Chat.find({users:{$all:[from,to]}}).sort({updatedAt:1})
        if(!messages){
            const error=new Error("No similar chats found")
            // error.statusCode=404
            throw error
        }
        const sendChat=messages.map(chat=>{
            return {
                me:chat.sender.toString() === from,
                message:chat.chats
            }
        })
        res.status(200).json({sendChat})
    } catch (error) {
        //  if(!error.statusCode){
        //    error.statusCode=500
        //  }
       next(error)
    }
}


export const postChat:RequestHandler=async(req,res,next)=>{
 
   try {
    const message=req.body.chat
    const from=req.body.from
    const to=req.body.to
    const chatsCreated=await Chat.create({
        chats:message,
        users:[from,to],
        sender:from
    })
    if(!chatsCreated){
        const error=new Error("failed to create message chat")
        // error.statusCode=422
        throw error
    }
    res.status(201).json({message:"succesfully sent",chats:chatsCreated})
   } catch (error) {
    //    if(!error.statusCode){
    //        error.statusCode=500
    //    }
       next(error)
   }
    
}

