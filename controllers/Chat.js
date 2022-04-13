const Chat =require("../models/chat")

const fetchChat=async()=>{

}


const postChat=async(req,res,next)=>{
   try {
    const chat=req.body.chat
    const from=req.body.from
    const to=req.body.to
    const chatsCreated=await Chat.create({
        chat:{text:{chat}},
        users:[from,to],
        sender:from
    })
    if(!chatsCreated){
        const error=new Error("failed to create message chat")
        error.statusCode=422
        throw error
    }
    res.status(201).json({message:"succesfully sent",chat:chatsCreated})
   } catch (error) {
       if(!error.statusCode){
           error.statusCode=500
       }
       next(error)
   }
    
}

module.exports={postChat,fetchChat}