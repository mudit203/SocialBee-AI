import usegetuserprofile from '@/hooks/useGetUserProfile';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, MessageCircle } from 'lucide-react';
function Profile() {
  const params = useParams();
  const userId = params.id;
  usegetuserprofile(userId);
  const { userprofile } = useSelector(store => store.auth);
  const { user } = useSelector(store => store.auth);
   const [activetab, setactivetab] = useState("posts")
   const navigate=useNavigate();
  const isloggedin = () => {
    if (userprofile._id === user._id) {
      return true;
    }
    else {
      return false;
    }
  }
  const handleactivetab=(tab)=>{
    setactivetab(tab);
  }
  const displayedposts=activetab==='posts' ? userprofile?.posts : userprofile?.bookmarks

  return (
    <div className='flex max-w-4xl justify-center mx-auto '>
      <div className='flex flex-col gap-20 p-8'>
        <div className='grid grid-cols-2'>
          <section className='flex items-center justify-center'>
            <Avatar className='h-32 w-32'>
              <AvatarImage src={userprofile?.profilePicture} alt="profilephoto" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className='flex gap-5 flex-col'>
              <div className='flex items-center gap-2'>
                <span>{userprofile?.username}</span>
                {
                  isloggedin() ? (<div className='flex gap-2'>
                    <Button variant='secondary' className='hover:bg-gray-200 h-8' onClick={()=>navigate('/account/edit')}>Edit profile</Button>
                    <Button variant='secondary' className='hover:bg-gray-200 h-8'>View Archive</Button>
                    <Button variant='secondary' className='hover:bg-gray-200 h-8'>Add tools</Button>
                  </div>) : (<div></div>)
                }

              </div>

              <div className='flex items-center gap-4'>
                <p className='font-semibold'>{userprofile?.posts?.length} <span >posts</span></p>
                <p className='font-semibold'>{userprofile?.followers?.length} <span>followers</span></p>
                <p className='font-semibold'>{userprofile?.following?.length} <span>following</span></p>
              </div>
              <div className='flex flex-col gap-3'>
                <span className='font-bold'>{userprofile?.bio || "bio here"}</span>
                <Badge className="w-fit" variant="secondary">{userprofile?.username}</Badge>
                <div>Hi this is mudit</div>
                <div>Hi this is mudit</div>
                <div>Hi this is mudit</div>
                <div>Hi this is mudit</div>
              </div>
            </div>
          </section>
        </div>
        <div className='border-t border-t-gray-200'>
          <div className='flex items-center justify-center gap-10 text-sm'>
            <span className={`py-3 cursor-pointer ${activetab==='posts'? 'font-bold' : ''}`} onClick={()=>handleactivetab('posts')}>
              POSTS
            </span>
    <span className={`py-3 cursor-pointer ${activetab==='saved'? 'font-bold' : ''}`} onClick={()=>handleactivetab('saved')}>
              SAVED
            </span>
            <span className={`py-3 cursor-pointer ${activetab==='reels'? 'font-bold' : ''}`} onClick={()=>handleactivetab('reels')}>
              REELS
            </span>
            <span className={`py-3 cursor-pointer ${activetab==='tags'? 'font-bold' : ''}`} onClick={()=>handleactivetab('tags')}>
              TAGS
            </span>

          </div>
          <div className='grid grid-cols-3'>
            {
              displayedposts.map((item)=>{
                return (<div className='m-5 relative group' key={item._id}>
                  <img className="rounded-sm w-full my-2 aspect-square object-cover" src={item.image}/>
                  <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 '>
                    <div className='flex items-center text-white space-x-4'>
                    <Button className="flex items-center gap-2 hover:text-gray-300">
                      <Heart/>
                      <span>{item?.likes?.length}</span>
                       </Button>
                       <Button>
                      <MessageCircle/>
                      <span>{item.comments?.length}</span>
                       </Button>
                    </div>
                    
                  </div>
                  <div className='flex gap-3'>
                  <span className='font-bold'>{item.author?.username? (<span>{item.author.username}</span>):(<span>No caption</span>)}</span>
                  <span>{item.caption}</span>
                  </div>
                </div>)
              })
            }
          </div>
        </div>
      </div>


    </div>
  )
}

export default Profile
