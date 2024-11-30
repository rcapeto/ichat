import { configureStore } from "@reduxjs/toolkit";

import chatStore from "./app/chat";
import userStore from "./app/user";
import authStore from "./auth";
import themeStore from "./theme";

const store = configureStore({
  reducer: {
    auth: authStore,
    theme: themeStore,
    user: userStore,
    chat: chatStore,
  },
});

export default store;
