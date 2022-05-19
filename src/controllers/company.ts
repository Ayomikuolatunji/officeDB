import Company from "../models/company"
import bcrypt from "bcrypt"
import  transporter from "../email/transporter";
import { RequestHandler } from "express";




export const createCompany:RequestHandler=async(req,res,next)=>{
  const company_name=req.body.company_name
  const company_type=req.body.company_type
  const company_email=req.body.company_email
  const company_password=req.body.company_password
  const  company_location=req.body.company_location 
  const companyExits=await Company.findOne({email:company_email})
  if(companyExits){
      res.status(422).json({message:"company already exits"})
  }
    try{
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
        const mailOptions = {
            from: 'ayomikuolatunji@gmail.com',
            to: company_email,
            subject: 'Ayoscript from onlineoffice.com',
            text: `Hello ${company_name} your account with this ${company_email} is created sucess fully successfully`,
            html:"<body><h5>You can login to your app with the link below</h5><div><a href='http://localhost:3000/login'>Login to your profile</a></div></body>"
          };
          // send email after successful signup
           transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error.message);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
    }catch(error){
        res.status(500).json({message:"Internal servel error detected"})
        next(error)
    }
}


export const companiesEmployees:RequestHandler=async(req,res,next)=>{
     try {
         const users=await Company.find({}).populate("company_employes")
         if(!users){
          const error=new Error(`user empty`)
          // error.statusCode=422
          throw error
         }     
         res.status(200).json({users})
     } catch (error) {

      // if(!error.statusCode){
      //      error.statusCode=500
      //  }
       next(error) 
     }   
}

