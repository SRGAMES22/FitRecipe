"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "weaponx";

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("fitrecipe-theme") as Theme;
    if (stored) {
      setThemeState(stored);
      document.documentElement.className = `theme-${stored}`;
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("fitrecipe-theme", newTheme);
    document.documentElement.className = `theme-${newTheme}`;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
