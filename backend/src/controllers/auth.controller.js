//  import { Profiler } from "react"
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
 import bcrypt from 'bcryptjs'
 import cloud from "../lib/cloudinary.js"
 const signup= async (req,res)=>{
    const {fullName, email,password}=req.body
    try{ 
        //hash passwords
        if(!password || !email || !fullName)
        {
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length< 6)
        {
            return res.status(400).json({message:"Password must be at least 6 chars"})
        }
        const user= await User.findOne({email})
        if(user)
            return res.status(400).json({message:"User already Exists"})
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password, salt)
        const newUser=new User({password:hashedPassword,email,fullName})
        if(newUser)
        {
generateToken(newUser._id, res) 
await newUser.save()
res.status(201).json({
    _id:newUser._id,
    fullName:newUser.fullName,
    email:newUser.email,
    profilePic:newUser.profilePic,
})
        }
else{
    res.status(400).json({message:"Invalid user data"})
}

    }catch(err){
console.log("Error in signUp controller")
res.status(500).json({message:"Internal server Error"})
    }
}
const login=async (req,res)=>{
    const {email,password}=req.body
    try{ 
        const user=await User.findOne({email

        })
        if(!user){
            return res.status(400).json({
                message:"Invalid email"
            })
         
        }
        const isPasswordCorrect=   await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid password"})
        }
        generateToken(user._id, res)
        res.status(200).json({_id:user._id,
            fullName:user.fullName,
    email:user.email,
    profilePic:user.profilePic

        })


    }catch(error){
        console.log(error.message)
        res.status(500).json({message:"Internal Server Error"})

    }
}
const logout=(req,res)=>{
    try{
        res.cookie("jwt", "",{maxAge:0})
        res.status(200).json({message:"Logged Out succesfully"})
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}
const updateProfile=async (req,res)=>{
    try{
                console.log("Update profile route hit");
                 console.log("✅ User from middleware:", req.user);
        console.log("✅ Body received:", req.body);


const {profilePic}=req.body
   const userId=req.user._id
   if(!profilePic)
   {
    return res.status(400).json({
        message:"Profile Pic is Required"
    })
   } 
           console.log("Uploading to Cloudinary...");

  const uploadResponse= await cloud.uploader.upload(profilePic)
          console.log("Cloudinary response:", uploadResponse);

  const updateUser= await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url},{new:true})
  return res.status(200).json(updateUser)
        //   console.error("Error in updateProfile:", error);

    }catch(error){
                console.error("Error in updateProfile:", error);

        return res.status(500).json( {message:error.message})
    }
    

}
const checkAuth=(req, res)=>{
    try{
        res.status(200).json(req.user)

    }catch(error){
        console.log("Error in CheckAuth controller", error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export {signup, login, logout,updateProfile,checkAuth}