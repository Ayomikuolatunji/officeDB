import { RequestHandler } from "express"
import { nextTick } from "process"
import Industry from "../../models/industry"


export const getAllIndustry:RequestHandler=async(req,res,next)=>{
     try{
        const industries= await Industry.find({})
        if(!industries){
            throw new Error("No industries found")
        }
        const totalIndustries=await Industry.find({}).countDocuments()
        res.status(200).json({total:`${totalIndustries} industries`, industries:industries})
     }catch(error){
         next(error)
     }
}
