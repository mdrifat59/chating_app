import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name:"login",
    initialState:{
        loggedIn: JSON.parse(localStorage.getItem("user")) || null
    },
    reducers:{
        loggedInUser:(state,action)=>{
            state.loggedIn = action.payload
        },
        loggedOutUser:(state)=>{
            state.loggedIn = null
        }
    }
})

export const {loggedInUser, loggedOutUser}= loginSlice.actions;

export default loginSlice.reducer;