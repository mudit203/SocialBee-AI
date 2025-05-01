import React from 'react';
import Feed from './feed';
import RightSidebar from './RightSidebar';
import useGetAllPosts from '@/hooks/useGetAllPosts';
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers';

const Home = () => {
   useGetAllPosts();
  useGetSuggestedUsers();
  return (
    <div className='flex flex-col lg:flex-row w-full'>
      {/* Feed Section */}
      <div className='flex-1 lg:w-[70%] p-4 '>
        <div className='flex items-center justify-center text-3xl font-bold'>
        <span>
          Social media app
        </span>
        </div>
        <Feed />
      </div>

      {/* Right Sidebar */}
      <div className='lg:w-[40%]'>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
