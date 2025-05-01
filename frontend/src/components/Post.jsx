import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { BsSend } from "react-icons/bs";
import CommentDialog from './CommentDialog'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts, setselectedpost } from '@/redux/postSlice'
function Post({ post }) {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post)
    const [text, setText] = useState("");
    const [liked, setliked] = useState(post.likes.includes(user?._id) || false)
    const [Comment, setComment] = useState(post.comments)
    const [postliked, setpostliked] = useState(post.likes.length);
    const ChangeEventHandler = (e) => {
        const InputText = e.target.value;
        if (InputText.trim()) {
            setText(InputText);
        }
        else {
            setText("");
        }

    }
    const [Open, setOpen] = useState(false);
    const deleteposthandler = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post._id}`, {
                withCredentials: true,
            });
            if (response.data.success) {
                dispatch(setPosts(posts.filter((p) => p._id !== post._id)));
                toast.success(response.data.message);
            }

        } catch (error) {
            toast.error(error.response.data.message);
        }

    };
    const likeposthandler = async () => {
        try {
            const action = liked ? 'unlike' : 'like'
            const response = await axios.get(`http://localhost:8000/api/v1/post/${post._id}/${action}`, {
                withCredentials: true
            });
            console.log(response.data);
            if (response.data.success) {
                const updatedlikes = liked ? postliked - 1 : postliked + 1;
                setpostliked(updatedlikes);
                setliked(!liked);
                const updatedpostdata = posts.map((p) => {
                    return p._id === post._id ? {
                        ...p,
                        likes: liked ? p.likes.filter((id) => id !== user._id) : [...p.likes, user._id]
                    } : p
                })
                dispatch(setPosts(updatedpostdata));
                toast.success(response.data.message);
            }


        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const commenthandler = async () => {
        const res = await axios.post(`http://localhost:8000/api/v1/post/${post._id}/comment`, { text }, {
            headers: {
                "Content-Type": 'application/json'
            },
            withCredentials: true
        })
        if (res.data.success) {
            try {
                const updatedcommentdata = [...Comment, res.data.comment];
                setComment(updatedcommentdata);
                const updatedpostdata = posts.map((p) => {
                    return p._id === post._id ? { ...p, comments: updatedcommentdata } : p;
                })
                dispatch(setPosts(updatedpostdata));

                toast.success(res.data.message);
                setText("");
            } catch (error) {
                toast.error(error.response.data.message);
            }

        }


    }

    return (


        <div className='my-8 w-full max-w-sm mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src={post?.author?.profilePicture} alt="post_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1>{post?.author?.username}</h1>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent>
                        <Button variant='ghost' className='cursor-pointer text-[#ED4956] border-3 border-black w-50% mx-auto'>Unfollow</Button>
                        <Button variant='ghost' className='cursor-pointer  border-2 border-black w-50% mx-auto'>Add to favourites</Button>
                        {
                            post.author?._id == user._id && <Button onClick={deleteposthandler} variant='ghost' className='cursor-pointer  border-2 border-black w-50% mx-auto'>Delete</Button>
                        }

                    </DialogContent>
                </Dialog>
            </div>
            <img className='my-2 rounded-sm aspect-square object-cover' src={post.image} alt="Post" />

            <div className='flex justify-between'>
                <div className='flex gap-3'>
                    {liked ? (<FaHeart size={'22px'} className='cursor-pointer text-red-500' onClick={likeposthandler} />) : (<FaRegHeart size={'22px'} className='cursor-pointer' onClick={likeposthandler} />)}
                    <FiMessageCircle size={'22px'} className='cursor-pointer' onClick={() => {
                        dispatch(setselectedpost(post));
                        setOpen(true);
                    }} />
                    <BsSend size={'22px'} className='cursor-pointer' />
                </div>
                <div>
                    <FaRegBookmark size={'22px'} className='cursor-pointer' />
                </div>
            </div>
            <span className='font-bold my-2 block'>{postliked} likes</span>
            <p>
                <span className='font-bold mr-3'>
                    {post.author?.username}
                </span>
                {post.caption}
            </p>
            <span onClick={() => {
                dispatch(setselectedpost(post));
                setOpen(true);
            }}>View all {Comment.length} comments</span>

            <CommentDialog Open={Open} setOpen={setOpen} />


            <div className='flex justify-between'>
                <input
                    type="text"
                    className='outline-none'
                    placeholder='Add a comment.....'
                    value={text}
                    onChange={ChangeEventHandler} />

                {
                    text && <span onClick={commenthandler} className='text-[#3BADF8] cursor-pointer'>Post</span>
                }
            </div>
        </div>

    )
}

export default Post
