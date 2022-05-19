import { RequestHandler } from "express"


const ErrorPage:RequestHandler=(req,res,next)=>{
    res.status(404).json({message:"Route page found"})
}

export default ErrorPage