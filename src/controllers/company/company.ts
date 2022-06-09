import bcrypt from "bcrypt"
import { RequestHandler } from "express";
import Error from "../../interface/errorInterface";
import Company from "../../models/company"
import sendCompanyReqEmail from "../../emails/sendCompanyRegEmail";




export const createCompany:RequestHandler=async(req,res,next)=>{

    try{
      const company_name=req.body.company_name
      const company_type=req.body.company_type
      const company_email=req.body.company_email
      const company_password=req.body.company_password
      const  company_location=req.body.company_location 

      const companyExits=await Company.findOne({company_email:company_email})

      if(companyExits){
        const error:Error=new Error("company already exists")
         error.statusCode=400
         throw error
      }

        const hashedPw =await  bcrypt.hash(company_password, 12);
        const newCompany=new Company({
          company_email:company_email,
          company_location:company_location,
          company_type:company_type,
          company_name:company_name,
          company_password:hashedPw
        })
        
        const result=await newCompany.save()  
        res.status(201).json({message:"Company account created successfully",companyId:result._id })
          // send email to company
          sendCompanyReqEmail(company_email,company_name)
    } catch (error) {
      next(error)
  }
}





export const companiesEmployees:RequestHandler=async(req,res,next)=>{
     try {
         const companies:any =await Company.find({})
         .populate("company_employes")
         if(!companies){
          const error:Error=new Error(`company not found `)
          error.statusCode=422
          throw error
         }  
         res.status(200).json({companies})
     }catch (error) {
      next(error)
  }  
}

