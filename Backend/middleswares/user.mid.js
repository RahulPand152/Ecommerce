//validiation of token
import  config  from "../config.js";
import jwt from "jsonwebtoken"

function userMiddleware(req,res,next){
 console.log("usermiddleware")
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
        const decoded = jwt.decode(token, config.JWT_USER_PASSWORD);//veryfied
        //console.log("decoded",decoded);
        req.userId=decoded.id
        //console.log(num)
        next();
        
        
     } catch (error) {
        return res.status(401).json({errors:"Invaid and expired "});

        
     }

}

export default userMiddleware;