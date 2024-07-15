"use client";

import { useThemeStore } from "@/store/store";
import { useEffect } from "react";

export default function useThemeChange() {
  const { theme } = useThemeStore();
  const oppositeTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(oppositeTheme);
    root.classList.add(theme);
    localStorage.setItem("job-theme", theme);
  }, [theme]);
}
