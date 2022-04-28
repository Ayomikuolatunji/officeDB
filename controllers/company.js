const Company = require("../models/company")
const bcrypt=require("bcrypt")
const { transporter } = require("../email/transporter");




const createCompany=async(req,res,next)=>{
  const company_name=req.body.company_name
  const company_type=req.body.company_type
  const company_email=req.body.company_email
  const company_password=req.body.company_password  
    try{
        const companyExits=await Company.findOne({email:company_email})
        if(companyExits){
            res.status(422).json({message:"company already exits"})
        }
        const hashPassword=await bcrypt.hash(company_password,12)
        const newCompany=new Company({
          company_email, 
          company_type, 
          company_name, 
          hashPassword
        })
        const result=await newCompany.save()  
        res.status(201).json({newCompany:result})
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
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
    }catch(error){
        res.status(500).json({message:"Internal servel error detected"})
        next(error)
    }
}

module.exports={createCompany}