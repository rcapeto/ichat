import { applicationConfig } from "@/config/application";
import { createSlice } from "@reduxjs/toolkit";
import { Theme, ThemeStoreState } from "./types";

const themeKey = applicationConfig.localStorage.theme;
const themeInStorage = localStorage.getItem(themeKey) as Theme | null;
const htmlElement = document.documentElement;

function getCurrentTheme() {
  const html = document.documentElement;
  const themes: Theme[] = ["dark", "light"];
  let themeInHTML: Theme = "dark";
  let hasThemeInHTML = false;

  for (const possibleTheme of themes) {
    if (html.classList.contains(possibleTheme)) {
      hasThemeInHTML = true;
      themeInHTML = possibleTheme;
    }
  }

  const theme = !hasThemeInHTML ? themeInStorage ?? "dark" : themeInHTML;

  htmlElement.className = theme;
  localStorage.setItem(themeKey, theme);

  return theme;
}

const initialState: ThemeStoreState = {
  theme: getCurrentTheme(),
};

const ThemeSlice = createSlice({
  name: "theme-slice",
  initialState,
  reducers: {
    toggleTheme(state) {
      const isDark = state.theme === "dark";
      const newTheme = isDark ? "light" : "dark";

      state.theme = newTheme;
      localStorage.setItem(themeKey, newTheme);
      htmlElement.className = newTheme;
    },
  },
});

export default ThemeSlice.reducer;
export const themeActions = ThemeSlice.actions;
