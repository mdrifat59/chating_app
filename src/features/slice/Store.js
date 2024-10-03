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
import  ActiveSingleReducer   from "../activeslice/ActiveSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,  
        active: ActiveSingleReducer,
    }
});

export default store;
