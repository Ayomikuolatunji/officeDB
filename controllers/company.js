const Company = require("../models/company")
const bcrypt = require('bcryptjs');



const createCompany=async(req,res,next)=>{
    try{
        const company_name=req.body.company_name
        const company_type=req.body.company_type
        const company_email=req.body.company_email
        const company_password=req.body.company_password  
        const companyExits=await Company.findOne({email:company_email})
        if(companyExits){
            res.status(422).json({message:"company already exits"})
        }
        const hashPassword= bcrypt.hash(15, company_password)
        const newCompany=await  Company.create({company_email, company_type, company_name, hashPassword})
        res.status(200).json({newCompany})
        
    }catch(error){
        res.status(500).json({message:"Internal servel error detected"})
        next(error)
    }
}

module.exports={createCompany}