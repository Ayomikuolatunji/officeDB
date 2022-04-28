const express=require("express")
const router=express.Router()
const {createCompany}=require("../controllers/company")



router.post('/create_company_account',createCompany)


module.exports=router