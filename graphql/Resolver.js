const User=require("../models/user")

module.exports={
    name(){
        return "hello world"
    },

    Init(){
        return 100
    },

    update_Profile_Picture:async({update_picture,id}, req)=>{
       try {
        if(!id){
            const error=new Error("No id provided")
            error.statusCode=422
            throw error
         }
         const updateProfilePicture=await User.findOneAndUpdate({_id:id},{
            avatarImageSet:update_picture.avatarImageSet,
            avartImage:update_picture.avartImage
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
       } catch (error) {
           if(!error.statusCode){
               error.statusCode=500
           }   
           next(error)
       }
    },
    // update employee username
    update_Profile_Username:async({update_username, id}, req)=>{
        try {
            if(!id){
                const  error=new Error("Can't find Id")
                error.statusCode=404
                throw error
            }
            const findUser=await User.findByIdAndUpdate({_id:id},{
                username:update_username.username
            })
            if(!findUser){
                const error=new Error("No user with this id found")
                error.statusCode=404
                throw error
            }
            return {
                ...findUser._doc,
                _id:findUser._id.toString()
            }
        } catch (error) {
            if(!error.statusCode){
                error.statusCode=500
            }
            next(error)
        }
    },

    // update employee(user) role
    update_Employee_Role:async({role_update,id},req)=>{
       if(!id){
           const error=new Error("Invalid id")
           error.statusCode=422
       }
       const findEmployee=await User.findByIdAndUpdate({_id:id},{
            role:role_update.role
       })
       if(!findEmployee){
        const error=new Error(`No employee found`)
        error.statusCode=404
      }
      return {
        ...findEmployee._doc,
        _id:findEmployee._id.toString()
    }
    }
}