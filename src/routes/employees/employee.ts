import { Router } from "express"
import {body} from  "express-validator"
import User from  "../../models/employee"
import
   {
    registration,
    login,
    singleEmployee,
    profilePicture,
    getAllEmployees,
    deleteEmployee,
    resetPassword,
    correctPassword
  }
 from "../../controllers/employees/employee"
const router=Router()


router
.get("/auth/all_employees",getAllEmployees)

.post("/auth/register_employees",
    [
    body("email").isEmail().withMessage("Enter valid email address").custom((value,{})=>{
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
router.post("/auth/login_employee",login)


router.post("/auth/reset_employee_password",resetPassword)

router.post("/auth/set_employee_new_password",correctPassword)

router.get("/auth/employee/:id",singleEmployee)

router.post("/auth/employee_profile_picture/:id", profilePicture)

router.delete("/auth/delete_employee/:id",deleteEmployee)

router.post("/auth/add_employee_to_company/:id")

export default router