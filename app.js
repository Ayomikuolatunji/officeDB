const express=require("express")
const cors =require("cors")
const mongoose =require("mongoose")
// call dotenv 
require("dotenv").config()
const router=require("./routes/user")
const ErrorPage=require("./controllers/errrorPage")



// initialise app
const app=express()


// convert request to json using express middleware
app.use(express.json())

// enable cors policy
app.use(cors())

// error middleware request
app.use((error,req,res,next)=>{
  console.log(error.message);
  const message=error.message
  const status=error.statusCode || 500 
  res.status(status).json({message})
})

// api routes for user auth

app.use("/office-api/auth",router)
app.use(ErrorPage)

// connecting server
mongoose
  .connect(process.env.MONGODB_KEY,{
         useNewUrlParser: true,
         useUnifiedTopology: true 
  }
  )
  .then(Db=>{
      console.log("connected to database")
  })
  .then(result => {      
    const server=app.listen(process.env.PORT,()=>{
        console.log(`App running locally on ${process.env.PORT}`)
    })
  })
  .catch(err => {
    console.log(err.message);
  });
