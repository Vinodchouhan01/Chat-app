import mongoose from "mongoose";
const database = async() => {
    try {
        await mongoose.connect(process.env.Mongo_URL) ;
        console.log("database connected") 
    } catch (error) {
        console.log("database not conected")
    }
}

export default database ;
