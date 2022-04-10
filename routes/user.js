const express=require("express")
const {body}=require("express-validator")

const registration = require("../controllers/user")

const router=express.Router()


router
.post("/register",
    [
    body("email").isEmail().trim().notEmpty(),
    body("username").trim(),
    body("password").trim()
    ],
    registration
)

module.exports=router