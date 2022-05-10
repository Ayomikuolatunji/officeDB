const bodyParser=require("body-parser")

const req= (req, res, next) => {
    const contentType = req.headers["content-type"];
  
    if (contentType && contentType === "application/x-www-form-urlencoded") {
      return bodyParser.urlencoded({ extended: true })(req, res, next);
    }
  
    return bodyParser.json({ limit: "50mb" })(req, res, next);
};

module.exports=req