const bcrypt=require("bcrypt")
const User=require("../models/user")
const { validationResult }=require("express-validator")

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
    res.status(201).json({ message: 'User created!', user:result});
    } catch (err) {
     if (!err.statusCode) {
       err.statusCode = 500;
     }
    next(err);
  }
}

module.exports=registration