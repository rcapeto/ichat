import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const Icon = isDarkMode ? MoonIcon : SunIcon;

  function changeTheme() {
    toggleTheme();
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-switch"
        onCheckedChange={changeTheme}
        checked={isDarkMode}
      />
      <Label htmlFor="theme-switch">
        <Icon />
      </Label>
    </div>
  );
}
