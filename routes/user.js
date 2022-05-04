const express=require("express")
const {body}=require("express-validator")
const User=require("../models/user")
const 
   {
    registration,
    login,
    oneUser,
    profilePicture,
    getAllUsers,
    deleteUser,
    resetPassword,
    correctPassword
  }
= require("../controllers/user")
const router=express.Router()


router
.get("/all_users",getAllUsers)

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
router.post("/login",login)


router.post("/reset_password",resetPassword)

router.post("/set_newpassword",correctPassword)

router.get("/:id",oneUser)

router.post("/profile_picture/:id", profilePicture)

router.get("/delete_user/:id",deleteUser)


module.exports=router