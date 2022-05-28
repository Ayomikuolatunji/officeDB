import express from "express"
import chatRoutes from "../routes/chats"
import companyRoutes from "../routes/company"
import allIndustryLists from "../routes/industries"
import s3Route from "../routes/s3Route"
import employeeRoutes from "../routes/employee"

const api=express.Router()




api.use("/office-api",allIndustryLists)
api.use("/office-api",employeeRoutes)
api.use('/office-api',chatRoutes)
api.use("/office-api/auth",companyRoutes)
api.use("/office-api",s3Route)



export  api