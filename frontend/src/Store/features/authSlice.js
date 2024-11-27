import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    refreshToken: null,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
          loginUser: (state, action) => {
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
          },

          logOutUser: (state) => {
            localStorage.removeItem("persist:root");
            state.user = null;
            //  location.reload();
          },

          setAccessToken: (state, action) => {
            const accessToken = action.payload;
            state.accessToken = accessToken;
          },

          setCurrentUser: (state, action) => {

            state.user = action.payload;
          }
    }
});

export const { loginUser, logOutUser, setCurrentUser, setAccessToken } = authSlice.actions;

export default authSlice.reducer;