import { createSlice } from "@reduxjs/toolkit";
import { handleUpdateUser, handleUpdateUserPassword } from "./requests";
import { UserStoreState } from "./types";

const initialState: UserStoreState = {
  updateUser: {
    error: false,
    loading: false,
    payload: null,
  },
  updateUserPassword: {
    error: false,
    loading: false,
    payload: null,
  },
};

const UserSlice = createSlice({
  initialState,
  name: "user-store",
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(handleUpdateUser.pending, (state) => {
        state.updateUser.loading = true;
        state.updateUser.error = false;
      })
      .addCase(handleUpdateUser.fulfilled, (state, action) => {
        state.updateUser.loading = false;
        state.updateUser.payload = action.payload;
      })
      .addCase(handleUpdateUser.rejected, (state) => {
        state.updateUser.loading = false;
        state.updateUser.error = true;
      })

      .addCase(handleUpdateUserPassword.pending, (state) => {
        state.updateUserPassword.loading = true;
        state.updateUserPassword.error = false;
      })
      .addCase(handleUpdateUserPassword.fulfilled, (state, action) => {
        state.updateUserPassword.loading = false;
        state.updateUserPassword.payload = action.payload;
      })
      .addCase(handleUpdateUserPassword.rejected, (state) => {
        state.updateUserPassword.loading = false;
        state.updateUserPassword.error = true;
      });
  },
});

export default UserSlice.reducer;
