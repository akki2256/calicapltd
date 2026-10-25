"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { trackCta } from "@/lib/analytics";

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
  /** Magnetic hover pull (default: on) */
  magnetic?: boolean;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  magnetic,
  href,
  onClick,
  ...props
}: Props) {
  const mag = useMagnetic({
    enabled: magnetic ?? true,
    strength: 10,
  });
  const hrefString = typeof href === "string" ? href : href.pathname ?? "";

  return (
    <Link
      href={href}
      ref={mag.ref as never}
      style={mag.style}
      onPointerMove={mag.onPointerMove as never}
      onPointerLeave={mag.onPointerLeave}
      onClick={(event) => {
        if (hrefString) trackCta(hrefString);
        onClick?.(event);
      }}
      className={`inline-flex items-center justify-center gap-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${canvasVariants[variant]} ${className}`}
      {...props}
    >
      {children}
      <span className="btn-canvas-arrow" aria-hidden>
        →
      </span>
    </Link>
  );
}
