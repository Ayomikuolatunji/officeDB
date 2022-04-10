const bcrypt=require("bcrypt")
const User=require("../models/user")
const { validationResult }=require("express-validator")

const registration=async(req,res,next)=>{
    const username=req.body.username
    const email=req.body.email
    const password=req.body.password
    console.log(req.body)
    // if email already exist throw erro to the client
    const checkUserExits=await User.findOne({email:email})
    if(checkUserExits){
        const error=new Error("This email is already used")
        error.statusCode=422;
        throw error;
    }
    const user=await User({
        username,
        email,
        password
    })
    const userData=await user.save()
    res.status(210).json({message:"Account created successfully"})
}

module.exports=registration