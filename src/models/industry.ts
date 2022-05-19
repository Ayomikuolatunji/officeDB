const mongoose=require("mongoose")


const Schema=mongoose.Schema

const industrySchema=Schema({
    name:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("All_Industries", industrySchema)