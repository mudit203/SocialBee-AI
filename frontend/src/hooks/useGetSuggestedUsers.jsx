import { setsuggestedusers } from "@/redux/authSlice";
import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
const useGetSuggestedUsers=()=>{
    const dispatch = useDispatch();
    useEffect(() => {
    
        const fetchSuggestedUSers=async ()=>{
            try {
                const res=await axios.get("http://localhost:8000/api/v1/user/suggested", {withCredentials:true});
                if(res.data.success){
                dispatch(setsuggestedusers(res.data.users));
                }
            } catch (error) {
                console.log(error);
            }
        }
    
        fetchSuggestedUSers();
      
    }, [])


}
export default useGetSuggestedUsers;

