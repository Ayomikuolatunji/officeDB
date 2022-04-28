const express=require("express")
const router=express.Router()
const {createCompany,companiesEmployees}=require("../controllers/company")


router.get("/all_companies_employees",companiesEmployees)
router.post('/create_company_account',createCompany)


module.exports=router