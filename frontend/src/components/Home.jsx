import React, { useState } from 'react';
import Feed from './feed';
import RightSidebar from './RightSidebar';
import useGetAllPosts from '@/hooks/useGetAllPosts';
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers';
import { FiMenu } from 'react-icons/fi';

const Home = () => {
  useGetAllPosts();
  useGetSuggestedUsers();
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div className='flex flex-col lg:flex-row w-full relative'>
      {/* Feed Section */}
      <div className='flex-1 lg:w-[70%] p-4'>
        <div className='bg-white dark:bg-card rounded-xl shadow-md p-6 mb-6 flex items-center justify-center text-3xl font-bold text-primary'>
          <span className='animated-heading'>
            SocialBee AI
          </span>
        </div>
        <div className="bg-white dark:bg-card rounded-xl shadow p-6">
          <Feed />
        </div>
      </div>

      {/* Hamburger Icon for Right Sidebar (Mobile Only) */}
      <button
        className="lg:hidden p-4 absolute top-2 right-2 z-30"
        onClick={() => setRightSidebarOpen(true)}
        aria-label="Open right sidebar"
      >
        <FiMenu size={24} />
      </button>

      {/* Right Sidebar */}
      <div className={`fixed p-10 inset-y-0 right-0 z-40 bg-white dark:bg-card transition-transform duration-300
        ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        w-3/4 max-w-xs lg:static lg:translate-x-0 lg:w-[40%]`}>
        <RightSidebar />
        {/* Close button for mobile */}
        <button
          className="lg:hidden absolute top-4 left-4"
          onClick={() => setRightSidebarOpen(false)}
          aria-label="Close right sidebar"
        >
          ✕
        </button>
      </div>

      {/* Overlay for mobile when right sidebar is open */}
      {rightSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setRightSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;