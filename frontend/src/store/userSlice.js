import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../services/axiosService";

export const getUserData = createAsyncThunk("user/getUserData", async () => {
  const response = await axiosService.get("/profile");
  return response.data.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    permission: []
  },
  reducers: {
    logout: state => {
      state.userInfo = null;
      state.permission = [];
    }
  },
  extraReducers: builder => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      if (action.payload.role && action.payload.role.permission) {
        state.permission = action.payload.role.permission.map(p => p.slug);
      }
    });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
