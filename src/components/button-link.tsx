import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  primary:
<<<<<<< HEAD
    "bg-gold-400 text-neutral-950 hover:bg-gold-300 shadow-[0_0_0_1px_rgba(212,175,55,0.25)]",
  ghost:
    "border border-[var(--color-border-subtle)] text-slate-700 hover:border-gold-500/40 hover:bg-white/60",
=======
    "bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)] hover:bg-[var(--color-btn-primary-hover)] shadow-[0_0_0_1px_var(--color-btn-primary-ring)]",
  ghost:
    "border border-[var(--color-border-subtle)] text-[var(--color-btn-ghost-text)] hover:border-[var(--color-btn-ghost-hover-border)] hover:bg-[var(--color-btn-ghost-hover-bg)]",
>>>>>>> 4c896421623002b20fad236becc872417032659e
} as const;

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: keyof typeof variants;
  className?: string;
};

export function ButtonLink({ variant = "primary", className = "", ...props }: Props) {
  return (
    <Link
<<<<<<< HEAD
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 ${variants[variant]} ${className}`}
=======
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${variants[variant]} ${className}`}
>>>>>>> 4c896421623002b20fad236becc872417032659e
      {...props}
    />
  );
}
