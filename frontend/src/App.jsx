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
import { useSelector } from 'react-redux'


const browserRoute=createBrowserRouter([
  {
    path:'/',
    element:<Mainlayout/>,
    children:[
      {
        path:'/',
        element:<Home/>,
       
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
  const {user}=useSelector(store=>store.auth);
  useEffect(() => {
    if(user){
      const socketio= io('http://localhost:8000',{
        query:{
          userId:user._id
        },
        transports:['websocket']
      })
    }
  
   
  }, [])
  

  return (
    <div>
     <RouterProvider router={browserRoute}/>
   
      </div>
  ) 
}

export default App
