const mongoose=require("mongoose")


const Schema=mongoose.Schema


const chatSchema=new Schema({
   chats:{
       type:String,
       required:true
   },
   users:Array,
   sender:{
       type:Schema.Types.ObjectId,
       ref:'Users',
       required:true
   }
},{timestamps:true})



module.exports=mongoose.model("chats", chatSchema)