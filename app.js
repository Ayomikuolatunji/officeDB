import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
// initialise app
const app=express()

// call dotenv 
dotenv.config()
// convert request to json using express middleware
app.use(express.json())

// enable cors policy
app.use(cors())


// connecting server

const server=app.listen(process.env.PORT,()=>{
    console.log(`App running locally on ${process.env.PORT}`)
})