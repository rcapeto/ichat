import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Theme, ThemeContextValues } from "./types";

export const ThemeContext = createContext({} as ThemeContextValues);

export function ThemeProvider(props: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>("dark");

  function toggleTheme() {
    setTheme((prevTheme) => {
      const newTheme: Theme = prevTheme === "dark" ? "light" : "dark";

      document.documentElement.classList.add(newTheme);

      return newTheme;
    });
  }

  function getTheme() {
    const html = document.documentElement;
    const themes: Theme[] = ["dark", "light"];
    let setWithSuccess = false;

    for (const possibleTheme of themes) {
      if (html.classList.contains(possibleTheme)) {
        setWithSuccess = true;
        setTheme(possibleTheme);
      }
    }

    if (!setWithSuccess) {
      html.classList.add(theme);
    }
  }

  useEffect(() => {
    getTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
