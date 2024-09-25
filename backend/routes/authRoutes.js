
import express from "express";
import { login, logout, signup } from "../controllers/authcontroller.js";
const router = express.Router() ;

router.post("/signup" , signup ) ;
router.post("/login" , login ) ;
router.post("/logout" , logout ) ;
// router.get("/login" , ) ;

export default router ;