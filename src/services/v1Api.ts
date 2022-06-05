import express from "express"
import chatRoutes from "../routes/chats/chats"
import companyRoutes from "../routes/company/company"
import allIndustryLists from "../routes/industries/industries"
import s3Route from "../routes/s3routes/s3Route"
import employeeRoutes from "../routes/employees/employee"

const api=express.Router()




// version1 apis
api.use("/office-api",allIndustryLists)
api.use("/office-api",employeeRoutes)
api.use('/office-api',chatRoutes)
api.use("/office-api",companyRoutes)
api.use("/office-api",s3Route)



export default api