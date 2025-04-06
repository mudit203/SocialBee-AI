import React from 'react'
import Feed from './feed'
import RightSidebar from './RightSidebar'
import { Outlet } from 'react-router-dom'
import useGetAllPosts from '@/hooks/useGetAllPosts'

const Home = () => {
  useGetAllPosts();
  return (
    <div className='flex flex-1  w-[50%] ml-20'>
      <div className='flex-3'>
        
        <Feed />
        
      </div>
      <div className='flex-1 '> 
      <RightSidebar />
      </div>
    </div>
  )
}

export default Home
