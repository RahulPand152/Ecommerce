import { Router } from "express";
import { login, logout, purchased, signup } from "../controllers/user.controller.js";
import userMiddleware from "../middleswares/user.mid.js";


const userRoute = Router()

userRoute.post("/signup",signup)
userRoute.post("/login", login)
userRoute.get("/logout",logout)
userRoute.get("/purchased",userMiddleware, purchased)

export default userRoute