const Industry=require("../models/industry")


const prepareAllIndustry=async(req,res,next)=>{
    const industries= await Industry.find({})
    res.status(200).json({message:industries})
}

module.exports=prepareAllIndustry