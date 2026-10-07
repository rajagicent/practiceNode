import { Router } from "express";
import { validateBody } from "../middleware/validateRequest.js";
import { validateHeader } from "../middleware/authMidddleware.js";


export const dashboardRoute =  Router()

dashboardRoute.get("/dashboard",validateHeader(["ADMIN"]), (req, res)=>{
    res.status(200).json({message: "you can access dashboard"})
})