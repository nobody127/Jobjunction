"use client";

import { ThemeStoreType } from "@/types/types";
import { create } from "zustand";
import { atom } from "recoil";

export const useThemeStore = create<ThemeStoreType>((set) => ({
  theme: localStorage.getItem("job-theme") || "light",
  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    }));
  },
}));

export const allJobListings = atom<any>({
  key: "allJobListing",
  default: [],
});
