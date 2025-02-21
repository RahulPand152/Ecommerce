import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import courseRoute from "./Routes/course.route.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import userRoute from "./Routes/user.route.js"
import adminRoute from "./Routes/admin.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
dotenv.config();
//middleware
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET", "POST", "PUT","DELET"],
    allowedHeaders: ["content-Type", "Authorization"],
    
}))



app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './public',
})
);
const port = process.env.PORT||4000

const DB_URI= process.env.MONGO_URI

try {
     await mongoose.connect(DB_URI)
    console.log("Connected to MongooseDB")

} catch (error) {
    console.log(error)
}



//defining routes\
 app.use("/api/v1/course", courseRoute)
 app.use("/api/v1/User", userRoute)
 app.use("/api/v1/admin",adminRoute)
 //cloudinary configuration code
 cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

