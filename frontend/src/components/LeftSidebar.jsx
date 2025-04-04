
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LeftSidebar = () => {
    const {user}=useSelector(store=>store.auth)
    console.log("Redux User:", user);
    const navigate=useNavigate();
    const Logouthandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout',{}, {
              
                withCredentials: true
            })
            if (res.data.success) {
                
                navigate('/login');
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
const Sidebarhandler=(item)=>{
    if(item.text=="Logout"){
        Logouthandler();
    }
}

const Sidebarobjects = [
    {
        icon: <Home />,
        text: "home"
    },
    {
        icon: <Search />,
        text: "Search"
    },
    {
        icon: <TrendingUp />,
        text: "Trending"
    },
    {
        icon: <MessageCircle />,
        text: "Message"
    },
    {
        icon: <Heart />,
        text: "Likes"
    },
    {
        icon: <PlusSquare />,
        text: "Post"
    },
    {
        icon: (<Avatar>
            <AvatarImage src={user?.profilePicture}  />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>),
        text: "Profile"
    },
    {
        icon: <LogOut />,
        text: "Logout"
    },

]

    return (
        <div className=' h-screen w-[20%] py-10  fixed'>
            <h1 className='mb-3 mx-8 pl-5 font-bold text-xl'>logo</h1>
            <div className='max-w-full px-4  h-full'>
                <ul className=' flex flex-col gap-8'>
                    {Sidebarobjects.map((item, index) => (
                       <li key={index} className="flex items-center space-x-2 p-2 cursor-pointer block w-full hover:bg-gray-200">
                       <div className="flex items-center gap-3 w-full sm:w-auto" onClick={() => Sidebarhandler(item)}>
                           <span>{item.icon}</span>
                           <span>{item.text}</span>
                       </div>
                   </li>
                   
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default LeftSidebar
