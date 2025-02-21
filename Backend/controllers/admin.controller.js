import { Admin } from "../Models/admin.model.js";

import bcrypt from "bcryptjs"
import z from "zod";
import jwt from "jsonwebtoken"
import  config  from "../config.js";


export  const signup = async(req,res)=>{
 try {
    
    const {firstName,lastName,email,password} = req.body;

    const adminSchema = z.object({
        firstName: z.string().min(3,{ message:"firstName must be atleast 3 char long"}),
        lastName: z.string().min(3,{ message:"lastName must be atleast 3 char long"}),
        email:z.string().email(),
        password:z.string().min(6,{ message:"password must be atleast 3 char long"})
    })

    const validiation= adminSchema.safeParse(req.body)

    if(!validiation.success){
        return res.status(400).json({errors:validiation.error.issues.map(err => err.message)})
    }

    const hashPassword = await bcrypt.hash(password, 10)


 const existingAdmin = await Admin.findOne({email: email})
 if(existingAdmin){
    return res.status(400).json({error: "User already exits"})
 }

 const newAdmin = new Admin({firstName,lastName,email,password:hashPassword});
 await newAdmin.save();
 res.status(201).json({ message:"signup succedded" ,newAdmin})
 
 } catch (error) {
    res.status(500).json({errors: "Error in signup"});
    console.log("error in signup", error)
 }
};


export const login = async(req,res) =>{

   const {email, password} =req.body;

   try {
      const admin = await Admin.findOne({email:email});
      const isPasswordCorrect = await bcrypt.compare(password, admin.password);

      if(!admin || !isPasswordCorrect){
         res.status(403).json({errors:"Invalid credentials"})
      }

      //jwt code
      const token = jwt.sign(
         {
         id: admin._id,
      
      },config.JWT_ADMIN_PASSWORD,
   {expiresIn:"1d"});
   const cookieOptions={
      expires: new Date(Date.now()+24*60*60*1000),//1day
      httpOnly:true, //can't be accsed via js directly
      secure: process.env.NODE_ENV =="production",//true for https only
      sameSite:"Strict"//CSRF ATTACKS
   }
      
      res.cookie("jwt", token, cookieOptions)

      res.status(201).json({message:"Login successfully",admin, token})
      
   } catch (error) {
      res.status(500).json({errors:"Error in login"})
      console.log("error in login", error)
   }
}

export const logout=(req,res)=>{
   try {
    if(!req.cookies.jwt){
        return res.status(401).json({error: "Kindly login first"});
    }
      res.clearCookie("jwt");
   res.status(200).json({message:"Logged out successfuly"})
   } catch (error) {
      res.status(500).json({errors:"Error in logout"})
      console.log("Error in logout", error)
   }
}