const mongoose=require("mongoose")


const Schema=mongoose.Schema


const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:5,
        max:25,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    avatarImageSet:{
        type:Boolean,
        default:false
    },
    avartImage:{
        type:String,
        default:"",
    }
})

module.exports=mongoose.model("Users", userSchema)