import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { RequestHandler } from "express";
import Error from "../../interface/errorInterface";
import Company from "../../models/company"
import sendCompanyReqEmail from "../../emails/company-email-service/sendCompanyRegEmail";




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

export const loginCompanyAdmin:RequestHandler=async(req,res,next)=>{

      try {
        const company_email=req.body.company_email
        const company_password=req.body.company_password
        // check if company exists
        const findOneCompany=await Company.findOne({company_email:company_email})
        const hashPassword=await bcrypt.compare(findOneCompany.company_email,company_password)
        // const hashPassword=await bcrypt.compare(company_password,findOneComapny.company_password)
        if(!hashPassword){
          const error:Error=new Error("Incorrect password")
          error.statusCode=400
          throw error
        }
        // generate token
         const token=jwt.sign({
           company_email:findOneCompany.company_email,
          },`${process.env.JSON_WEBTOKEN_SECRET_KEY}`,{expiresIn:"1h"})
          // send response
        res.status(200).json({message:"Login successful",token:token,companyId:findOneCompany._id})
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

