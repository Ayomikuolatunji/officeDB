import express from "express";
const router=express.Router()
import uploadToS3 from "../aws/uploadSetUp"; 
import Employee from "../models/employee"; 



router.post("/upload", async (req, res) => {
    const data=req.body.data
    const key=req.body.key

    await uploadToS3({
      key: key,
      data:data
    });
    const s3Url=`https://${'college-sigunp-image'}.s3.amazonaws.com/${key}`
    const finderUser=await Employee.findOneAndUpdate("627a2056e4d0048ad86566e7",{
      avartImage:s3Url
    })
    res.send(finderUser);
  });

module.exports=router

