import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { RequestHandler } from "express";
import crypto from "crypto"
import Error from "../../interface/errorInterface";
import Company from "../../models/company"
import sendCompanyReqEmail from "../../emails/company-email-service/sendCompanyRegEmail";
import sendForgotCompanyPassword from "../../emails/company-email-service/sendForgotCompanyPassword";
import { throwError } from "../../middleware/throwError";




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

export const forgotCompanyPassword:RequestHandler=async(req,res,next)=>{
  try {
    const company_email=req.body.company_email
    const findOneCompany=await Company.findOne({company_email:company_email})
    // generate crypto token
    const cryptoToken=crypto.randomBytes(100)
    // save token to company
       await Company.findOneAndUpdate({company_email:company_email},{
        company_token:cryptoToken.toString("hex")
      })

    // send email to company
    sendForgotCompanyPassword(company_email,findOneCompany.company_name)

    res.status(200).json({message:"Email sent successfully", companyId:findOneCompany._id})
  }catch(error){
    next(error)
  }
}

export const resetPassword:RequestHandler=async(req,res,next)=>{
     try {
      const company_token=req.body.company_token
      const company_password=req.body.company_password
      const hashedPw =await  bcrypt.hash(company_password, 12);
      const findOneCompany=await Company.findOne({company_token:company_token})
      if(!findOneCompany){
         throwError("Company not found",404)
      }
      // update company password
      await Company.findOneAndUpdate({company_token:company_token},{
        company_password:hashedPw,
        company_token:null
      })
      res.status(200).json({message:"Password updated successfully"})
     }catch (error) {
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