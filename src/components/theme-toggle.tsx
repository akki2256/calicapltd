"use client";

import { Palette } from "lucide-react";
import { THEMES } from "@/lib/themes";
import { useTheme } from "@/components/theme-provider";

type Props = {
  className?: string;
  variant?: "float" | "rail";
};

export function ThemeToggle({ className = "", variant = "float" }: Props) {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === "calicon" ? "canvas" : "calicon";
  const nextLabel = THEMES.find((option) => option.id === nextTheme)?.label;
  const currentLabel = THEMES.find((option) => option.id === theme)?.label;

  return (
    <button
      type="button"
      className={
        variant === "rail"
          ? `flex h-10 w-10 items-center justify-center text-[#7d7d7d] transition hover:text-white ${className}`
          : `floating-actions-btn ${className}`
      }
      aria-label={`Switch theme to ${nextLabel}`}
      title={`Theme: ${currentLabel}. Switch to ${nextLabel}.`}
      onClick={() => setTheme(nextTheme)}
    >
      <Palette className="h-5 w-5" strokeWidth={1.75} aria-hidden />
    </button>
  );
}
