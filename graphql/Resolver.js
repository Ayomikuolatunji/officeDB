const User=require("../models/user")

module.exports={
    name(){
        return "hello world"
    },
    Init(){
        return 100
    },
    update_Profile_Picture:async({avartImage,Id,avatarImageSet}, req)=>{


     const updateProfilePicture=await User.findByIdAndUpdate(Id,{
        avatarImageSet:true,
        avartImage: avartImage
     })
    }
    
}