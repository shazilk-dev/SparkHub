"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "sparkhub-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Only access localStorage after component mounts (client-side)
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage?.getItem(storageKey) as Theme;
      if (stored && (stored === "light" || stored === "dark")) {
        setTheme(stored);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "light") {
      root.classList.add("light");
      root.style.background = "#ffffff";
    } else {
      root.classList.add("dark");
      root.style.background =
        "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)";
    }
  }, [theme, mounted]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (typeof window !== "undefined") {
        localStorage?.setItem(storageKey, theme);
      }
      setTheme(theme);
    },
  };

  // Prevent hydration mismatch by ensuring consistent initial render
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
