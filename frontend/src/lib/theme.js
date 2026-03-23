// src/lib/theme.js
import { create } from "zustand";

const saved = typeof window !== "undefined" ? localStorage.getItem("rizotic-theme") : null;
const prefersDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
const initial = saved || (prefersDark ? "dark" : "light");

// Apply immediately on load
if (typeof window !== "undefined") {
  document.documentElement.setAttribute("data-theme", initial);
  document.documentElement.style.colorScheme = initial;
}

export const useTheme = create((set) => ({
  mode: initial,
  toggle: () => set((s) => {
    const next = s.mode === "dark" ? "light" : "dark";
    localStorage.setItem("rizotic-theme", next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    return { mode: next };
  }),
  setMode: (mode) => {
    localStorage.setItem("rizotic-theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.style.colorScheme = mode;
    set({ mode });
  },
}));

// Helper: returns bg color based on current theme + section type
export function useSectionBg(lightColor, darkColor) {
  // Will be used inline in components
}
