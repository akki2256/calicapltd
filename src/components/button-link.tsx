import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  primary:
    "bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)] hover:bg-[var(--color-btn-primary-hover)] shadow-[0_0_0_1px_var(--color-btn-primary-ring)]",
  ghost:
    "border border-[var(--color-border-subtle)] text-[var(--color-btn-ghost-text)] hover:border-[var(--color-btn-ghost-hover-border)] hover:bg-[var(--color-btn-ghost-hover-bg)]",
} as const;

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: keyof typeof variants;
  className?: string;
};

export function ButtonLink({ variant = "primary", className = "", ...props }: Props) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
