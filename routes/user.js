const express=require("express")
const {body}=require("express-validator")
const User=require("../models/user")
const {registration,login}= require("../controllers/user")

const router=express.Router()


router
.post("/register",
    [
    body("email").isEmail().withMessage("Enter valid email address").custom((value,{req})=>{
        return User.findOne({email:value})
        .then(userDoc=>{
            if(userDoc){
                return Promise.reject("user already exist")
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }).normalizeEmail(),
    body("username").trim(),
    body("password").trim()
    ],
    registration
)

router.get("/login",login)
module.exports=router