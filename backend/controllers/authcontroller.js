import User from "../models/user.js";
import bcrypt from 'bcryptjs' ;
import generateTokenAndSet from "../utils/generateToken.js";
export const signup = async (req , res) =>{
   try {
    const {fullName , userName , password , confirmPassword , gender} = req.body ;
    if( password !==  confirmPassword){
        return res.status(400).json({error:"Password do not match"}) 
    }

    const user = await User.findOne({userName}) ;
    
    if(user){
        return res.status(400).json({error:"user is already present"}) ;
    }
    const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
    const girlProfilepic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

    const hashedPassword = await bcrypt.hash(password , 5);
    const newuser = new User({
        fullName ,
        userName,
        password : hashedPassword,
        gender,
        profilePic : gender === "male" ? boyProfilepic : girlProfilepic 
    })
    
    if(newuser){
        generateTokenAndSet(newuser._id , res)  ;
        await newuser.save() ;
        res.status(200).json({
            _id : newuser._id ,
            fullName:newuser.fullName,
            userName : newuser.userName 
        });
    }

   } catch (error) {
    console.log("error in sighup controller") ;
    return res.status(500).json({error : "internal error"})  ;
   }
    // https://avatar.iran.liara.run/public/boy?username=${username}
}

export const login = async (req , res) => {
    try {
        const {userName , password} = req.body ;
        const user =  await User.findOne({userName}) ;
        // console.log( "user is here : " , user , password ) ;

        const ispasswordCorrect =  await bcrypt.compare(password , user.password || "") ;
        if(!user || !ispasswordCorrect){
            return res.status(400).json({error : "Invalid username or password"}) ;
        }
        generateTokenAndSet(user._id , res)  ;
        
        res.status(200).json({
            _id : user._id ,
            fullName:user.fullName,
            userName : user.userName 
        });

    } catch (error) {
        res.status(500).json({error : "Internal Server Error"}) ;
    }
}

export const logout = async (req , res) => {
    try {
        res.cookie("jwt" , "" , {maxAge:0}) ;
        res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        console.log( "user is here : " , req.cookie ) ;
        res.status(500).json({error : "internal server error"})
    } 
}