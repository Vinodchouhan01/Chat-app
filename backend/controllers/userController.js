import User from "../models/user.js";

export const usersideBar = async ( req , res) => {
    try {
        const loggedInuser = req.user._id ;
        console.log(loggedInuser) ;
        const filteredUsers = await User.find({ _id: {$ne : loggedInuser}}).select("-password");
        
        res.status(200).json(filteredUsers) ;
      } catch (error) {
        res.status(500).json({error : "internal error in getting user for side bar"})
    }
}