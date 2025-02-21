import { Router } from "express";
import { login, logout, signup } from "../controllers/admin.controller.js";




const adminRoute = Router()

adminRoute.post("/signup",signup)
adminRoute.post("/login", login)
adminRoute.get("/logout",logout)

export default adminRoute