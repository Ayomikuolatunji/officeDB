import express from "express"

import employeeRoutes from "../routes/employees/employee"

const api=express.Router()





api.use("/office-api",employeeRoutes)




export default api