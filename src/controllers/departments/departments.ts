import { RequestHandler } from "express";
import { throwError } from "../../middleware/throwError";
import company from "../../models/company";
import Department from "../../models/departments";



export const createCompanyDepartments:RequestHandler=async(req,res,next)=>{
   
    try {
        const companyId=req.body.companyId    
        const department_name=req.body.department_name
         
        if(!companyId){
            throwError("provided a valid company id", 404)
        }
         if(!department_name){
             throwError('provide department name', 404)
         }

        const createDepartment=await Department.create({
            department:department_name
        })
       
         const findCompany=await company.findById({_id:companyId})
         findCompany.company_departments.push(createDepartment._id)
         findCompany.save()
        
          res.status(200).json(findCompany)
    } catch (error) {
        console.log(error)
        next(error)
    }

}
