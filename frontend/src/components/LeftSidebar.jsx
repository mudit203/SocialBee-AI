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

const LeftSidebar = () => {
  const { user } = useSelector((store) => store.auth);
  const [Createpost, setCreatepost] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Sidebarhandler = (item) => {
    if (item.text === 'Logout') {
      Logouthandler();
    }
    else if (item.text === 'Post') {
      setCreatepost(true);
    }
    else if(item.text==='Profile'){
     navigate(`/profile/${user._id}`);
    }
    else if(item.text==='Home'){
      navigate('/');
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
    <div className='hidden lg:block h-screen w-[20%] py-10 fixed bg-gray-100 shadow-md'>
      <h1 className='mb-6 mx-8 pl-5 font-bold text-xl'>Logo</h1>
      <div className='max-w-full px-4 h-full'>
        <ul className='flex flex-col gap-8'>
          {Sidebarobjects.map((item, index) => (
            <li
              key={index}
              className='flex items-center space-x-2 p-2 cursor-pointer block w-full hover:bg-gray-200 rounded-md'
              onClick={() => Sidebarhandler(item)}
            >
              <div className='flex items-center gap-3 w-full sm:w-auto'>
                <span>{item.icon}</span>
                <span>{item.text}</span>
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
