"use client";

import * as React from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 p-1 glass-container-strong rounded-full">
      <button
        onClick={() => setTheme("glassmorphism")}
        className={`p-1.5 rounded-full transition-all duration-300 ${
          theme === "glassmorphism"
            ? "bg-primary text-white shadow-glow"
            : "text-dark-400 hover:text-white hover:bg-glass-medium"
        }`}
        aria-label="Glassmorphism theme"
      >
        <Sparkles className="h-3 w-3" />
      </button>
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full transition-all duration-300 ${
          theme === "light"
            ? "bg-primary text-white shadow-glow"
            : "text-dark-400 hover:text-white hover:bg-glass-medium"
        }`}
        aria-label="Light theme"
      >
        <Sun className="h-3 w-3" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-all duration-300 ${
          theme === "dark"
            ? "bg-primary text-white shadow-glow"
            : "text-dark-400 hover:text-white hover:bg-glass-medium"
        }`}
        aria-label="Dark theme"
      >
        <Moon className="h-3 w-3" />
      </button>
    </div>
  );
}
