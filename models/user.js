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
    avartImage:{
        type:String,
        default:"",
    },
    company_belongs_to:{
        type:mongoose.Types.ObjectId,
        ref:"companies"
    }
})

module.exports=mongoose.model("Users", userSchema)