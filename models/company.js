const mongoose=require("mongoose")

const companySchema=new mongoose.Schema({
      company_name:{
          type:String,
          required:true
      },
      company_email:{
          type:string,
          required:true
      },
      company_password:{
           type:string,
           required:true
      },
      company_employes:{
          type:mongoose.Types.ObjectId,
          ref:"users"
      }
})

module.exports=mongoose.model("companies", companySchema)