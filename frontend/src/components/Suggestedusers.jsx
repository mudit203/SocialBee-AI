
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

function Suggestedusers() {
    const {suggestedusers}=useSelector(store=>store.auth);
  return (
    <div className='my-10'>
      <div className=' items-centre justify-between text-sm gap-3 flex'>
        <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
        <span className='font-medium cursor-pointer'>see all</span>
      </div>
      {suggestedusers?.map((user)=>{
      return  <div key={user._id} className='flex gap-3 justify-between items-center my-5'>
              <div className='flex items-center gap-4'>
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
          <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
        </div>
       
      </div>
      <span className='font-bold text-xs text-[#3BADF8] hover:text-[#3495d6] cursor-pointer'>Follow</span>
        </div>
      })}
      
    </div>
  )
}

export default Suggestedusers
