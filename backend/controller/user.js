const user = require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userSignUp=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        res.status(400).json({message:"Email and Password cannot be empty"})
    }
    let userName=await user.findOne({email})
    if(userName){
        return res.status(400).json({message:"Email already exists"})
    }
    const hashpwd=await bcrypt.hash(password,10)
    const newUser=await user.create({
        email,password:hashpwd
    })

    let token=jwt.sign({email,id:newUser._id},process.env.SECRET_KEY,{expiresIn:'1hr'})
    return res.status(200).json({token,user:newUser})

}

const userLogin=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        res.status(400).json({message:"Email and Password cannot be empty"})
    }
    let userName=await user.findOne({email})
    if(userName && await bcrypt.compare(password,userName.password)){
        let token=jwt.sign({email,id:userName._id},process.env.SECRET_KEY,{expiresIn:'1hr'})
        return res.status(200).json({token,user:userName})

    }
    else{
        return res.status(400).json({message:"Invalid Credentials"})
    }

}

const getUser=async(req,res)=>{
    const userName=await user.findById(req.params.id)
    if(userName){
        return res.status(200).json({email:userName.email})
    }
    else{
        return res.status(400).json({message:"No such user"})
    }

}


module.exports={userSignUp,userLogin,getUser}