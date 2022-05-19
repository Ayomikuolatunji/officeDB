import Employee from "../models/employee"
import uploadToS3 from "../aws/uploadSetUp" 
import { Request } from "express"
import update_profileTypes from "../interface/graphqlInterface"



export ={
    update_Profile_Picture:async(profile:update_profileTypes, req:Request)=>{
       try {
        //    if the client does not exist or empty id throw error
        if(!profile.id){
            const error=new Error("No id provided")
            // error.statusCode=422
            throw error
         }
        // throw error if key and data returns empty strung from client
         if(profile.update_picture.key==="" || profile.update_picture.data===""){
            const error=new Error("empty entity")
            // error.statusCode=422
            throw error
         }
        //  upload to s3 bucket 
         await uploadToS3({
            Bucket:"officedbfiles", 
            key:profile.update_picture.key,
            data:profile.update_picture.data,
            ContentType:"image/jpeg"
        });
        // get aws s3 object url
          const s3Url=`https://officedbfiles.s3.amazonaws.com/${profile.update_picture.key}`
          //update userprofilepicture   
         const updateProfilePicture=await Employee.findOneAndUpdate({_id:profile.id},{
            avartImage:s3Url,
            avatarImageSet:true
          })
        //  if no profile picture found
         if(!updateProfilePicture){
             const error=new Error("Not updated")
            //  error.statusCode=422
             throw error
         }
        //  update our databse 
         return {
             ...updateProfilePicture._doc,
             _id:updateProfilePicture._id.toString(),
         }
       } catch (error) {
        //    handle error
        //    if(!error.statusCode){
        //        error.statusCode=500
        //    }   
        throw error
       }
    },
    // update employee username
    update_Profile_Username:async(profile:update_profileTypes, req:Request)=>{
        try {
            if(!profile.id){
                const  error=new Error("Can't find Id")
                // error.statusCode=404
                throw error
            }
            const findUser=await Employee.findByIdAndUpdate({_id:profile.id},{
                username:profile.update_username.username
            })
            if(!findUser){
                const error=new Error("No user with this id found")
                // error.statusCode=404
                throw error
            }
            return {
                ...findUser._doc,
                _id:findUser._id.toString()
            }
        } catch (error) {
            // if(!error.statusCode){
            //     error.statusCode=500
            // }
           throw error
        }
    },

    // update employee(user) role
    update_Employee_Role:async(profile:update_profileTypes,req:Request)=>{
       try{
        if(!profile.id){
            const error=new Error("Invalid id")
            // error.statusCode=422
            throw error
        }
        const findEmployee=await Employee.findByIdAndUpdate({_id:profile.id},{
             role:profile.role_update.role
        })
        if(!findEmployee){
         const error=new Error(`No employee found`)
        //  error.statusCode=404
         throw error
       }
       return {
         ...findEmployee._doc,
         _id:findEmployee._id.toString()
      }
       }catch(error){
        // if(!error.statusCode){  
        //     error.statusCode=500
        // }
         throw error
       }
    },

    update_Employee_Email:async(profile:update_profileTypes, req:Request)=>{
          try {
                if(!profile.id){
                    const error=new Error("Invalid id")
                    // error.statusCode=422
                    throw error
                }
                const findEmployee=await Employee.findByIdAndUpdate({_id:profile.id},{
                     email:profile.email_update.email
                })
                if(!findEmployee){
                 const error=new Error(`No employee found`)
                //  error.statusCode=404
                 throw error
               }
               return {
                 ...findEmployee._doc,
                 _id:findEmployee._id.toString()
              }
              
          } catch (error) {
            // if(!error.statusCode){
            //     error.statusCode=500
            // }
           throw error
          }
    },
    update_Employee_About:async(profile:update_profileTypes,req:Request)=>{
        try {
                if(!profile.id){
                    const error=new Error("Invalid id")
                    // error.statusCode=422
                    throw error
                }
                const findEmployee=await Employee.findByIdAndUpdate({_id:profile.id},{
                     about:profile.about_update.about
                })
                if(!findEmployee){
                 const error=new Error(`No employee found`)
                //  error.statusCode=404
                 throw error
               }
               return {
                 ...findEmployee._doc,
                 _id:findEmployee._id.toString()
              }
          } catch (error) {
            // if(!error.statusCode){
            //     error.statusCode=500
            // }
           throw error
          }     

    }
}