import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name:"login",
    initialState:{
        logged:null
    },
    reducers:{
        loggetInUser:(state,action)=>{
            state.logged = action.payload
        },
        loggedOutUser:(state)=>{
            state.logged = null
        }
    }
})

export const {loggedInUser, loggedOutUser}= loginSlice.actions;

export default loginSlice.reducer;