"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "glassmorphism";

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
  theme: "glassmorphism",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "glassmorphism",
  storageKey = "sparkhub-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage?.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark", "glassmorphism");

    if (theme === "light") {
      root.classList.add("light");
      root.style.background =
        "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)";
    } else if (theme === "dark") {
      root.classList.add("dark");
      root.style.background =
        "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)";
    } else {
      root.classList.add("glassmorphism");
      root.style.background =
        "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)";
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage?.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

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
