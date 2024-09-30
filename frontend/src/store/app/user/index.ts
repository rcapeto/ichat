import { createSlice } from "@reduxjs/toolkit";
import { handleUpdateUser } from "./requests";
import { UserStoreState } from "./types";

const initialState: UserStoreState = {
  updateUser: {
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
      });
  },
});

export default UserSlice.reducer;
