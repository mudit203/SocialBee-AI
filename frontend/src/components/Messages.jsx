import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetAllmessages from '@/hooks/usegetallmessages'
import usegetRTM from '@/hooks/usegetRTM'


function Messages({ SelectedUser }) {
    usegetRTM();
    useGetAllmessages();
    const{messages}=useSelector(store=>store.chat);
    const{user}=useSelector(store=>store.auth)
    return (
        <div className='overflow-y-auto flex-1 p-4'>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={SelectedUser?.profilePicture} alt='profile' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{SelectedUser?.username}</span>
                    <Link to={`/profile/${SelectedUser?._id}`}><Button className="h-8 my-2" variant="secondary">View Profile</Button></Link>
                </div>

            </div>
            <div className='flex flex-col gap-3'>
                {messages && messages.map((item, index) => {
                    return (
                        <div className={`flex ${item.senderId ===user._id?'justify-end':'justify-start' }`}>
                            <div className={`p-2 rounded-lg max-w-xs break-words ${item.senderId ===user._id?'bg-blue-500':'bg-gray-500'}`}>
                                
                                {item.message}
                            </div>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}

export default Messages
