import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger } from './ui/sidebar'
import LeftSidebar from './LeftSidebar'



function Mainlayout() {
  return (
    
    <div>
    <LeftSidebar/>
    {/* <Outlet/> */}
   
    </div>
  )
}

export default Mainlayout
