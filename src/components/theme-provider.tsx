"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_THEME,
  LEGACY_THEME_STORAGE_KEY,
  THEME_STORAGE_KEY,
  isThemeId,
  type ThemeId,
} from "@/lib/themes";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: ThemeId) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.remove("menu-visible", "canvas-out");
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);

  useEffect(() => {
    let stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (!stored) {
      const legacy = localStorage.getItem(LEGACY_THEME_STORAGE_KEY);
      if (legacy === "calicap") {
        stored = "calicon";
        localStorage.setItem(THEME_STORAGE_KEY, stored);
        localStorage.removeItem(LEGACY_THEME_STORAGE_KEY);
      } else if (isThemeId(legacy)) {
        stored = legacy;
        localStorage.setItem(THEME_STORAGE_KEY, stored);
        localStorage.removeItem(LEGACY_THEME_STORAGE_KEY);
      }
    }
    if (isThemeId(stored)) {
      setThemeState(stored);
      applyTheme(stored);
    }
  }, []);

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next);
    applyTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
