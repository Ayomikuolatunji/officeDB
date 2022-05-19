const express=require("express")
const router=express.Router()
const uploadToS3=require("../aws/uploadSetUp") 
const User=require("../models/user") 



router.post("/upload", async (req, res) => {
    const data=req.body.data
    const key=req.body.key

    await uploadToS3({
      key: key,
      data:data
    });
    const s3Url=`https://${'college-sigunp-image'}.s3.amazonaws.com/${key}`
    const finderUser=await User.findOneAndUpdate("627a2056e4d0048ad86566e7",{
      avartImage:s3Url
    })
    res.send(finderUser);
  });

module.exports=router

