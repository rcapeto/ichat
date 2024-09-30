import { applicationConfig } from "@/config/application";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { handleLogin } from "./requests";
import { State } from "./types";

const fakeUser = {
  session: {
    createdAt: new Date().toISOString(),
    email: "raphael.capeto@ichat.com",
    firstName: "Raphael",
    lastName: "Capeto",
    profileImage: "",
  },
  token: "my-token",
};

const initialState: State = {
  auth: {
    error: false,
    loading: false,
    payload: fakeUser,
  },
};

const AuthSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    logout(state) {
      state.auth.payload = null;
      Cookies.remove(applicationConfig.cookies.userToken);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.auth.loading = true;
        state.auth.error = false;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.auth.loading = false;
        state.auth.payload = action.payload;
      })
      .addCase(handleLogin.rejected, (state) => {
        state.auth.loading = false;
        state.auth.error = true;
      });
  },
});

export default AuthSlice.reducer;
export const authActions = AuthSlice.actions;
