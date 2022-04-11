const User=require("../models/user")


const UserID=async(req,res,next)=>{
   const {id}=req.params;
   if(!id){
       const error=new Error("Id is not found")
       error.statusCode=404
       throw error
   }
   const user=await User.findById({_id:id})
   if(!user){
    const error=new Error("user with this Id not found")
    error.statusCode=404
    throw error
   }
   req.userId=user._id
   next()
}
module.exports=UserID