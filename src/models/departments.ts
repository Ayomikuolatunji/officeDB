import mongoose from "mongoose";


const departmentsSchema=new mongoose.Schema({
    departments:{
        type:String,
        required:true
    }
})

export default mongoose.model("Departments", departmentsSchema)