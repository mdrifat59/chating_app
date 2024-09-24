// import { configureStore } from "@reduxjs/toolkit";
// import { loginSlice } from "./Loginslice";

// const store = configureStore({
//     reducer:{
//         login:loginSlice,
//     }
// })

// export default store

import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Loginslice"; // Import the default export, which is the reducer

const store = configureStore({
    reducer: {
        login: loginReducer, // Use the reducer, not the entire slice
    }
});

export default store;
