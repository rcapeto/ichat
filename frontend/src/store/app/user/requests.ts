import { updateUser } from "@/services/http/requests/app/profile/requests";
import {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@/services/http/requests/app/profile/types";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const handleUpdateUser = createAsyncThunk<
  UpdateProfileResponse,
  UpdateProfileRequest
>("update-user", async (params) => {
  try {
    const response = await updateUser(params);
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
