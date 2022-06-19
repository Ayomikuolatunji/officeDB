import mongoose from "mongoose"
const Schema=mongoose.Schema

const companySchema=new Schema({
      company_name:{
          type:String,
          required:true
      },
      admin_name:{
         type:String,
         default:"admin"
      },
      company_profile_picture:{
         type:String,
         default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJF7LAdiF7JlRs24nLsBKz7nWamkcdXPODQ&usqp=CAU",
         required:true
      },
      company_type:{
          type:{
              type:String,
              require:true
          }
      },
      company_token:{
        type:String,
        default:""    
      },
      resetTokenExpiration:Date,
      admin_picture:{
         type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJF7LAdiF7JlRs24nLsBKz7nWamkcdXPODQ&usqp=CAU",
      },
      company_email:{
          type:String,
          required:true
      },
      company_password:{
           type:String,
           required:true
      },
      company_employes:[
        {
            type:Schema.Types.ObjectId,
            ref:"Users"
        }
      ],
      company_address:[
         {
              type:Schema.Types.ObjectId,
              ref:"CompanyAddress"
         }
      ],
      company_departments:[
        {
            type:Schema.Types.ObjectId,
            ref:"Departments"
        }
      ],
},{timestamps:true})

export default mongoose.model("Companies", companySchema)

