import { ThemeContext } from "@/contexts/theme";
import { useContext } from "react";

export function useTheme() {
  return useContext(ThemeContext);
}
