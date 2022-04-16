const User=require("../models/user")

module.exports={
    name(){
        return "hello world"
    },
    Init(){
        return 100
    },
    update_Profile_Picture:async({avartImage,id,avatarImageSet}, req)=>{
      console.log(id)
     if(!id){
        const error=new Error("No id provided")
        error.statusCode=422
        throw error
     }
     const updateProfilePicture=await User.findByIdAndUpdate({_id:id},{
        avatarImageSet:avatarImageSet,
        avartImage: avartImage
     })
     if(!updateProfilePicture){
         const error=new Error("Not updated")
         error.statusCode=422
         throw error
     }
     return {
         ...updateProfilePicture._doc,
         _id:updateProfilePicture._id.toString(),
     }
    }
    
}