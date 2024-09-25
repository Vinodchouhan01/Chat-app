import jwt from "jsonwebtoken"
import User from "../models/user.js";

const protectRoute = async (req , res , next) =>{
    try {
        const token = req.cookies.jwt ;
        if(!token){
            return res.status(400).json({error : "no token provided"})
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET) ;
        
        if(!decoded){
            return res.status(401).json({error : "invalid token "})
        }
        
        const user = await User.findById(decoded.userid).select("-password")  ;
        if(!user){
            return res.status(400).json({error : "there not any user "})
        }
        req.user = user ;
        next() ;
    } catch (error) {
        res.status(500).json({error : "error in middleware"})
    }
}

export default protectRoute ;