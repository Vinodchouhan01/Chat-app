import jwt from "jsonwebtoken" ;
const generateTokenAndSet = (userid , res) => {
    const token = jwt.sign({userid} , process.env.JWT_SECRET , {
        expiresIn: '15d'
    })
     res.cookie("jwt" , token , {
        maxage : 15*24*60*60*1000   ,
        httpOnly : true ,
        secure : true 
     })

}

export default generateTokenAndSet ;