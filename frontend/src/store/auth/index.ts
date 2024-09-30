import { applicationConfig } from "@/config/application";
import { setApiHeader } from "@/services/http/api";
import { UserSession } from "@/services/http/entities/app/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { handleLogin } from "./requests";
import { AuthStoreState } from "./types";

const fakeUser = {
  session: {
    createdAt: new Date().toISOString(),
    email: "raphael.capeto@ichat.com",
    firstName: "Raphael",
    lastName: "Capeto",
    profileImage: "",
    id: "any-id",
  },
  token: "my-token",
};

const initialState: AuthStoreState = {
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
    setNewSession(state, action: PayloadAction<UserSession>) {
      if (state.auth.payload?.session) {
        state.auth.payload.session = action.payload;
      }
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

        setApiHeader("Authorization", action.payload.token);
      })
      .addCase(handleLogin.rejected, (state) => {
        state.auth.loading = false;
        state.auth.error = true;
      });
  },
});

export default AuthSlice.reducer;
export const authActions = AuthSlice.actions;
