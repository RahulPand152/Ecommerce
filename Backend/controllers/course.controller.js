import { Course } from "../Models/course.model.js"
import { v2 as cloudinary } from 'cloudinary';
import { purchase } from "../Models/purchase.model.js";


export const createCourse= async (req,res) =>{
    const adminId = req.adminId
    // console.log ("course created")
    // console.log(adminId)

//console.log(req.files);

    const{title, description,price}= req.body;
    
    try {
        if( !title || !description || !price){
            return res.status(400).json({errors:"All fields are required"})

        }
        
         const {image}= req.files
       
         if( !req.files || Object.keys(req.files).length ==0){
            return res.status(400).json({error: "No file upload"})

         }
         


         const allowedFormat=["image/png","image/jpg"]

         if(!allowedFormat.includes(image.mimetype)){
            return res.status(400).json({error: "Invalid file format. Only PNG and JPG are allowed"})

         }

         //cloudinary code

         const cloudResponse = await cloudinary.uploader.upload(image.tempFilePath)

         if(!cloudResponse || cloudResponse.error)
         {
            return res.status(400).json({errors:"Error uploading file to cloudinary"})
         }
        const courseData = {
            title,
            description,
            price,
            creatorId:adminId,
            image:{
                public_id:cloudResponse.public_id,
                url: cloudResponse.url
            },
            creatorId:adminId,
        };
          const Courseapp = await Course.create(courseData)
          console.log(Courseapp)
          res.json({
            message: "Course created successfully",
            Courseapp
          })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Error creating course"})
    }


//     // const title =req.body.title;
//     // const description =req.body.description;
//     // const price =req.body.price;
//     // const image =req.body.image;

   
 };

export const updateCourse = async(req,res) =>{
    const adminId = req.adminId
    const {courseId} = req.params;
    const {title, description,price,image} = req.body;
    try {
        const courseSearch = await Course.findById(courseId)
        if(!courseSearch){
            return res.status(404).json({errors: "course not found"})
        }
         const course = await Course.updateOne({
            _id:courseId,
            creatorId:adminId,
         },{
            title,
            description,
            price,
            image:{
                public_id:image?.public_id,
                url: image?.url
            }
         })
          res.status(201).json({message:"course update successfully", course})
    } catch (error) {
        res.status(500).json({error:"Error in course updating"})
        console.log("Error in course updating", error)
    }
};


export const deleteCourse = async(req,res) =>{
    const adminId = req.adminId

    const {courseId} = req.params;

    try {
        const course = await Course.findByIdAndDelete({
            _id:courseId,
            creatorId: adminId
        })

        if(!course){
            return res.status(404).json({errors:"Course not found"})
        }

        res.status(200).json({message:"course deleted successfully"})
        
    } catch (error) {
        res.status(500).json({errors:"error in course seleting"})
         console.log("Error in coursedeleting", course)    
    }

}


  export const  getCourse = async (req,res) =>{

     try {
        const courses = await Course.find({})
        res.status(201).json({courses})
        
     } catch (error) {
        res.status(500).json({errors:"Error is getting courses"})
        console.log("error to get courses". error)
     }
}

export const couresDetails = async (req,res) =>{
    const {courseId} = req.params;

    try {
        const course = await Course.findById(courseId)
        if(!course){
            res.status(404).json({errors:"Course not found"})
        }
        res.status(200).json({course})
        
    } catch (error) {
        res.status(500).json({errors:"Error in getting vourse details"})
       console.log("Error in course details", error) 
    }
}

export const buyCourse = async(req,res) => {
    console.log("But course list")
    const {userId} = req;
    const {courseId} = req.params;
    try {
        const course= await Course.findById(courseId)
        if(!course){
            return res.status(404).json({errors:"Course not found"})
        }
        const existingPurchase = await purchase.findOne({userId,courseId})
        if(existingPurchase){
            return res.status(400).json({errors:"User has already this course"})
        }

        const newPurchase =new purchase({userId,courseId})
        await newPurchase.save()
        res.status(201).json({message:"course purchased successfully", newPurchase})
        
    } catch (error) {
        return res.status(500).json({error:"Error in course buying"})
        console.log("Invalid token ar expired token:", error)
    }
}
