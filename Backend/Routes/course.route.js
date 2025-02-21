import { Router } from "express";
import { buyCourse, couresDetails, createCourse, deleteCourse, getCourse, updateCourse } from "../controllers/course.controller.js";
import userMiddleware from "../middleswares/user.mid.js";
import adminMiddleware from "../middleswares/admin.mid.js";

const courseRoute = Router()

courseRoute.post("/create",adminMiddleware, createCourse)
courseRoute.put("/update/:courseId",adminMiddleware, updateCourse)
courseRoute.delete("/delete/:courseId",adminMiddleware, deleteCourse)

courseRoute.get("/courses", getCourse)
courseRoute.get("/:courseId", couresDetails)

courseRoute.post("/buy/:courseId",userMiddleware, buyCourse)


export default courseRoute;