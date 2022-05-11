const User=require("../models/user")
const uploadToS3=require("../aws/uploadSetUp") 

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
         await uploadToS3({
            key:update_picture.key,
            data:update_picture.data
          });
          const s3Url=`https://${'college-sigunp-image'}.s3.amazonaws.com/${update_picture.key}`
         const updateProfilePicture=await User.findOneAndUpdate({_id:id},{
            avartImage:s3Url
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
        throw error
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
           throw error
        }
    },

    // update employee(user) role
    update_Employee_Role:async({role_update,id},req)=>{
       try{
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
       }catch(error){
        if(!error.statusCode){  
            error.statusCode=500
        }
         throw error
       }
    }
}