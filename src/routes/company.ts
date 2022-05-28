import {Router} from "express"
const router=Router()
import {createCompany,companiesEmployees} from "../controllers/company/company"


router.get("/all_companies_employees",companiesEmployees)
router.post('/create_company_account',createCompany)


export default router