
//validiation of token
import  config  from "../config.js";
import jwt from "jsonwebtoken"

function adminMiddleware (req,res,next){
console.log("adminmiddleware");



     const authHeader=req.headers.authorization;
 //console.log("Authorixed",authHeader)
 //console.log(req.headers)
   //console.log(authHeader)
     if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({errors: "No token provided"});
     }

     const token = authHeader.split(" ")[1];
     //console.log("Token",token)
     
     try {
        const decoded = jwt.verify(token, config.JWT_ADMIN_PASSWORD);//veryfied
        console.log("decoded",decoded);
        console.log("Rahul Pandit")
        req.adminId=decoded.id
       
        next();
        
        
     } catch (error) {
        return res.status(401).json({errors:"Invaid and expired "});

        
     }

}

export default adminMiddleware;