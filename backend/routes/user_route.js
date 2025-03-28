import express from "express";
import { editprofile, followOrUnfollow, getprofile, getsuggestedUsers, login, logout, register } from "../controllers/user_controller.js";
import IsAuthenticated from "../middlewares/IsAuthenticated.js";
import upload from "../middlewares/multer.js";


const router=express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(IsAuthenticated,getprofile);
router.route('/profile/edit').post(IsAuthenticated,upload.single('profilePicture'),editprofile);
router.route('/suggested').get(IsAuthenticated,getsuggestedUsers);
router.route('/followOrUnfollow/:id').post(IsAuthenticated,followOrUnfollow);

export default router;