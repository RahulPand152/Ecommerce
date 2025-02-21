import { user } from "../Models/user.model.js";
import bcrypt from "bcryptjs"
import z from "zod";
import jwt from "jsonwebtoken"
import  config  from "../config.js";
import { purchase } from "../Models/purchase.model.js";
import { Course } from "../Models/course.model.js";

export  const signup = async(req,res)=>{
 try {
    
    const {firstName,lastName,email,password} = req.body;

    const userSchema = z.object({
        firstName: z.string().min(3,{ message:"firstName must be atleast 3 char long"}),
        lastName: z.string().min(3,{ message:"lastName must be atleast 3 char long"}),
        email:z.string().email(),
        password:z.string().min(6,{ message:"password must be atleast 3 char long"})
    })

    const validiation= userSchema.safeParse(req.body)

    if(!validiation.success){
        return res.status(400).json({errors:validiation.error.issues.map(err => err.message)})
    }

    const hashPassword = await bcrypt.hash(password, 10)


 const existingUser = await user.findOne({email: email})
 if(existingUser){
    return res.status(400).json({errors: "User already exits"})
 }

 const newUser = new user({firstName,lastName,email,password:hashPassword});
 await newUser.save();
 res.status(201).json({ message:"signup succedded" ,newUser})
 
 } catch (error) {
    res.status(500).json({errors: "Error in signup"});
    console.log("error in signup", error)
 }
};


export const login = async(req,res) =>{

   const {email, password} =req.body;

   try {
      const User = await user.findOne({email:email});
      const isPasswordCorrect = await bcrypt.compare(password, User.password);

      if(!User || !isPasswordCorrect){
         res.status(403).json({errors:"Invalid credentials"})
      }

      //jwt code
      const token = jwt.sign(
         {
         id: User._id,
      
      },config.JWT_USER_PASSWORD,
   {expiresIn:"1d"});
   // const cookieOptions={
   //    expires: new Date(Date.now()+24*60*60*1000),//1day
   //    httpOnly:true, //can't be accsed via js directly
   //    secure: process.env.NODE_ENV =="production",//true for https only
   //    sameSite:"Strict"//CSRF ATTACKS
   // }
      
      res.cookie("jwt", token, 
         {
            expires: new Date(Date.now()+24*60*60*1000),//1day
            httpOnly:true, //can't be accsed via js directly
            secure: process.env.NODE_ENV =="production",//true for https only
            sameSite:"Strict"//CSRF ATTACKS
      });

      res.status(201).json({message:"Login successfully",User, token})
      
   } catch (error) {
      res.status(500).json({errors:"Error in login"})
      console.log("error in login", error)
   }
}

export const logout=(req,res)=>{
   try {
      // if(!req.cookies.jwt){
      //    console.log(req.cookies.jwt)
      //       return res.status(401).json({error: "Kindly login first"});
            
      //   }
      res.clearCookie("jwt",
         {
         httpOnly :true,
         sameSite :"Strict"
         }

      );
   res.status(200).json({message:"Logged out successfuly"})
   } catch (error) {
      res.status(500).json({errors:"Error in logout"})
      console.log("Error in logout", error)
   }
}

export const purchased = async(req,res) =>{
   const {userId} = req.userId;

   try {
      const purchasee = await purchase.find({userId})
      let purchasedCourse =[]
      for(let i=0;i<purchasee.length; i++)
      {
         purchasedCourse.push(purchasee[i].courseId)

         
      }
      const courseData = await Course.find({
         _id:{$in:purchasedCourse}
      })
      res.status(200).json({purchasee, courseData})
   } catch (error) {
      res.status(500).json({errors:"Error in purchases"})
      console.log("Error is purchase", error)
   }
}



