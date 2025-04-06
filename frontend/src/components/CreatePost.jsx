import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { readFileAsDataURL } from '@/lib/utils';
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

function CreatePost({open,func}) {
  const [caption, setcaption] = useState("")
  const Imageref=useRef();
  const [loader, setloader] = useState(false)
  const [imagepreview, setimagepreview] = useState("");
  const [file, setfile] = useState("")
   
  const changeimagehandler=async (e)=>{
       const file=e.target.files?.[0];
       if(file){
        setfile(file);
        const url = await readFileAsDataURL(file);
        setimagepreview(url);
       }
       
  }

  
  
     
 const Changehandler=(e)=>{
  const inputcaption=e.target.value;
       if(inputcaption.trim()){
        setcaption(inputcaption);
       }
       else{
        setcaption("");
       }
       

 }
 const CreatePostHandler=async ()=>{
  
   const formData=new FormData();
   formData.append("caption",caption);
   if(imagepreview) formData.append("image",file);
   setloader(true)
   try {
    const res= await axios.post("http://localhost:8000/api/v1/post/addpost",formData,{
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials:true
  });
   if(res.data.success){
    toast.success(res.data.message)
   }
   } catch (error) {
    toast.error(error.response.data.message);
   }
   finally{
    setloader(false);
   }
  
 }
  return (
    <div>
 
  <Dialog open={open}  >
  <DialogContent onInteractOutside={() => func(false)}>
    <DialogHeader className="text-center font-semibold">Create a post</DialogHeader>
    <div className='flex gap-3 items-center'>
      <Avatar>
        <AvatarImage src="" alt="img"/>
        <AvatarFallback>CN</AvatarFallback>

      </Avatar>
      <div className=''>
        <h1 className='font-bold'> username</h1>
        <span  className=''>bio</span>
      </div>
    
    </div>
    <Textarea value={caption} placeholder="write a caption..." onChange={Changehandler}/>
    <input ref={Imageref}  type="file" className='hidden'  onChange={changeimagehandler} />

    {
    imagepreview &&  (<div>
   <img src={imagepreview} alt="kaint" />
    </div>)
    }
    <Button onClick={()=>Imageref.current.click()}>Select from device</Button>

    
      { loader? (<div className='w-full flex items-center justify-center'><Loader2 className='animate-spin'/></div>):(<Button onClick={CreatePostHandler}>Post</Button>)}
  </DialogContent>
</Dialog>
    </div>
  )
}

export default CreatePost
