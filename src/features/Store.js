import { configureStore } from "@reduxjs/toolkit";
import  loginSlice from "./slice/Loginslice"; 
import  ActiveSingleReducer   from "./activeslice/ActiveSlice";

const store = configureStore({
    reducer: {
        login: loginSlice,  
        active: ActiveSingleReducer,
    }
});

export default store;
