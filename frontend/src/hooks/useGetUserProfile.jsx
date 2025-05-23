import { setuserprofile } from "@/redux/authSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const usegetuserprofile= (UserId)=>{
   const dispatch = useDispatch();
    useEffect(() => {
      
        const fetchuserprofile=async()=>{
            const res=await axios.get(`https://socialbee-ai.onrender.com/api/v1/user/${UserId}/profile`,{withCredentials:true})
            if(res.data.success){
             dispatch(setuserprofile(res.data.user));
            }
        }
    fetchuserprofile();
     
    }, [UserId])
    
};
export default usegetuserprofile