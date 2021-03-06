import mongoose from "mongoose";


const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    task_deadline:{
        type:Date,
        required:true
    },
    department:{
        type:String,
        required:true
    }
})


export default mongoose.model("Tasks", taskSchema)