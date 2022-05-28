import express from "express"
import companyRoutes from "../routes/company/company"

const api=express.Router()


api.use("/office-api/auth",companyRoutes)




export default api