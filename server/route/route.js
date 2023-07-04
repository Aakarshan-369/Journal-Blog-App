import express from "express"
import { signupUser, loginUser} from '../controller/user-controller.js';
import { uploadImage, getImage } from "../controller/image-controller.js";
import upload from '../utils/upload.js'
import { createPost, getAllPosts, getPost } from "../controller/post-constroller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
const router = express.Router();

const cronJob = async (req, res) => {
    if(req){
        console.log("cron successful");
        return res.status(200).json({msg: 'Cron successful'});

    }
    
    
}


router.post('/signup', signupUser);
router.post('/login', loginUser );
router.post('/file/upload', upload.single('file'), uploadImage );
router.get('/file/:filename', getImage);
router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.get('/cron',cronJob) ;

export default router;