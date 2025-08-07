"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassmorphismProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "medium" | "strong" | "ultra";
  blur?: "sm" | "md" | "lg" | "xl";
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "glow";
  border?: boolean;
  hover?: boolean;
}

export const Glassmorphism: React.FC<GlassmorphismProps> = ({
  children,
  className,
  variant = "medium",
  blur = "md",
  rounded = "2xl",
  shadow = "lg",
  border = true,
  hover = true,
}) => {
  const variants = {
    light: "bg-glass-light",
    medium: "bg-glass-medium",
    strong: "bg-glass-strong",
    ultra: "bg-glass-ultra",
  };

  const blurs = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  };

  const roundeds = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
  };

  const shadows = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    glow: "shadow-glow",
  };

  return (
    <div
      className={cn(
        variants[variant],
        blurs[blur],
        roundeds[rounded],
        shadows[shadow],
        border && "border border-glass-border",
        hover &&
          "hover:bg-glass-medium hover:shadow-glow transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};
