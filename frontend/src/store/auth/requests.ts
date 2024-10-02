import {
  login,
  register,
  session,
} from "@/services/http/requests/auth/requests";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  SessionRequest,
  SessionResponse,
} from "@/services/http/requests/auth/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const handleLogin = createAsyncThunk<LoginResponse, LoginRequest>(
  "login",
  async (params) => {
    try {
      const response = await login(params);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data?.message ?? "";
      }

      if (error instanceof Error) {
        throw error.message;
      }

      throw error;
    }
  }
);

export const handleRegister = createAsyncThunk<
  RegisterResponse,
  RegisterRequest
>("register", async (params) => {
  try {
    const response = await register(params);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.message ?? "";
    }

    if (error instanceof Error) {
      throw error.message;
    }

    throw error;
  }
});

export const handleSession = createAsyncThunk<SessionResponse, SessionRequest>(
  "session",
  async (params) => {
    try {
      const response = await session(params);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data?.message ?? "";
      }

      if (error instanceof Error) {
        throw error.message;
      }

      throw error;
    }
  }
);
