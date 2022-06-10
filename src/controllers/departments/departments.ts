import { RequestHandler } from "express";
import company from "../../models/company";
import Department from "../../models/departments";



export const createCompanyDepartments:RequestHandler=async(req,res,next)=>{
   
    try {
        const companyId=(req.body.companyId as {companyId:string}).companyId   
        const departments=(req.body.departments as {departments:string}).departments
       
       
        const createDepartment=await Department.create({
            department:departments
        })
       
        const findCompany=await company.findById({_id:companyId})
        await findCompany.company_departments.push(createDepartment)
        
    } catch (error) {
        console.log(error)
    }

}
