import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';

function Mainlayout() {
  return (
    <div className='flex flex-col lg:flex-row w-full h-screen'>
      {/* Left Sidebar */}
      <div className='hidden lg:block lg:w-[20%] bg-gray-100'>
        <LeftSidebar />
      </div>

      {/* Main Content */}
      <div className ='flex-1 overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  );
}

export default Mainlayout;
