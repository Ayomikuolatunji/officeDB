const bcrypt=require("bcrypt")
const User=require("../models/user")
const { validationResult }=require("express-validator")

const registration=async(req,res,next)=>{
   const errors = validationResult(req);
   try {
    const username=req.body.username
    const email=req.body.email
    const password=req.body.password
    if(!errors.isEmpty()){
        const error=new Error('Validation failed')
        error.status=422
        throw error
    }
    // if email already exist throw erro to the client
    const checkUserExits=await User.findOne({email:email})
    if(checkUserExits){
        const error=new Error("This email is already used")
        error.statusCode=422;
        throw error;
    }
    const hashedPassword=await bcrypt.hash(password,20)
    const user=await User({
        username,
        email,
        hashedPassword
    })
    const userData=await user.save()
    res.status(210).json({message:"Account created successfully",data:userData.email})
   } catch (error) {
       console.log(error)
   }
}

module.exports=registration