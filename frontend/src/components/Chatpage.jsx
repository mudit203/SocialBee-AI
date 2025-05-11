import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setselecteduser } from '@/redux/authSlice';
import { Button } from './ui/button';
import { MessageCircle } from 'lucide-react';
import Messages from './Messages';

function Chatpage() {
    const { user, suggestedusers, selecteduser } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const isOnline = false;
    return (
        <div className='flex h-screen'>
            <section className='w-full md:w-1/4'>
                <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
                <hr className='mb-4 border-gray-300' />
                <div className='overflow-y-auto h-[80%]'>
                    {suggestedusers.map((item, index) => {
                        return (<div onClick={() => dispatch(setselecteduser(item))} className='flex gap-3 items-center p-4 hover:bg-gray-50'>
                            <Avatar>
                                <AvatarImage src={item?.profilePicture} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <span>{item.username}</span>

                                <span className={`text-xs ${isOnline ? "text-green-500" : "text-red-500"}`}>{isOnline ? (<>online</>) : (<>offline</>)}</span>
                            </div>
                        </div>)
                    })}
                </div>
            </section>
            {
                selecteduser ? (
                    <section className='flex-1 border-l border-l-gray-300 flex flex-col h-full'>
                        <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-3 sticky top-0  z-10'>
                            <Avatar className="w-14 h-14">
                                <AvatarImage src={selecteduser?.profilePicture} alt='profile' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <span>{selecteduser?.username}</span>
                            </div>
                        </div>
                       <Messages SelectedUser={selecteduser}/>
                        <div className='flex items-center p-4 border-t border-t-gray-300'>
                            <input type="text" className=" flex-1 mr-2 focus-visible:ring-transparent" placeholder='messages' />
                            <Button>Send</Button>
                        </div>
                    </section>
                ) : (<div className='flex flex-col items-center justify-center mx-auto'>
                    <MessageCircle className='w-32 h-32 my-4' />
                    <h1 >your messages</h1>
                    <span>send a message to start a chat</span>
                </div>)
            }
        </div>
    )
}

export default Chatpage
