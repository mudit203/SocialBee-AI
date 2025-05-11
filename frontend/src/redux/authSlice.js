import { createSlice } from "@reduxjs/toolkit";
const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        suggestedusers:[],
        userprofile:null,
        selecteduser:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.user=action.payload;
        },
        setsuggestedusers:(state,action)=>{
            state.suggestedusers=action.payload;
        },
        setuserprofile:(state,action)=>{
            state.userprofile=action.payload;
        },
        setselecteduser:(state,action)=>{
            state.selecteduser=action.payload
        }
    }
});
export const {setAuthUser,setsuggestedusers,setuserprofile,setselecteduser}=authSlice.actions;
export default authSlice.reducer;