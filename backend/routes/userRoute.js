import  express  from 'express';
import { usersideBar } from '../controllers/userController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router() ;

router.get("/" , protectRoute , usersideBar) ;

export default router ;
