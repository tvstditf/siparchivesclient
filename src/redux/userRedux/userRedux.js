import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.errorMessage = "";
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
      state.errorMessage = "";
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    // loginRefreshStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    //   state.errorMessage = "";
    // },
    // loginRefreshSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.currentUser = action.payload;
    //   state.error = false;
    //   state.errorMessage = "";
    // },
    // loginRefreshFailure: (state, action) => {
    //   state.isFetching = false;
    //   state.error = true;
    //   state.errorMessage = action.payload;
    // },
  },
}); //End of Slice

export const { loginStart, loginSuccess, loginFailure, logoutUser } =
  userSlice.actions;
export default userSlice.reducer;
