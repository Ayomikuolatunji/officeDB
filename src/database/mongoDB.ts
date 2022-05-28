import mongoose from "mongoose"


type MongoDBType =string | undefined
const MONGODB_KEY:MongoDBType=process.env.MONGODB_KEY

interface connectTypes {}

const connectFunction=async()=>{
    if(MONGODB_KEY===undefined){
    console.log("mongoose key not set")
    }else{
        console.log('connected to the database')
        return await mongoose.connect(MONGODB_KEY,<connectTypes>{
        useNewUrlParser: true,
        useUnifiedTopology: true   
     })
    }

}


export default connectFunction