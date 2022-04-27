const express=require("express")
const cors =require("cors")
const mongoose =require("mongoose")
var { graphqlHTTP } = require('express-graphql');
const bodyParser=require("body-parser")
const helmet = require("helmet");
// call dotenv 
require("dotenv").config()
const routeRoutes=require("./routes/user")
const ErrorPage=require("./util/errrorPage")
const chatRoutes=require("./routes/chats")
const Socket=require("./socket-io/socket")
const buildSchema=require("./graphql/Schema")
const resolver = require("./graphql/Resolver");



// initialise app
const app=express()


// convert request to json using express middleware
app.use(bodyParser.json())

// enable cors policy
app.use(cors())

// error middleware request
app.use((error,req,res,next)=>{
  console.log(error.message);
  const message=error.message
  const status=error.statusCode || 500 
  res.status(status).json({message})
})
app.post('/api/upload', (req, res, next) => {
  const form = formidable({ });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
});


// graphql endpoints
app.use('/graphql', graphqlHTTP({
  schema: buildSchema,
  rootValue: resolver,
  graphiql: true,
}));
app.use(helmet())


// api routes for user auth
app.use("/office-api/auth",routeRoutes)
app.use('/office-api',chatRoutes)
app.use(ErrorPage)


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

