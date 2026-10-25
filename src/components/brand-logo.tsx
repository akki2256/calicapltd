import Image from "next/image";
import { CALICON_SITE_NAME } from "@/lib/calicap-contact";

/** Canvas lockup — public/brand/calicon-lockup.svg (cropped official path, 1160×250) */
export const BRAND_LOCKUP_SRC = "/brand/calicon-lockup.svg";
export const BRAND_LOCKUP_ASPECT = 1160 / 250;

export type BrandLogoSize = "sm" | "md" | "lg" | "header" | "footer";

/** Color treatment relative to the surface behind the lockup. */
export type BrandLogoVariant = "auto" | "on-dark" | "on-light" | "accent";

const CANVAS_SIZE_PX: Record<BrandLogoSize, number> = {
  sm: 28,
  md: 34,
  lg: 56,
  header: 34,
  footer: 40,
};

type BrandLogoProps = {
  size?: BrandLogoSize;
  variant?: BrandLogoVariant;
  className?: string;
  /** Prefer true in sticky/fixed headers */
  priority?: boolean;
  /**
   * Accessible name. Pass empty string when a parent link already has
   * `aria-label` so screen readers do not announce the brand twice.
   */
  label?: string;
};

export function BrandLogo({
  size = "header",
  variant = "auto",
  className = "",
  priority = false,
  label = CALICON_SITE_NAME,
}: BrandLogoProps) {
  const height = CANVAS_SIZE_PX[size];
  const width = Math.round(height * BRAND_LOCKUP_ASPECT);
  const decorative = label === "";

  return (
    <span
      className={`brand-logo brand-logo--${variant} brand-logo--${size} brand-logo--horizontal brand-logo--canvas${className ? ` ${className}` : ""}`}
      style={{ ["--brand-logo-h" as string]: `${height}px` }}
      data-brand-logo=""
    >
      <Image
        src={BRAND_LOCKUP_SRC}
        alt={decorative ? "" : label}
        width={width}
        height={height}
        priority={priority}
        unoptimized
        className="brand-logo__img"
        sizes={`${width}px`}
        {...(decorative ? { "aria-hidden": true as const } : {})}
      />
    </span>
  );
}
