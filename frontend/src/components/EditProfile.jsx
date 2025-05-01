import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';

function EditProfile() {
    const {user}=useSelector(store=>store.auth);
  return (
    <div>
      <section>
        <h1 className='font-bold text-xl'>
            Edit profile
        </h1>
        <div className='flex items-center gap-2'>
       
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        
        <div>
          <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
          <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
        </div>
      </div>
      </section>
    </div>
  )
}

export default EditProfile
