import React, { useState } from 'react';
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import CreatePost from './CreatePost';
import { setPosts, setselectedpost } from '@/redux/postSlice';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import image from '../assets/logo.png'
const LeftSidebar = ({open}) => {
  const { user } = useSelector((store) => store.auth);
  const [Createpost, setCreatepost] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const{likeNotification}=useSelector(store=>store.realTimeNotification);

  const Logouthandler = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout', {}, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setselectedpost(null));
        dispatch(setPosts([]));
        navigate('/login');
        toast.success(res.data.message);
        open(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Sidebarhandler = (item) => {
    if (item.text === 'Logout') {
      Logouthandler();
       open(false);
    }
    else if (item.text === 'Post') {
      setCreatepost(true);
      open(false);
    }
    else if(item.text==='Profile'){
     navigate(`/profile/${user._id}`);
      open(false);
    }
    else if(item.text==='Home'){
      navigate('/');
     open(false);
    }
    else if(item.text==='Message'){
      navigate('/chat');
      open(false);
    }
  };

  const Sidebarobjects = [
    {
      icon: <Home />,
      text: 'Home',
    },
    {
      icon: <Search />,
      text: 'Search',
    },
    {
      icon: <TrendingUp />,
      text: 'Trending',
    },
    {
      icon: <MessageCircle />,
      text: 'Message',
    },
    {
      icon: <Heart />,
      text: 'Likes',
    },
    {
      icon: <PlusSquare />,
      text: 'Post',
    },
    {
      icon: (
        <Avatar>
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: 'Profile',
    },
    {
      icon: <LogOut />,
      text: 'Logout',
    },
  ];

  return (
    <div className="block fixed h-screen w-full max-w-xs bg-gray-100 shadow-md flex flex-col">
      <div className="p-6 flex-shrink-0">
        <img className="w-20 h-20 rounded-full object-contain" src={image} alt="" />
      </div>
      <div className="flex-1 overflow-auto px-4">
        <ul className="flex flex-col gap-5">
          {Sidebarobjects.map((item, index) => (
            <li
              key={index}
              className='flex items-center space-x-2 p-2 cursor-pointer block w-full hover:bg-gray-200 rounded-md'
              onClick={() => Sidebarhandler(item)}
            >
              <div className='flex items-center gap-3 w-full sm:w-auto'>
                <span>{item.icon}</span>
                <span>{item.text}</span>
                {
                  item.text==='Likes' && likeNotification.length>0 && (
                    <Popover side='top'>
                      <PopoverTrigger asChild>
                         <span className="relative">
                          <Button size='icon' className='rounded-full h-5 w-5 absolute bottom-6 left-6'>
                            {likeNotification.length}

                          </Button>
                        </span>

                      </PopoverTrigger>
                      <PopoverContent>
                        <div>
                          {
                            likeNotification.length==0 ? (<p>No new notification</p>):(
                              likeNotification.map((notification)=>{
                                return ( 
                                  <div>
                                    <Avatar>
                                      <AvatarImage src={notification.userdetails?.profilePicture}/>

                                      
                                    </Avatar>
                                    <p className='text-sm'> <span className='font-bold'> {notification.userdetails?.username} Liked your post</span></p>
                                  </div>
                                )
                              })
                            )
                          }
                        </div>
                      </PopoverContent>
                    </Popover>
                  )
                }
              </div>
            </li>
          ))}
        </ul>
      </div>
      <CreatePost open={Createpost} func={setCreatepost} />
    </div>
  );
};

export default LeftSidebar;