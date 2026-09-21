import Image from "next/image";
import { CALICON_SITE_NAME } from "@/lib/calicap-contact";

/** Official geometry, Canvas steel palette — public/brand/calicon-logo-canvas.png */
export const BRAND_LOGO_SRC = "/brand/calicon-logo-canvas.png";
export const BRAND_LOGO_SRC_COMPACT = "/brand/calicon-logo-canvas-512.png";
/** Untinted official master (blue/silver) */
export const BRAND_LOGO_SRC_OFFICIAL = "/brand/calicon-logo.png";

/** Intrinsic aspect from production asset (738×828) */
export const BRAND_LOGO_ASPECT = 738 / 828;

export type BrandLogoSize = "sm" | "md" | "lg" | "header" | "footer";

/**
 * Color treatment relative to the surface behind the mark.
 * Official mark colors stay intact — wordmark + glow adapt.
 */
export type BrandLogoVariant = "auto" | "on-dark" | "on-light" | "accent";

/** `lockup` matches the official mark-over-wordmark reference. */
export type BrandLogoLayout = "mark" | "lockup";

const SIZE_PX: Record<BrandLogoSize, number> = {
  sm: 40,
  md: 52,
  lg: 72,
  header: 64,
  footer: 72,
};

type BrandLogoProps = {
  size?: BrandLogoSize;
  variant?: BrandLogoVariant;
  layout?: BrandLogoLayout;
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
  layout = "lockup",
  className = "",
  priority = false,
  label = CALICON_SITE_NAME,
}: BrandLogoProps) {
  const height = SIZE_PX[size];
  const width = Math.round(height * BRAND_LOGO_ASPECT);
  const src =
    size === "sm" || size === "md" || size === "header"
      ? BRAND_LOGO_SRC_COMPACT
      : BRAND_LOGO_SRC;
  const decorative = label === "";
  const showWordmark = layout === "lockup";

  return (
    <span
      className={`brand-logo brand-logo--${variant} brand-logo--${size} brand-logo--${layout}${className ? ` ${className}` : ""}`}
      style={{ ["--brand-logo-h" as string]: `${height}px` }}
      data-brand-logo=""
    >
      <Image
        src={src}
        alt={decorative || showWordmark ? "" : label}
        width={width}
        height={height}
        priority={priority}
        className="brand-logo__img"
        sizes={`${width}px`}
        {...(decorative || showWordmark ? { "aria-hidden": true as const } : {})}
      />
      {showWordmark ? (
        <span className="brand-logo__wordmark" aria-hidden>
          CALICON
        </span>
      ) : null}
    </span>
  );
}
