import express from "express";
import IsAuthenticated from "../middlewares/IsAuthenticated.js";
import upload from "../middlewares/multer.js";
import { AddComment, AddNewPost, BookmarkPost, deletepost, getallcomments, GetAllPosts, LikePosts, UnLikePosts } from "../controllers/post_controller.js";
const router = express.Router();

router.route('/addpost').post(IsAuthenticated,upload.single('image'),AddNewPost);
router.route('/all').get(IsAuthenticated,GetAllPosts);
router.route('/:id/like').get(IsAuthenticated,LikePosts);
router.route('/:id/unlike').get(IsAuthenticated,UnLikePosts);
router.route('/:id/comment').post(IsAuthenticated,AddComment);
router.route('/:id/comment/all').get(IsAuthenticated,getallcomments);
router.route('/delete/:id').delete(IsAuthenticated,deletepost);
router.route('/:id/bookmark').get(IsAuthenticated,BookmarkPost);

export default router;