const mongoose=require("mongoose")


const Schema=mongoose.Schema


const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    status:{
      type:String,
      default:false
    },
    address:{
      type:String,
      default:false
    },
    role:{
      type:String,
      required:true     
    },
    password:{
        type:String,
        required:true,
    },
    avatarImageSet:{
        type:Boolean,
        default:false
    },
    about:{
       type:String,
       default:""
    },
    company:{
        type:Schema.Types.ObjectId,
        ref:"Companies",
    },
    avartImage:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJF7LAdiF7JlRs24nLsBKz7nWamkcdXPODQ&usqp=CAU",
    }
})

module.exports=mongoose.model("Users", userSchema)