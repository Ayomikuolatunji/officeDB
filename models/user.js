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
        default:"",
    }
})

module.exports=mongoose.model("Users", userSchema)