import { RequestHandler } from "express"


const requestHeaders:RequestHandler=(req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  next()
}


export default requestHeaders