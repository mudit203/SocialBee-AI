import express from "express";
import IsAuthenticated from "../middlewares/IsAuthenticated.js";
import upload from "../middlewares/multer.js";
import { getmessage, sendmessage } from "../controllers/message_controller.js";


const router=express.Router();
router.route('/send/:id').post(IsAuthenticated,sendmessage);
router.route('/all/:id').get(IsAuthenticated,getmessage);


export default router;