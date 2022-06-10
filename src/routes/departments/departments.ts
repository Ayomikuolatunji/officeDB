import express from "express"
import { createCompanyDepartments } from "../../controllers/departments/departments"


const router=express.Router()


router.post("/auth/create-department_for_companies",createCompanyDepartments)


export default router