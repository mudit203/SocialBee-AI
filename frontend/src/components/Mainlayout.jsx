import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import { FiMenu } from 'react-icons/fi';

function Mainlayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex flex-col lg:flex-row w-full h-screen'>
      {/* Hamburger Icon for Mobile */}
      <button
        className="lg:hidden p-4 sticky top-0 left-0 z-30 bg-white/80 backdrop-blur rounded-full mt-2 ml-2"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <FiMenu size={20} />
       
      </button>

      {/* Sidebar: hidden on mobile, visible on lg+ */}
      <div className={`fixed inset-y-0 left-0 z-40 bg-gray-100 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        w-3/4 max-w-xs lg:static lg:translate-x-0 lg:w-[20%] lg:block`}>
        <LeftSidebar open={setSidebarOpen}/>
        {/* Close button for mobile */}
        <button
          className="lg:hidden absolute top-4 right-4"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-y-auto'>
        <Outlet />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Mainlayout;