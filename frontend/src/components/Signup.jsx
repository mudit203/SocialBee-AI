import React, { useState } from 'react'
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';



const Signup = () => {
   const navigate=useNavigate();
  const [input, setinput] = useState({
    username:"",
    email:"",
    password:""
  });
  const changeEventHandler=(e)=>{
   setinput({...input,[e.target.name]:e.target.value});

  }
  const emptyinput= ()=>{
    setinput({...input,username:"",email:"",password:""});
  }
  const [Loading, setLoading] = useState(false)
  
 const signupHandler= async (e)=>{
   e.preventDefault();
   
   try {
      setLoading(true)
    const res=await axios.post('https://socialbee-ai.onrender.com/api/v1/user/register',input,{
      headers:{'Content-Type':'application/json'},
      withCredentials:true
    });
    if(res.data.success){
      navigate("/login");
      console.log("Success response received, clearing input fields...");
      toast.success(res.data.message);
      emptyinput();
     }
    else{
      console.log(res.data.message);
    }
    
      
   } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
    console.log(error.response); 
  
   } finally{
    setLoading(false);
   }
 }



  return (

    <div className='flex items-center justify-center h-screen w-screen'>
      <form onSubmit={signupHandler} action="" className='shadow-lg p-10 flex flex-col gap-3 m-auto'>
        <div>
        <h1 className='text-center font-bold text-2xl'>logo</h1>
        <p className='text-center'>signup to see photos and videos</p>
       </div>
       <div>
        <span className='font-bold'>Username</span>
        <Input
        type="text"
        name="username"
        value={input.username}
        onChange={changeEventHandler}
        placeholder="Enter your username" />
        
       </div>
       <div>
        <span className='font-bold'>Email</span>
        <Input
         type="text"
         name="email"
         value={input.email}
         onChange={changeEventHandler}
         placeholder="Enter your Email"/>

       </div>
       <div>
        <span className='font-bold'>Password</span>
        <Input 
         type="password"
         name="password"
         value={input.password}
         onChange={changeEventHandler}
         placeholder="Enter your Password"/>

        <div className='my-4'>
        <Button type='submit' className="w-full">Signup</Button>

        </div>
       </div>
       <span className='mt-0'>Already Have an account?<Link className='text-blue-600' to="/login">Login</Link></span>
      </form>
      
    </div>
  )
}

export default Signup;
