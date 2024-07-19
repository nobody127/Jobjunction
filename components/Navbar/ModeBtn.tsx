import useThemeChange from "@/app/hooks/Theme";
import { useThemeStore } from "@/store/store";
import { Moon, Sun } from "lucide-react";

export default function ModeBtn({ ...props }: any) {
  const { theme, toggleTheme } = useThemeStore();
  useThemeChange();
  return (
    <div>
      {theme == "light" ? (
        <Moon
          className={`cursor-pointer ${props.className}`}
          onClick={() => {
            toggleTheme();
          }}
        />
      ) : (
        <Sun
          className={`cursor-pointer  ${props.className}`}
          onClick={() => {
            toggleTheme();
          }}
        />
      )}
    </div>
  );
}
