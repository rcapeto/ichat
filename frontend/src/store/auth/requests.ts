import { login } from "@/services/http/requests/auth";
import {
  LoginRequest,
  LoginResponse,
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
