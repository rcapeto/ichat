import { applicationConfig } from "@/config/application";
import { setApiHeader } from "@/services/http/api";
import { UserSession } from "@/services/http/entities/app/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { handleLogin, handleRegister, handleSession } from "./requests";
import { AuthStoreState } from "./types";

export const fakeUser = {
  session: {
    createdAt: new Date().toISOString(),
    email: "raphael.capeto@ichat.com",
    firstName: "Raphael",
    lastName: "Capeto",
    profileImage: "",
    id: "my-id",
  },
  token: "my-token",
};

export const contactUser = {
  session: {
    createdAt: new Date().toISOString(),
    email: "john.doe@ichat.com",
    firstName: "John",
    lastName: "Doe",
    profileImage: "",
    id: "contact-id",
  },
  token: "contact-token",
};

const initialState: AuthStoreState = {
  auth: {
    error: false,
    loading: false,
    payload: fakeUser,
  },
  session: {
    error: false,
    loading: false,
    payload: fakeUser.session,
  },
  register: {
    error: false,
    loading: false,
    payload: null,
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

      if (state.session.payload) {
        state.session.payload = action.payload;
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
        state.session.payload = action.payload.session;

        setApiHeader("Authorization", action.payload.token);
      })
      .addCase(handleLogin.rejected, (state) => {
        state.auth.loading = false;
        state.auth.error = true;
      })

      .addCase(handleRegister.pending, (state) => {
        state.register.loading = true;
        state.register.error = false;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.register.loading = false;
        state.register.payload = action.payload;
      })
      .addCase(handleRegister.rejected, (state) => {
        state.register.loading = false;
        state.register.error = true;
      })

      .addCase(handleSession.pending, (state) => {
        state.session.loading = true;
        state.session.error = false;
      })
      .addCase(handleSession.fulfilled, (state, action) => {
        state.session.loading = false;
        state.session.payload = action.payload.session;
      })
      .addCase(handleSession.rejected, (state) => {
        state.session.loading = false;
        state.session.error = true;
      });
  },
});

export default AuthSlice.reducer;
export const authActions = AuthSlice.actions;
