import mongoose from "mongoose";



const companyAddress=new mongoose.Schema({
    company_address:{
        type:String,
        required:true,
        default:"",
        trim:true,
        minlength:3,
        maxlength:100,
    }, 
    company_city:{
        type:String,
        required:true,
        default:"",
        trim:true,
        minlength:3,
        maxlength:100,
    },
    company_state:{
        type:String,
        required:true,
        default:"",
        trim:true,
        minlength:3,
        maxlength:100,
    },
    company_zip:{
        type:Number,
        required:true,
        default:"",
        trim:true,
        maxlength:6,
    },
    company_phone:{
        type:String,
        required:true,
        default:"",
        trim:true,
        minlength:3,
        maxlength:100,

    },
    company_website:{
        type:String,
        required:true,
        default:"",
    }
},{timestamps:true})

export default mongoose.model("companyAddress", companyAddress)
