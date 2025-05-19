import { setmessages } from "@/redux/chatSlice";
import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const usegetRTM=()=>{
    const dispatch = useDispatch();
    const{socket}=useSelector(store=>store.socketio);
    const{messages}=useSelector(store=>store.chat);
    
    
    useEffect(() => {
    
       socket?.on('newmessage',(newmessage)=>{
        dispatch(setmessages([...messages,newmessage]));
       })
    
       return ()=>{
        socket?.off('newmessage');
       }
      
    }, [messages,setmessages]);


}
export default usegetRTM;

