"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { useTheme } from "@/components/theme-provider";
import { useMagnetic } from "@/hooks/use-magnetic";

const caliconVariants = {
  primary:
    "btn-calicon btn-calicon-primary rounded-full px-6 py-2.5 text-sm font-semibold",
  ghost:
    "btn-calicon btn-calicon-ghost rounded-full border px-6 py-2.5 text-sm font-semibold",
} as const;

const canvasVariants = {
  primary:
    "btn-canvas btn-canvas-primary rounded-none px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em]",
  ghost:
    "btn-canvas btn-canvas-ghost rounded-none border px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em]",
} as const;

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: "primary" | "ghost";
  className?: string;
  children: ReactNode;
  /** Force magnetic even on Calicon (default: Canvas only) */
  magnetic?: boolean;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  magnetic,
  ...props
}: Props) {
  const { theme } = useTheme();
  const isCanvas = theme === "canvas";
  const variants = isCanvas ? canvasVariants : caliconVariants;
  const mag = useMagnetic({
    enabled: magnetic === true,
    strength: 12,
  });

  return (
    <Link
      ref={mag.ref as never}
      style={mag.style}
      onPointerMove={mag.onPointerMove as never}
      onPointerLeave={mag.onPointerLeave}
      className={`inline-flex items-center justify-center gap-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {isCanvas ? (
        <span className="btn-canvas-arrow" aria-hidden>
          →
        </span>
      ) : null}
    </Link>
  );
}
