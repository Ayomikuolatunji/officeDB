import {NextFunction, Request, RequestHandler, Response } from "express"
import Error from "./errorInterface";



const errorHandler=(error:Error,req:Request,res:Response,next:NextFunction)=>{

    const message=error.message || "encounter error"
    const status=error.statusCode || 500
    return res.status(status).json({message:message, error:"Error message"})
}


export default errorHandler