import bcrypt from  "bcrypt"
import { validationResult } from "express-validator/src/validation-result";
import jwt from "jsonwebtoken"
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import crypto from "crypto";
import transporter from "../../transporter/transporter";
import Employee from "../../models/employee";
import Company from "../../models/company";
import { RequestHandler } from "express";
import Error from "../../interface/errorInterface";




export const registration:RequestHandler=async(req,res,next)=>{

  try {
     // get client data from request body   
     const email =(req.body as {email:string}).email;
     const username = (req.body as {username:string}).username;
     const password = (req.body as {password:string}).password;
     const role=(req.body as {role:string}).role
     const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error:Error = new Error('Validation failed.');
        error.statusCode = 422;
        throw error;
      }
      // send error to the client if the inputs are empty
      if(!email || !username || !password || !role){
        const error:Error=new Error("No input field must be empty")
        error.statusCode=422
        throw error
      }
    // find user
      const userExist=await Employee.findOne({email:email})
      // check if there is a user with the client email
      if(userExist){
          const error:Error=new Error("User already exist with this email")
          error.statusCode=422;
          throw error
      } 
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new Employee({
      email,
      username,
      role,
      password: hashedPw,
    });
      await user.save();
      // send request and email to the employee
    res.status(201).json({ message: 'Employee account created successfully!',employeeId:user._id});
    // send mail to employee after successfully signup
    var mailOptions = {
      from: 'ayomikuolatunji@gmail.com',
      to: email,
      subject: 'Ayoscript from onlineoffice.com',
      text: `Hello ${username} your account with this ${email} is created successfully successfully`,
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
    //  catch errors
    } catch (error) {
      console.log(error)
      next(error)
  }
}



export const login:RequestHandler=async(req,res,next)=>{
  try {
    const email = (req.body as {email:string}).email;
    const password = (req.body as {password:string}).password;
    const user = await Employee.findOne({ email: email });
    if (!user) {
      const error:Error = new Error('A user with this email could not be found.');
      error.statusCode = 404;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error:Error = new Error('Wrong password!');
      error.statusCode = 422;
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      'somesupersecretsecret',
      { expiresIn: '30d' }
    );
    res.status(200).json({ token: token, employeeId:user._id });
  } catch (error) {
    next(error)
}
} 



export const singleEmployee:RequestHandler=async(req,res,next)=>{
  const {id}=req.params;
   try {
    const user=await Employee.findById({_id:id})
    if (!user) {
      const error:Error= new Error('A user with this email could not be found.');
      error.statusCode = 40;
      throw error;
    }
    res.status(200).json({user:user})
    } catch (error:unknown) {
      if(error instanceof Error){
        throw error.message
      }
      next(error)
  }
}



export const profilePicture:RequestHandler=async(req,res,next)=>{
  const {id}=req.params
  if(!id){
    const error:Error=new Error(`Cant uplaod image with this ${id}`)
    error.statusCode=422
    throw error
  }
  const avartImage=(req.body as {avartImage:string}).avartImage
  const avatarImageSet=(req.body as {avatarImageSet:boolean}).avatarImageSet
    try {
       const user=await Employee.findOneAndUpdate({_id:id},{
        avatarImageSet:avatarImageSet,
        avartImage: avartImage
       })
       return res.status(200).json({msg:user})
    }catch (error) {
      next(error)
  }
}

export const getAllEmployees:RequestHandler=async(req,res,next)=>{

     try {
         const users=await Employee.find({}).select([
           "email",
            "username",
            "avartImage",
            "_id"
         ])
         if(!users){
          const error:any=new Error(`No user found`)
          error.statusCode=422
          throw error
         }     
         res.status(200).json({users})
     } catch (error:any) {
      next(error)
  }

}


export const deleteEmployee:RequestHandler=async(req,res,next)=>{
    try {
    const id=req.params.id;
    const findOne=await Employee.findById({_id:id})
    if(!findOne){
      const error=new Error("No user find  with the id undefined")
      // error.statusCode=404
      throw error
    } 
    const companyId=await Employee.findById({_id:findOne._id}).populate("company") 
    res.status(StatusCodes.OK).json({message:ReasonPhrases.ACCEPTED})
    console.log(companyId);
    // 
    await Company.findOneAndUpdate({company_email:companyId.company.company_email}, {$pull:
      {company_employes:findOne._id} 
    })
    // after remiving the reference from company schema the delete user
    const deleteUser=await Employee.findByIdAndDelete({_id:findOne._id})
    // send emails after deleting account
    var mailOptions = {
      from: 'ayomikuolatunji@gmail.com',
      to: deleteUser.email,
      subject: 'Ayoscript from onlineoffice.com',
      text: `Hello ${findOne.username} your account with this ${findOne.email} deactivated permanently`,
      html:`<body><h5>You deleted your account with ${companyId.company.company_name} and you are no longer with the company on our platformz</h5></body>`
    };
    // send email after successful signup
     transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    }catch (error) {
      next(error)
  }
    
}





export const resetPassword:RequestHandler=async(req,res,next)=>{
    try{
      const email=req.body.email
      const user=await Employee.findOne({email:email})
      if(!user){
        const error:Error=new Error("No user with the email found")
        error.statusCode=404
        throw error
      }
      const random= crypto.randomBytes(300)
      if(!random){
        return console.log("err");
      }
      const token=random.toString("hex")
      res.status(200).json({message:"Email sent to " + user.email})
      var mailOptions = {
      from: 'ayomikuolatunji@gmail.com',
      to: email,
      subject: 'Ayoscript from onlineoffice.com',
      text: `Your request to change password with ${email} is sent `,
      html:`<body><h5>You set your password with the link below</h5><div><a href='http://localhost:3000/forgot-password/new-password?code=${token}&id=${user._id}'>Click to correct password</a></div></body>`
    };
    // send email after successful signup
     transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    }catch (error) {
      next(error)
  }
}



export const correctPassword:RequestHandler=async(req,res,next)=>{
   try {
    const password=req.body.password
    const userId=req.body.userId
    const resetToken=req.body.resetToken
    const user=await Employee.findById({_id:userId})
    if(user || resetToken ||userId){
      const resetPassword=await bcrypt.hash(password,12)
      await Employee.findOneAndUpdate({_id:user._id},{
        password:resetPassword,
    })
    res.status(200).json({user:user._id}) 
    var mailOptions = {
      from: 'ayomikuolatunji@gmail.com',
      to: user.email,
      subject: 'Ayoscript from onlineoffice.com',
      text: `Your request to change password with ${user.email} is sucessful `,
      html:`<body><h5>Your password has been reset </h5><div><a href='http://localhost:3000/login'>Login to your profile</a></div></body>`
    };
    // send email after successful signup
     transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    }else{
      const error=new Error("You are not allowed")
      // error.statusCode=404
      throw error
    }
   } catch (error:any) {
    next(error)
}     
}

export const addEmployeeToCompany:RequestHandler=async(req,res,next)=>{
      try {
        const company_name=req.body.company_name
        const companyId=req.body.companyId
        const employeeId=req.params.id
        // find the employee by id
        if(!employeeId){
          const error:Error=new Error("No user with an id found")
          error.statusCode=404
          throw error
        }
        if(!companyId){
          const error:Error=new Error("No company with an id found")
          error.statusCode=404
          throw error
        }
        if(!company_name){
          const error:Error=new Error("No company with the name found")
          error.statusCode=404
          throw error
        }
        const employee=await Employee.findById({_id:employeeId})
                // find the company by id and company name
        const company=await Company.findById({ _id:companyId})
        // if no employee found throw error
        if(!employee){
          const error:Error=new Error("Employee not found")
          error.statusCode=422
          throw error
        }
        // if no company found throw error
        if(!company){
          const error:Error=new Error("company not found")
          error.statusCode=422
          throw error
        }
        if(company.company_name !==company_name){
          const error:Error=new Error("You are not allowed to join this company or invalid company name") 
          error.statusCode=422
          throw error
        }
        // check if the company id is not eual to the company _id
        // check if company exists in employee schema
        if(employee.companies.includes(companyId)){
          const error:Error=new Error("Employee already exists in this company")
          error.statusCode=422
          throw error
        }else{
          employee.companies.push(companyId)
          await employee.save()
        }
      
         // update employee id to company_employes array
         company.company_employes.push(employeeId)
         await company.save()
         return res.status(200).json({message:`employee added sucessfully to company ${company.company_name}`})
      } catch (error) {
         next(error)
      }
}

export const getEmployeeCompaines:RequestHandler=async(req,res,next)=>{
  try {
    const employeeId=req.params.id
    const employees=await Employee.findById({_id:employeeId})
    .populate({
      path:'companies',
      populate:{
        path:'company_employes',
      }
    })

    if(!employees){
      const error:Error=new Error("Employee not found")
      error.statusCode=404
      throw error
    }
    res.status(200).json({employee_companies:employees.companies})
  } catch (error) {
     next(error)
  }
}