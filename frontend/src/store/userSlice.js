import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/axiosInstance";

export const getUserData = createAsyncThunk("user/getUserData", async () => {
  const response = await axiosInstance.get("/profile");
  return response.data.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null
  },
  reducers: {
    logout: state => {
      state.userInfo = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
