import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "nookies";

export const userLogin = createAsyncThunk(
  "userLogin/fetchUserLogin",
  async (param) => {
    const { email, password, isEmployee } = param;
    const { data } = await axios.post(
      "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
      {
        email: email,
        password: password,
        isEmployee: isEmployee,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setCookie(null, "token", data.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return data;
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: { loading: false, userData: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
