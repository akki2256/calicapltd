"use client";

import { Palette } from "lucide-react";
import { THEMES } from "@/lib/themes";
import { useTheme } from "@/components/theme-provider";

type Props = {
  className?: string;
  compact?: boolean;
  variant?: "select" | "rail";
};

export function ThemeSelector({
  className = "",
  compact = false,
  variant = "select",
}: Props) {
  const { theme, setTheme } = useTheme();

  if (variant === "rail") {
    const nextTheme = theme === "calicon" ? "canvas" : "calicon";
    const nextLabel = THEMES.find((option) => option.id === nextTheme)?.label;

    return (
      <button
        type="button"
        className={`flex h-10 w-10 items-center justify-center text-[#7d7d7d] transition hover:text-white ${className}`}
        aria-label={`Switch theme to ${nextLabel}`}
        title={`Theme: ${THEMES.find((option) => option.id === theme)?.label}. Click to switch.`}
        onClick={() => setTheme(nextTheme)}
      >
        <Palette className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </button>
    );
  }

  return (
    <label
      className={`inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)]/80 px-3 py-1.5 text-sm text-[var(--color-text-muted)] shadow-sm transition hover:border-[var(--color-accent-muted)] hover:text-[var(--color-text)] ${className}`}
    >
      <Palette
        className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]"
        strokeWidth={2}
        aria-hidden
      />
      {!compact && (
        <span className="hidden text-xs font-medium sm:inline">Theme</span>
      )}
      <select
        value={theme}
        onChange={(event) => setTheme(event.target.value as typeof theme)}
        className="cursor-pointer appearance-none bg-transparent pr-4 text-xs font-medium text-[var(--color-text)] focus:outline-none"
        aria-label="Select site theme"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237d7d7d' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
        }}
      >
        {THEMES.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
