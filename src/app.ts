
import express  from 'express'
import cors from "cors"
import mongoose from "mongoose"
import { graphqlHTTP } from 'express-graphql'
import  bodyParser from "body-parser";
import methodOverride from "method-override"
// call dotenv 
import dotevn from  "dotenv"
dotevn.config()
import employeeRoutes from "./routes/employee"
import ErrorPage from "./util/errrorPage"
import chatRoutes from "./routes/chats"
import companyRoutes from "./routes/company"
import allIndustryLists from "./routes/industries"
import s3Route from "./routes/s3Route"
import errorHandler from './middleware/errorHandler';
import requestHeaders from './middleware/requestHeader';
import graphql from './graphql/graphql';



// initialise app
const app=express()


// convert request to json using express middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json())
app.use(methodOverride())
// file upload parser

// request headers middleware
app.use(requestHeaders)

// enable cors policy
app.use(cors())
// graphql endpoints
app.use('/graphql', graphqlHTTP(graphql()));

// api routes for user auth
app.use("/office-api",allIndustryLists)
app.use("/office-api",employeeRoutes)
app.use('/office-api',chatRoutes)
app.use("/office-api/auth",companyRoutes)
app.use("/office-api",s3Route)
app.use(ErrorPage)


// error middleware request
app.use(errorHandler)



// database connections

type MongoDBType =string | undefined
const MONGODB_KEY:MongoDBType=process.env.MONGODB_KEY
interface connectTypes {}
// connecting server
const startConnection=()=>{
  if(MONGODB_KEY===undefined) {
     console.log("MongoDB key is not set")
  }else{
    mongoose
  .connect(MONGODB_KEY,<connectTypes>{
    useNewUrlParser: true,
    useUnifiedTopology: true   
  })
  .then(Db=>{
      console.log("connected to database")
        app.listen(process.env.PORT,()=>{
        console.log(`App running locally on ${process.env.PORT}`)
    })
  })
  .catch(err => {
    console.log(err.message);
  });
  }
}

startConnection()
