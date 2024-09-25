import express from "express" ;
import { sendmessage , getMessage } from './../controllers/messagecontroller.js';

import protectRoute from './../middleware/protectRoute.js'
const router = express.Router() ;

router.post("/send/:id" , protectRoute , sendmessage)
router.get("/get/:id" , protectRoute , getMessage) ;

export default router ;