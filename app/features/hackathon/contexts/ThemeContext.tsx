import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "ukis-hackathon-theme";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return null;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  switchable?: boolean;
}

interface ThemeState {
  theme: Theme;
  followsSystem: boolean;
}

function getInitialThemeState(): ThemeState {
  const storedTheme = readStoredTheme();
  return {
    theme: storedTheme ?? getSystemTheme(),
    followsSystem: storedTheme === null,
  };
}

export function ThemeProvider({
  children,
  switchable = true,
}: ThemeProviderProps) {
  const [{ theme, followsSystem }, setThemeState] = useState(getInitialThemeState);

  useEffect(() => {
    if (followsSystem) return;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [followsSystem, theme]);

  useEffect(() => {
    if (!followsSystem) return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      setThemeState((current) =>
        current.followsSystem
          ? { ...current, theme: e.matches ? "dark" : "light" }
          : current
      );
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [followsSystem]);

  const setTheme = (next: Theme) =>
    setThemeState({ theme: next, followsSystem: false });
  const toggleTheme = () =>
    setThemeState((current) => ({
      theme: current.theme === "light" ? "dark" : "light",
      followsSystem: false,
    }));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
