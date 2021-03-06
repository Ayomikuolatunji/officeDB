import mongoose from "mongoose"
const Schema=mongoose.Schema

const employeeSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    status:{
      type:String,
      default:false
    },
    address:{
      type:String,
      default:"Update your current location"
    },
    role:{
      type:String,
      required:true     
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
       default:"Write about yourself or describe yourself"
    },
    location:{
        type:String,
        default:"your location"
     },
    companies:[
        {
            type:Schema.Types.ObjectId,
            ref:"Companies",
        },
    ],
    avartImage:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJF7LAdiF7JlRs24nLsBKz7nWamkcdXPODQ&usqp=CAU",
    }
},{timestamps:true})

export default mongoose.model("Users", employeeSchema)