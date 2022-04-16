const User=require("../models/user")

module.exports={
    name(){
        return "hello world"
    },
    Init(){
        return 100
    },
    update_Profile_Picture:async({update_picture,id}, req)=>{
      console.log(id)
     if(!id){
        const error=new Error("No id provided")
        error.statusCode=422
        throw error
     }
     const updateProfilePicture=await User.findOneAndUpdate({_id:id},{
        avatarImageSet:update_picture.avatarImageSet,
        avartImage:update_picture.avartImage
    })
     console.log(updateProfilePicture);
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