import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./Loginslice";

const store = configureStore({
    reducer:{
        login:loginSlice,
    }
})

export default store