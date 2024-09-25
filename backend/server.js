import express from "express";
import dotenv from "dotenv";
import cors from "cors" ;
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import messageRoute from "./routes/messageRoute.js" 
import userRoute from "./routes/userRoute.js" 

import database from "./db/connect.js";


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
console.log("port " , PORT)
//direct access method  
database();

app.use(cors())
app.use(express.json()); //to parse the incoming re. json . 
//It automatically converts the JSON data into a JavaScript object. Without this middleware, the JSON data would be received as a raw string and would need to be manually parsed.
app.use(cookieParser()) ;


//after start server create routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
})

app.listen(PORT , () => console.log(`Server is running on port ${PORT}`));
