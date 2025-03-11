import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./reducers/userReducer";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export default store;
