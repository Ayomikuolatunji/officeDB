import {Router} from "express"
const router=Router()
import {createCompany,companiesEmployees} from "../../controllers/company/company"


router.get("/all_companies",companiesEmployees)
router.post('/auth/create_company_account',createCompany)


export default router