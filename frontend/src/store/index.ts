import { configureStore } from "@reduxjs/toolkit";

import userStore from "./app/user";
import authStore from "./auth";
import themeStore from "./theme";

const store = configureStore({
  reducer: {
    auth: authStore,
    theme: themeStore,
    user: userStore,
  },
});

export default store;
