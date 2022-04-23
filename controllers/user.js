const bcrypt=require("bcrypt")
const User=require("../models/user")
const { validationResult }=require("express-validator");
const jwt=require("jsonwebtoken");
var nodemailer = require('nodemailer');
const {StatusCodes,ReasonPhrases} =require("http-status-codes")

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ayomikuolatunji',
    pass: 'rfigetyfhzcincej'
  },
  tls:{
    rejectUnauthorized:false
  }
});




const registration=async(req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
 // get client data from request body   
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const userExist=await User.findOne({email:email})
  if(userExist){
      const error=new Error("User already exist with this email")
      error.statusCode=422;
      throw error
  } 
  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      username,
      password: hashedPw,
    });
    const result = await user.save();
    res.status(201).json({ message: 'User created successfully!', user:result._id});

    var mailOptions = {
      from: 'ayomikuolatunji@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      text: `Your account is created sucess fully successfully you can login with this email`
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
    } catch (err) {
     if (!err.statusCode) {
       err.statusCode = 500;
     }
    next(err);
  }
}

const login=async(req,res,next)=>{
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      'somesupersecretsecret',
      { expiresIn: '24h' }
    );
    res.status(200).json({ token: token, user:user._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
} 

const oneUser=async(req,res,next)=>{
  const {id}=req.params;
   try {
    const user=await User.findById({_id:id})
    if(!user){
      const error=new Error("No user found")
      error.statusCode=404
      throw error
    }
    res.status(200).json({user:user})
    } catch (error) {
     if(!error.statusCode){
         error.statusCode=500
     }
     next(error)
   }
}

const profilePicture=async(req,res,next)=>{
  const {id}=req.params
  if(!id){
    const error=new Error(`Cant uplaod image with this ${id}`)
    error.statusCode=422
    throw error
  }
  const avartImage=req.body.avartImage
    try {
       const user=await User.findOneAndUpdate({_id:id},{
        avatarImageSet:true,
        avartImage: avartImage
       })
       return res.status(200).json({isSet:user.avatarImageSet,avartImage:user.avartImage})
    }catch (error) {
      if(!error.statusCode){
        error.statusCode=500
       }
       next(error) 
    }
}

const getAllUsers=async(req,res,next)=>{

     try {
         const users=await User.find({_id:{$ne:req.params.id}}).select([
           "email",
            "username",
            "avartImage",
            "_id"
         ])
         if(!users){
          const error=new Error(`user empty`)
          error.statusCode=422
          throw error
         }     
         res.status(200).json({users})
     } catch (error) {

      if(!error.statusCode){
           error.statusCode=500
       }
       next(error) 
     }   

}

const deleteUser=async(req,res,next)=>{
    try {
      const id=req.params.id;
    const findUser=await User.findByIdAndDelete({_id:id})
    if(!findUser){
      const error=new Error("No user find the id undefined")
      error.statusCode=404
      throw error
    }
    
    res.status(StatusCodes.OK).json({message:ReasonPhrases.OK})

    } catch (error) {
      if(!error.statusCode){
        error.statusCode=500
      }
      next(error)
    }
    
}


module.exports={
  registration,
  login,
  oneUser,
  profilePicture,
  getAllUsers,
  deleteUser
}