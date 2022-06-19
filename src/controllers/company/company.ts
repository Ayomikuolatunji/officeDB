import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { RequestHandler } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import crypto from "crypto"
import Error from "../../interface/errorInterface";
import Company from "../../models/company"
import sendCompanyReqEmail from "../../emails/company-email-service/sendCompanyRegEmail";
import sendForgotCompanyPassword from "../../emails/company-email-service/sendForgotCompanyPassword";
import companyAddress from "../../models/company-address";
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
        throwError("Company already exist",StatusCodes.CONFLICT)
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
        // check if password is correct
        const hashPassword=await bcrypt.compare(company_password,findOneCompany.company_password)
        // const hashPassword=await bcrypt.compare(company_password,findOneComapny.company_password)
        if(!hashPassword){
          throwError("Invalid email or password",StatusCodes.UNAUTHORIZED)
        }
        // generate token
         const token=jwt.sign({
             company_email:findOneCompany.company_email,
          },`somesupersecretsecret`,{expiresIn:"30d"})
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
    // set expiration date on company model
    const resetTokenExpirationDate=Date.now() + 360000
    // generate crypto token
    const cryptoToken=crypto.randomBytes(100).toString('hex')
    // save token to company
       await Company.findOneAndUpdate({company_email:company_email},{
        company_token:cryptoToken,
        resetTokenExpiration:resetTokenExpirationDate
      })

    // send email to company
    sendForgotCompanyPassword(company_email,findOneCompany.company_name, cryptoToken)
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
      await Company.findOneAndUpdate({
          company_token:company_token,
          resetTokenExpiration:{$gt:Date.now()}
      },{
        company_password:hashedPw,
        company_token:null
      })
      res.status(200).json({message:"Password updated successfully"})
     }catch (error) {
      next(error)
  }  
}



export const allCompanyDepartments:RequestHandler=async(req,res,next)=>{
     try {
         const companyId=req.body.company_id
         const findCompanyById=await Company.findById({
          _id:companyId
         })
         if(!findCompanyById){
          throwError("please provide a valid", StatusCodes.FORBIDDEN)
         }

         const populateCompanyDepartments=await Company.find({
          _id:companyId
         })
         .populate("company_departments")
         .select("company_departments")

         res.status(200).json({
             departments: populateCompanyDepartments
         })
           
     } catch (error) {
        next(error)
     }
}


export const companiesEmployees:RequestHandler=async(req,res,next)=>{
  try {
      const companies:any =await Company.find({})
      .populate("company_employes")
      if(!companies){
        throwError("No companies found",404)
      }

      res.status(200).json({companies})
  }catch (error) {
   next(error)
}  
}


// company adddress

export const CreateCompanyAddress:RequestHandler=async(req,res,next)=>{
  try {
      const companyId=req.body.company_id
      const companyAddress=req.body.company_address
      const company_city=req.body.company_city
      const company_state=req.body.company_state
      const company_country=req.body.company_country
      const company_zip=req.body.company_zip
      const company_phone=req.body.company_phone
      const company_website=req.body.company_website
       
      //create addres and push it to a company
      const newCompanyAddress=await companyAddress.create({
        company_address:companyAddress,
        company_city:company_city,
        company_state:company_state,
        company_country:company_country,
        company_zip:company_zip,
        company_phone:company_phone,
        company_website:company_website,
        company_id:companyId
      })
      // push address to company
      await Company.findOneAndUpdate({_id:companyId},{
        $push:{
          company_address:newCompanyAddress._id
        }
      })
      
      // find company address
  } catch (error) {
    next(error)
  }
}