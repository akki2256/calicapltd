import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  primary:
    "bg-gold-400 text-neutral-950 hover:bg-gold-300 shadow-[0_0_0_1px_rgba(212,175,55,0.25)]",
  ghost:
    "border border-[var(--color-border-subtle)] text-slate-700 hover:border-gold-500/40 hover:bg-white/60",
} as const;

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: keyof typeof variants;
  className?: string;
};

export function ButtonLink({ variant = "primary", className = "", ...props }: Props) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
