import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Mainlayout from './components/Mainlayout'
import Home from './components/Home'
import Profile from './components/Profile'
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
        path:'/profile',
        element:<Profile/>
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
  

  return (
    <div>
     <RouterProvider router={browserRoute}/>
   
      </div>
  ) 
}

export default App
