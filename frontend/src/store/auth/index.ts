import { applicationConfig } from "@/config/application";
import { setApiHeader } from "@/services/http/api";
import { UserSession } from "@/services/http/entities/app/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { handleLogin, handleRegister, handleSession } from "./requests";
import { AuthStoreState } from "./types";

const headerAuthorizationKey = applicationConfig.api.headers.authorization;
const cookieTokenKey = applicationConfig.cookies.userToken;

const initialState: AuthStoreState = {
  auth: {
    error: false,
    loading: false,
    payload: null,
  },
  session: {
    error: false,
    loading: false,
    payload: null,
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
      state.session.payload = null;

      Cookies.remove(cookieTokenKey);
      setApiHeader(headerAuthorizationKey, "");
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
        const token = action.payload.token;

        state.auth.loading = false;
        state.auth.payload = action.payload;
        state.session.payload = action.payload.session;

        Cookies.set(cookieTokenKey, token);
        setApiHeader(headerAuthorizationKey, token);
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
        const token = Cookies.get(cookieTokenKey);

        if (token) {
          setApiHeader(headerAuthorizationKey, token);
        }

        state.session.loading = true;
        state.session.error = false;
      })
      .addCase(handleSession.fulfilled, (state, action) => {
        state.session.loading = false;
        state.session.payload = action.payload.session;

        const token = Cookies.get(cookieTokenKey);

        if (token) {
          state.auth.payload = {
            session: action.payload.session,
            token,
          };
        }
      })
      .addCase(handleSession.rejected, (state) => {
        state.session.loading = false;
        state.session.error = true;
      });
  },
});

export default AuthSlice.reducer;
export const authActions = AuthSlice.actions;
