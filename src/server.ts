// dependency import modules
import cors from "cors"
import { graphqlHTTP } from 'express-graphql'
import  bodyParser from "body-parser";
import methodOverride from "method-override"
// call dotenv 
import dotevn from  "dotenv"
dotevn.config()
// external import modules
import app from "./services/app";
import ErrorPage from "./util/errrorPage"
import errorHandler from './middleware/errorHandler';
import requestHeaders from './middleware/requestHeader';
import graphql from './graphql/graphql';
import api from "./services/v1Api"
import connectFunction from './database/mongoDB';






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

//all api routes api routes 
app.use("/v1",api)
app.use(ErrorPage)


// error middleware request
app.use(errorHandler)




// connecting server
const startConnection=async()=>{
  try {
    await connectFunction()
    app.listen(process.env.PORT,()=>{
      console.log(`App runing on port ${process.env.PORT}`)
    })
  } catch (error:unknown) {
      if(error instanceof Error){
          console.log(error.message)
      }
  }
}
startConnection()

