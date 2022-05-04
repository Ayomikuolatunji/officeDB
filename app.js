const express=require("express")
const cors =require("cors")
const mongoose =require("mongoose")
var { graphqlHTTP } = require('express-graphql');
const bodyParser=require("body-parser")
const helmet = require("helmet");
// call dotenv 
require("dotenv").config()
require('express-async-errors');
const authRoutes=require("./routes/user")
const ErrorPage=require("./util/errrorPage")
const chatRoutes=require("./routes/chats")
const Socket=require("./socket-io/socket")
const buildSchema=require("./graphql/Schema")
const resolver = require("./graphql/Resolver");
const companyRoutes=require("./routes/company")
const allIndustryLists=require("./routes/industries")



// initialise app
const app=express()


// convert request to json using express middleware
app.use(bodyParser.json())



// graphql endpoints
app.use('/graphql', graphqlHTTP({
  schema: buildSchema,
  rootValue: resolver,
  graphiql: true,
}));
app.use(helmet())

// enable cors policy
app.use(cors())

// api routes for user auth
app.use("/office-api",allIndustryLists)
app.use("/office-api/auth",authRoutes)
app.use('/office-api',chatRoutes)
app.use("/office-api/auth",companyRoutes)
app.use(ErrorPage)


// error middleware request
app.use((error,req,res,next)=>{
  console.log(error.message);
  const message=error.message
  const status=error.statusCode 
  res.status(status).json({message:message})
})


// connecting server
const startConnection=(KEY)=>{
  mongoose
  .connect(KEY,{
         useNewUrlParser: true,
         useUnifiedTopology: true 
  })
  .then(Db=>{
      console.log("connected to database")
     const server=app.listen(process.env.PORT,()=>{
        console.log(`App running locally on ${process.env.PORT}`)
    })
    Socket(server)
  })
  .catch(err => {
    console.log(err.message);
  });
}

startConnection(process.env.MONGODB_KEY)

