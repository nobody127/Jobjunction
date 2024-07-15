import useThemeChange from "@/app/hooks/Theme";
import { useThemeStore } from "@/store/store";
import { Moon, Sun } from "lucide-react";

export default function ModeBtn() {
  const { theme, toggleTheme } = useThemeStore();
  useThemeChange();
  return (
    <div
      onClick={() => {
        toggleTheme();
      }}
    >
      {theme == "light" ? (
        <Moon className="curosor-pointer" />
      ) : (
        <Sun className="curosor-pointer" />
      )}
    </div>
  );
}
