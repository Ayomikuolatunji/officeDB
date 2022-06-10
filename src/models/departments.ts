import mongoose from "mongoose";


const departmentsSchema=new mongoose.Schema({
    departments:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    }
})

export default mongoose.model("Tasks", departmentsSchema)