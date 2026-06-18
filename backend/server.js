const express=require("express")
const app=express()
const dotenv=require("dotenv").config()
const cors=require("cors")
const PORT=process.env.PORT || 3000
const connectDb=require("./config/connectionDB")
connectDb()
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://food-blog-bni7prwxk-sparky-lol-007.vercel.app"
  ],
  credentials: true
}))
app.use(express.static("public"))
app.use(express.json())
app.use("/",require("./routes/user"))
app.use("/recipe",require("./routes/recipe"))

app.listen(PORT,(err)=>{
    console.log(`app is listening on port ${PORT}`)
})
