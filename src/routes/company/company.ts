import {Router} from "express"
const router=Router()
import {createCompany,companiesEmployees, loginCompanyAdmin, forgotCompanyPassword, allCompanyDepartments, createCompanyAddress} from "../../controllers/company/company"


router.get("/all_companies",companiesEmployees)

router.post("/auth/login_company_admin",loginCompanyAdmin)

router.post("/auth/forgot_company_password",forgotCompanyPassword)

router.get("/get_all_company_departments",allCompanyDepartments)

router.post('/auth/create_company_account',createCompany)

router.patch('/auth/create_company_password',createCompanyAddress)


export default router