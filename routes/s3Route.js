const express=require("express")
const router=express.Router()
const uploadToS3=require("../aws/uploadSetUp")  




router.post("/upload", async (req, res,next) => {
    const data=req.body.data
    const key=req.body.key

    await uploadToS3({
      key: key,
      data:data
    });

    res.send(`https://${'college-sigunp-image'}.s3.amazonaws.com/${key}`);
  });

module.exports=router

