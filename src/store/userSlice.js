import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem("userData")
const storedToken = localStorage.getItem("authToken")

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : {}, // Initially no user logged in
    token: storedToken || null, // Initially no token,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {};
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
