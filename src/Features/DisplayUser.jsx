import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const DisplayDataUser = createAsyncThunk(
  "DisplayDataUser/fetchDisplayDataUser",
  async (param) => {
    const { token } = param;

    const { data } = await axios.get(
      "https://api-yeshtery.dev.meetusvr.com/v1/user/info",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("data", data);

    return data;
  }
);

const DisplayUserSlice = createSlice({
  name: "DisplayUserSlice",
  initialState: { loading: false, userData: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DisplayDataUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(DisplayDataUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(DisplayDataUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = DisplayUserSlice.actions;
export default DisplayUserSlice.reducer;
