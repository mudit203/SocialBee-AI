import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Mainlayout from './components/Mainlayout'
import Home from './components/Home'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import Chatpage from './components/Chatpage'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setsocket } from './redux/Socketslice'
import { setonlineusers } from './redux/chatSlice'
import { setLikeNotification } from './redux/rtnSlice'
import Protectedroute from './components/Protectedroute'


const browserRoute=createBrowserRouter([
  {
    path:'/',
    element:<Protectedroute><Mainlayout/></Protectedroute>,
    children:[
      {
        path:'/',
        element:<Protectedroute><Home/></Protectedroute>
       
      },
      {
        path:'/profile/:id',
        element:<Profile/>
      },
      {
        path:'/account/edit',
        element:<EditProfile/>
      },
      {
        path:'/chat',
        element:<Chatpage/>
      }
    ]

  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  }
 
  ])

function App() {
  const dispatch = useDispatch();
  const {user}=useSelector(store=>store.auth);
  const {socket}=useSelector(store=>store.socketio)
  useEffect(() => {
    if(user){
      const socketio= io('https://socialbee-ai.onrender.com',{
        query:{
          userId:user._id
        },
        transports:['websocket']
      })

      dispatch(setsocket(socketio));
     
      socketio.on("getonlineusers",(onlineusers)=>{
        dispatch(setonlineusers(onlineusers));
      })
      
      socketio.on('notification',(notification)=>{
        dispatch(setLikeNotification(notification));
      })

      return ()=>{
        socketio.close();
        dispatch(setsocket(null));
      }
      
    }else if(socket){
        socket?.close();
        dispatch(setsocket(null));
    }
  
   
  }, [dispatch,user])
  

  return (
    <div>
     <RouterProvider router={browserRoute}/>
   
      </div>
  ) 
}

export default App
