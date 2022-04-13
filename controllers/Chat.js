const Chat =require("../models/chat")

const fetchChat=async(req,res,next)=>{
    const from=req.body
    const to=req.body
    try {
        const messages=await Chat.find({users:{$all:["6255d4b309f2b134d30584a2","6255d5b309f2b134d30584b9"]}}).sort({createdAt:-1})
        if(!messages){
            const error=new Error("No similar chats found")
            error.statusCode=404
            throw error
        }
        const sendChat=messages.map(chat=>{
            return {
                me:chat.sender.toString() ==="6255d4b309f2b134d30584a2",
                message:chat.chats
            }
        })
        res.status(200).json({sendChat})
    } catch (error) {
         if(!error.statusCode){
           error.statusCode=500
       }
       next(error)
    }
}


const postChat=async(req,res,next)=>{
 
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
        error.statusCode=422
        throw error
    }
    res.status(201).json({message:"succesfully sent",chats:chatsCreated})
   } catch (error) {
       if(!error.statusCode){
           error.statusCode=500
       }
       next(error)
   }
    
}

module.exports={postChat,fetchChat}