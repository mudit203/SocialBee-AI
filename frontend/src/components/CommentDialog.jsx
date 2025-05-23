import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import { setPosts, setselectedpost } from '@/redux/postSlice';
import axios from 'axios';
import { toast } from 'sonner';

function CommentDialog({ Open, setOpen }) {
  const [text, settext] = useState("");
  const { selectedpost,posts } = useSelector(store => store.post)
  const [comment, setcomment] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    setcomment(selectedpost?.comments || []);
  }, [selectedpost]);
  const changeEventHandler = (e) => {
    const inputtext = e.target.value;
    if (inputtext.trim()) {
      settext(inputtext);
    }
    else {
      settext("");
    }

  }
  const Sendcommenthandler = async () => {
    const res = await axios.post(`https://socialbee-ai.onrender.com/api/v1/post/${selectedpost._id}/comment`, { text }, {
      headers: {
          "Content-Type": 'application/json'
      },
      withCredentials: true
  })
  if (res.data.success) {
      try {
          const updatedcommentdata = [...comment, res.data.comment];
          setcomment(updatedcommentdata);
          const updatedpostdata = posts.map((p) => {
            return p._id === selectedpost._id ? { ...p, comments: updatedcommentdata } : p;
        })
      dispatch(setPosts(updatedpostdata));
          toast.success(res.data.message);
          settext("");
      } catch (error) {
          toast.error(error.response?.data?.message);
      }

  }
  }


  return (
    <Dialog open={Open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-5xl p-0 flex flex-col">
        <div className='flex flex-1'>
          <div className='w-1/2'>
            <img
              src={selectedpost?.image}
              alt="post_img"
              className='w-full h-full object-cover rounded-l-lg'
            />
          </div>
          <div className='w-1/2 flex flex-col justify-between'>
            <div className='flex items-center justify-between p-4'>
              <div className='flex gap-3 items-center'>
                <Link>
                  <Avatar>
                    <AvatarImage src={selectedpost?.author?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className='font-semibold text-xs'>{selectedpost?.author?.username}</Link>
                  <span className='text-gray-600 text-sm'>{selectedpost?.author?.bio}</span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className='cursor-pointer' />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className='cursor-pointer w-full text-[#ED4956] font-bold'>
                    Unfollow
                  </div>
                  <div className='cursor-pointer w-full'>
                    Add to favorites
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className='flex-1 overflow-y-auto max-h-96 p-4'>
              {comment.map((ccomment, index) => (
                <Comment key={ccomment._id} comment={ccomment} />
              ))}
            </div>
            <div className='p-4'>
              <div className='flex items-center gap-2'>
                <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment...' className='w-full outline-none border text-sm border-gray-300 p-2 rounded' />
                <Button onClick={Sendcommenthandler} variant="outline">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentDialog