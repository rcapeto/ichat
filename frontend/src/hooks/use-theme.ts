import { themeActions } from "@/store/theme";
import { useAppDispatch } from "./use-dispatch";
import { useAppSelector } from "./use-selector";

export function useTheme() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

  function toggleTheme() {
    dispatch(themeActions.toggleTheme());
  }

  return {
    theme,
    toggleTheme,
  };
}
