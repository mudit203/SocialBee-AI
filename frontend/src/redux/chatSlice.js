import { createSlice } from "@reduxjs/toolkit";

const chatSlice=createSlice({
    name:"chat",
    initialState:{
        Onlineusers:[],
        messages:[]
    },
    reducers:{
        setonlineusers:(state,action)=>{
            state.Onlineusers=action.payload
        },
        setmessages:(state,action)=>{
            state.messages=action.payload
        }
    }
})
export const {setonlineusers,setmessages}=chatSlice.actions;
export default chatSlice.reducer;