const mongoose=require("mongoose")


const Schema=mongoose.Schema

const industrySchema=Schema({
    name:{
        type:String,
        required:true
    }
})
export default mongoose.model("All_Industries", industrySchema)