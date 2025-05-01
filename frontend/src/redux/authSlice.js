import { createSlice } from "@reduxjs/toolkit";
const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        suggestedusers:[],
        userprofile:null
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
        }
    }
});
export const {setAuthUser,setsuggestedusers,setuserprofile}=authSlice.actions;
export default authSlice.reducer;