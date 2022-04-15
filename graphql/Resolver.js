const User=require("../models/user")

module.exports={
    name(){
        return "hello world"
    },
    Init(){
        return 100
    },
    update_Profile_Picture:async({avartImage,Id}, req)=>{


     const updateProfilePicture=await User.findByIdAndUpdate()
    }
    
}