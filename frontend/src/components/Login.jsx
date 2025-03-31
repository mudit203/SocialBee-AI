import React,{useState} from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';



const Login = () => {
  const [Loading, setLoading] = useState(false);
    const [input, setinput] = useState({
        email:"",
        password:""
    })
    const ChangeEventHandler=(e)=>{
        setinput({...input,[e.target.name]:e.target.value});
    }
    const emptyinput= ()=>{
        setinput({...input,username:"",email:"",password:""});
      }
      const navigate=useNavigate();
    const LoginHandler=async (e)=>{
        e.preventDefault();
     try {
      setLoading(true);
        const res= await axios.post("http://localhost:8000/api/v1/user/login",input,{
            headers: { "Content-Type": "application/json" },
            withCredentials:true
        })
        if(res.data.success){
            navigate("/");
            toast.success(res.data.message);
            
        }
        else{
            toast.error(res.data.message);

        }
       
        }
     catch (error) {
        if(error.response && error.response.data && error.response.data.message){
            toast.error(error.response.data.message);
        }
        emptyinput();
      }
     finally{
      setLoading(false);
     }
    }
  return (
    <div>
       <div className='flex items-center justify-center h-screen w-screen'>
      <form action="" onSubmit={LoginHandler} className='shadow-lg p-10 flex flex-col gap-5 m-auto'>
        <div>
        <h1 className='text-center font-bold text-2xl'>Login</h1>
       
       </div>

       <div>
        <span className='font-bold'>Email</span>
        <Input
         type="text"
         name="email"
         value={input.email}
         onChange={ChangeEventHandler}
         placeholder="Enter your Email"/>
       </div>
       <div>
        <span className='font-bold'>Password</span>
        <Input 
         type="text"
         name="password"
         value={input.password}
         onChange={ChangeEventHandler}
         placeholder="Enter your Password"/>
        <div className='my-4'>
          
          {
            Loading?(<Button className="w-full">
              <Loader2 className='mr2 animate-spin'/>
            </Button>):(<Button type='submit' className="w-full">Login</Button>)
          }
          
        
        </div>
       </div>
       <span className='mt-0'>Dont Have an account?<Link className='text-blue-600' to="/signup">Signup</Link></span>
      </form>
    </div>
    </div>
  )
}

export default Login
