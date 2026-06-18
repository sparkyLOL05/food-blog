const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const connectDb=async()=>{
    mongoose.connect(process.env.CONNECTION_STRING)
    console.log("db connected....")
}

module.exports=connectDb