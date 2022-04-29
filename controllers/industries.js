const Industry=require("../models/industry")


const prepareAllIndustry=async(req,res)=>{
     try{
        const industries= await Industry.find({})
        if(!industries){
            throw new Error("No industries found")
        }
        const totalIndustries=await Industry.find({}).countDocuments()
        res.status(200).json({total:`${totalIndustries} industries`, industries:industries})
     }catch(error){

     }
}

module.exports=prepareAllIndustry