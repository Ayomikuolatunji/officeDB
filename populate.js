const express=require("express")
const mongoose =require("mongoose")
const app=express()

const Industry=require("./models/industry")
const industries=require("./data.json")


require("dotenv").config()// connecting server
const startConnection=(KEY)=>{
  mongoose
  .connect(KEY,{
         useNewUrlParser: true,
         useUnifiedTopology: true 
  })
  .then(Db=>{
      console.log("connected to database")
       app.listen(5000,()=>{
        console.log(`App running locally on ${5000}`)

    })
    Industry.create(industries)
    .catch(err=>console.log(err))
    process.exit(0)

  })
  .catch(err => {
    console.log(err.message);
    process.exit(1)
  });
}

startConnection(process.env.MONGODB_KEY)