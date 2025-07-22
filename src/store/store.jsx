import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features/authLoginSlice";
import DisplayUserSlice from "../Features/DisplayUser";

const userLogin = configureStore({
  reducer: {
    userAuth: userSlice,
    DisplayUser: DisplayUserSlice,
  },
});

export default userLogin;
