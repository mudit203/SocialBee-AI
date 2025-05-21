import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { readFileAsDataURL } from '@/lib/utils';
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';
import { GoogleGenerativeAI } from '@google/generative-ai';


function CreatePost({open,func}) {
  const [caption, setcaption] = useState("")
  const [airesponse, setairesponse] = useState("")
  const [ailoader, setailoader] = useState(false)
  const Imageref=useRef();
  const [loader, setloader] = useState(false)
  const [imagepreview, setimagepreview] = useState("");
  const apiKey = import.meta.env.VITE_GEMINI_API;
  const [file, setfile] = useState("")
  const{posts}=useSelector(store=>store.post);
  const dispatch = useDispatch();
  const changeimagehandler=async (e)=>{
       const file=e.target.files?.[0];
       if(file){
        setfile(file);
        const url = await readFileAsDataURL(file);
        setimagepreview(url);
         setcaption("");      
        setairesponse("");
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
    dispatch(setPosts([res.data.post,...posts]));
    toast.success(res.data.message)
   }
   } catch (error) {
    toast.error(error.response.data.message);
   }
   finally{
    setloader(false);
   }
  
 }
 
const getDataUri = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};
 const generativeaihandler = async () => {
  if (!file) {
    toast.error("Please select an image first!");
    return;
  }
  setailoader(true);
  try {
    // // Read image as base64

    // const reader = new FileReader();
    
    //   const base64Image = reader.result.split(',')[1];
   const base64Image=await getDataUri(file)
   const kk = base64Image.split(',')[1];
      // Initialize Gemini
      const genAI = new GoogleGenerativeAI(apiKey); // Replace with your API key
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Prepare the prompt and image
      const prompt = "Generate a short, catchy caption for this image.Do not write heading like here is the caption,just give the required caption thats it give it a sort of a description of the image,generate new and different caption when the same image is given again.No headings,just one caption single lined is needed";
      const imagePart = {
        inlineData: {
          data: kk,
          mimeType: file.type,
        },
      };

     
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const generatedCaption = response.text();
     
      setairesponse(generatedCaption);
      toast.success("Caption generated!");
      setailoader(false);
  
    // reader.readAsDataURL(file);
  } catch (error) {
    toast.error("Failed to generate caption.");
    setailoader(false);
  }
};


  return (
    <div>
 
  <Dialog open={open}  >
  <DialogContent onInteractOutside={() => func(false)} className="max-h-[90vh] overflow-auto">
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
    <Textarea value={caption} placeholder={airesponse} onChange={Changehandler}/>
    <input ref={Imageref}  type="file" className='hidden'  onChange={changeimagehandler} />

    {
    imagepreview &&  (<div>
   <img className='h-80 w-100' src={imagepreview} alt="kaint" />
    </div>)
    }
    <Button onClick={()=>Imageref.current.click()}>Select from device</Button>

    
      { loader? (<div className='w-full flex items-center justify-center'><Loader2 className='animate-spin'/></div>):(<Button onClick={CreatePostHandler}>Post</Button>)}
      {ailoader?(<div className='w-full flex items-center justify-center'><Loader2 className='animate-spin'/></div>):(<Button onClick={generativeaihandler}>Generate AI Caption</Button>)}
      {ailoader?(<div></div>):(<Button onClick={()=>setcaption(airesponse)}>Accept Ai response</Button>)}
  </DialogContent>
</Dialog>
    </div>
  )
}

export default CreatePost
