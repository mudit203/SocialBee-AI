import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { setAuthUser } from '@/redux/authSlice';
import axios from 'axios';
import { Loader } from 'lucide-react';


function EditProfile() {
  const { user } = useSelector(store => store.auth);
  
  const img = useRef();
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    profilePhoto:user?.profilePicture,
    bio:user?.bio,
    gender:user?.gender
  })
  const [Loading, setLoading] = useState(false)
  const filechangehandler=(e)=>{
    const file=e.target.files[0];
    if(file){
      setdata({...data,profilePhoto:file});
    }
  }
  const changeselecthandler=(value)=>{
    setdata({...data,gender:value})
  }
  const editprofilehandler= async ()=>{
    const formdata=new FormData();
    formdata.append("bio",data.bio)
    formdata.append("gender",data?.gender);
    if(data.profilePhoto){
    formdata.append("profilePicture",data.profilePhoto);
    }
   
    try {
      setLoading(true);
      
      const res= await axios.post('http://localhost:8000/api/v1/user/profile/edit',formdata,{
        headers:{
          'Content-type':'multipart/form-data'
        },
        withCredentials:true
      })
      if(res.data.success){
        const updateduserdata={
          ...user,
          profilePicture:res.data.user?.profilePicture,
          gender:res.data?.user?.gender,
          bio:res.data.user?.bio,
        }
     dispatch(setAuthUser(updateduserdata));
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.res.data.message);
    }
   setLoading(false)
  }
  return (
    <div className='font-bold text-2xl mx-auto pl-20 max-w-2xl'>
      <section className='flex flex-col gap-6 w-full my-8' >
        <h1 >
          Edit profile
        </h1>
        <div className='flex items-center gap-2 bg-gray-100 rounded-xl p-5 justify-between'>
          <div className='flex items-center gap-5'>
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="post_image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
              <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
            </div>
          </div>
          <input type="file" className='hidden' ref={img} onChange={filechangehandler} />
          <Button onClick={() => img.current.click()} className='bg-[#0095F6] hover:bg-blue-600 cursor-pointer'>Channge pfp</Button>
        </div>
        <div>
          <h1 className='font-bold text-xl mb-2'>Bio</h1>
          <Textarea value={data.bio} onChange={(e)=>setdata({...data,bio:e.target.value})} className='focus-visible:ring-transparent' />
        </div>
        <div>
          <h1 className='font-bold text-xl mb-2'>Gender</h1>
          <Select defaultValue={data.gender} onValueChange={(value)=>changeselecthandler(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

        </div>
        <div className='flex w-full justify-end'>
          {
            Loading? (<div className='animate-spin'><Loader/></div>):( <Button onClick={editprofilehandler} className='bg-[#0095F6] hover:bg-blue-600 cursor-pointer w-fit'>Submit</Button>)
          }
         
        </div>
      </section>
    </div>
  )
}

export default EditProfile
