import { Router } from "express"
import {body} from  "express-validator"
import User from  "../models/employee"
import
   {
    registration,
    login,
    singleEmployee,
    profilePicture,
    getAllUsers,
    deleteEmployee,
    resetPassword,
    correctPassword
  }
 from "../controllers/employee"
const router=Router()


router
.get("/auth/all_employees",getAllUsers)

.post("/auth/register_employee",
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
router.post("/auth/employee_login",login)


router.post("/auth/reset_employee_password",resetPassword)

router.post("/auth/set_employee_newpassword",correctPassword)

router.get("auth/:id",singleEmployee)

router.post("/auth/employee_profile_picture/:id", profilePicture)

router.delete("/auth/delete_employee/:id",deleteEmployee)

router.post("/auth/add_employee_to_company/:id")

export default router