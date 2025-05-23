import { setmessages } from "@/redux/chatSlice";
import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const useGetAllmessages=()=>{
    const dispatch = useDispatch();
    const {selecteduser}=useSelector(store=>store.auth);
    const id=selecteduser?._id
    useEffect(() => {
    
        const fetchmessages=async ()=>{
            try {
                const res=await axios.get(`https://socialbee-ai.onrender.com/api/v1/message/all/${id}`, {withCredentials:true});
                if(res.data.success){
               dispatch(setmessages(res.data.messages));
                }
            } catch (error) {
                console.log(error);
            }
        }
    
        fetchmessages();
      
    }, [selecteduser])


}
export default useGetAllmessages;

