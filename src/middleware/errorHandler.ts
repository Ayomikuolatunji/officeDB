import {NextFunction, Request, Response } from "express"
import Error from "../interface/errorInterface";



const errorHandler=(error:Error,req:Request,res:Response,next:NextFunction)=>{

    const message=error.message || "encounter error"
    const status=error.statusCode || 500
    res.status(status).json({message:message, error:"Error message",errorStatus:status})
}


export default errorHandler