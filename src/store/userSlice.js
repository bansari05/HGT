// import { createSlice } from '@reduxjs/toolkit';

// const storedUser = localStorage.getItem("userData")
// const storedToken = localStorage.getItem("authToken")

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     user: storedUser ? JSON.parse(storedUser) : {}, // Initially no user logged in
//     token: storedToken || null, // Initially no token,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     clearUser: (state) => {
//       state.user = {};
//     }
//   }
// });

// export const { setUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

let storedUser = {};
const rawUserData = localStorage.getItem("userData");
const storedToken = localStorage.getItem("authToken");

try {
  if (rawUserData && rawUserData !== "undefined") {
    storedUser = JSON.parse(rawUserData);
  }
} catch (error) {
  console.error("Failed to parse userData from localStorage:", error);
  storedUser = {};
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: storedUser,
    token: storedToken || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {};
      state.token = null;
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
