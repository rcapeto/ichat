export type Theme = "light" | "dark";

export type ThemeContextValues = {
  theme: Theme;
  toggleTheme: () => void;
};
