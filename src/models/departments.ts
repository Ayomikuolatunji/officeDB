import mongoose from "mongoose";


const departmentsSchema=new mongoose.Schema({
    department:{
        type:String,
        required:true
    }
})

export default mongoose.model("Departments", departmentsSchema)