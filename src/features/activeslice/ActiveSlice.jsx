import { createSlice } from "@reduxjs/toolkit";

export const ActiveSingleSlice = createSlice({
    name:"single",
    initialState:{
        activefriend: JSON.parse(localStorage.getItem("active")) || null
    },
    reducers:{
        ActiveSingle:(state, action)=>{
            state.activefriend= action.payload
        }
    }
})

export const { ActiveSingle } = ActiveSingleSlice.actions

export default ActiveSingleSlice.reducer