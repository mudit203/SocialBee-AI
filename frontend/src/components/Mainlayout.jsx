import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger } from './ui/sidebar'
import LeftSidebar from './LeftSidebar'
import Home from './Home'



function Mainlayout() {
  return (
   <div className='flex'>
    <div>
    <LeftSidebar/>
    </div>
    <Outlet/>
    </div>
  )
}

export default Mainlayout
