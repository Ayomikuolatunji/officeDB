import {Router} from "express"
const router=Router()
import {createCompany,companiesEmployees, loginCompanyAdmin, forgotCompanyPassword} from "../../controllers/company/company"


router.get("/all_companies",companiesEmployees)
router.post("/auth/login_company_admin",loginCompanyAdmin)
router.post("/auth/forgot_company_password",forgotCompanyPassword)
router.post('/auth/create_company_account',createCompany)


export default router