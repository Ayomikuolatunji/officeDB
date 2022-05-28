import express from "express";
const router=express.Router()
import uploadToS3 from "../../aws/uploadSetUp"; 
import Employee from "../../models/employee"; 



router.post("/upload", async (req, res) => {
    const data=req.body.data
    const key=req.body.key
    const url:any="627a2056e4d0048ad86566e7"
    await uploadToS3({
      Bucket:"officedbfiles",
      key: key,
      data:data,
      ContentType:"image/jpeg"
    });
    const s3Url=`https://${'college-sigunp-image'}.s3.amazonaws.com/${key}`
    const finderUser=await Employee.findOneAndUpdate(url,{
      avartImage:s3Url
    })
    res.send(finderUser);
  });

export default router

