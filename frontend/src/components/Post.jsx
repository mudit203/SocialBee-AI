import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { FaRegHeart,FaRegBookmark } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { BsSend } from "react-icons/bs";
import CommentDialog from './CommentDialog'
import { useSearchParams } from 'react-router-dom'
function Post() {
    const [Text, setText] = useState("");
    const ChangeEventHandler=(e)=>{
        const InputText=e.target.value;
        if(InputText.trim()){
            setText(InputText);
        }
        else{
            setText("");
        }

    }
    const [Open, setOpen] = useState(false);
 
    return (


        <div className='my-8 w-full max-w-sm mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src="" alt="post_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1>username</h1>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent>
                        <Button variant='ghost' className='cursor-pointer text-[#ED4956] border-3 border-black w-50% mx-auto'>Unfollow</Button>
                        <Button variant='ghost' className='cursor-pointer  border-2 border-black w-50% mx-auto'>Add to favourites</Button>
                        <Button variant='ghost' className='cursor-pointer  border-2 border-black w-50% mx-auto'>Delete</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <img className='my-2 rounded-sm aspect-square object-cover' src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="Post" />
           
           <div className='flex justify-between'>
            <div className='flex gap-3'>
            <FaRegHeart size={'22px'} className='cursor-pointer'/>
            <FiMessageCircle size={'22px'} className='cursor-pointer' onClick={()=> setOpen(true)}/>
            <BsSend size={'22px'} className='cursor-pointer'/>
            </div>
            <div>
            <FaRegBookmark size={'22px'} className='cursor-pointer'/>
            </div>
           </div>
           <span className='font-medium font-bold my-2 block'>1k likes</span>
           <p>
            <span className='font-bold mr-3'>
                Username
            </span>
            Caption
           </p>
           <span onClick={()=> setOpen(true)}>View all comments</span>
           
            <CommentDialog Open={Open} setOpen={setOpen}/>
           
           
           <div className='flex justify-between'>
            <input 
            type="text" 
            className='outline-none'
            placeholder='Add a comment.....'
            value={Text}
            onChange={ChangeEventHandler} />
            
            {
                Text &&  <span className='text-[#3BADF8]'>Post</span>
            }
           </div>
        </div>

    )
}

export default Post
