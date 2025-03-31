
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
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
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>),
        text: "Profile"
    },
    {
        icon: <LogOut />,
        text: "Logout"
    },

]
const LeftSidebar = () => {
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
    return (
        <div className='w-screen h-screen py-10'>
            <h1 className='mb-3'>logo</h1>
            <div className='w-[16%] px-4  h-full'>
                <ul className=' flex flex-col gap-8'>
                    {Sidebarobjects.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
                            {/* {
                                item.text == "Logout" ? (<>
                                    <span onClick={Logouthandler}>{item.icon}</span>
                                    <span>{item.text}</span>
                                </>) : (<>
                                    <span>{item.icon}</span>
                                    <span>{item.text}</span>
                                </>)
                            } */}
                            <div className='flex gap-3 w-full' onClick={()=>Sidebarhandler(item)}>
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
