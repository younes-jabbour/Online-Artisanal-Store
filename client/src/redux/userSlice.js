import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    AccessToken: null,
  },

  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.AccessToken = action.payload.AccessToken;
    },
    logout: (state) => {
      state.AccessToken = null;
      state.userInfo = {};
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
