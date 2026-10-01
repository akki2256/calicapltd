import Image from "next/image";
import { CALICON_SITE_NAME } from "@/lib/calicap-contact";

/** Canvas lockup — public/brand/calicon-lockup.svg (cropped official path, 1160×250) */
export const BRAND_LOCKUP_SRC = "/brand/calicon-lockup.svg";
export const BRAND_LOCKUP_ASPECT = 1160 / 250;

/** Calicon theme mark. Kept so that chrome still resolves if the theme is turned back on. */
export const BRAND_LOGO_SRC_OFFICIAL = "/brand/calicon-logo.png";
export const BRAND_LOGO_SRC_OFFICIAL_COMPACT = "/brand/calicon-logo-512.png";

/** Intrinsic aspect of the official Calicon mark (738×828) */
export const BRAND_LOGO_ASPECT = 738 / 828;

export type BrandLogoSize = "sm" | "md" | "lg" | "header" | "footer";

/**
 * Color treatment relative to the surface behind the mark.
 * `calicon` shifts the official mark toward gold for Calicon chrome.
 */
export type BrandLogoVariant = "auto" | "on-dark" | "on-light" | "accent" | "calicon";

/** `canvas` is the horizontal steel lockup. `official` is the Calicon mark. */
export type BrandLogoPalette = "canvas" | "official";

/** `lockup` is the full wordmark treatment. */
export type BrandLogoLayout = "mark" | "lockup";

const SIZE_PX: Record<BrandLogoSize, number> = {
  sm: 40,
  md: 52,
  lg: 72,
  header: 64,
  footer: 72,
};

/** Official lockup is ~4.64:1 — keep Canvas heights short enough for the header. */
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
  layout?: BrandLogoLayout;
  /** Defaults to the Canvas steel lockup */
  palette?: BrandLogoPalette;
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
  palette = "canvas",
  className = "",
  priority = false,
  label = CALICON_SITE_NAME,
}: BrandLogoProps) {
  const canvas = palette === "canvas";
  const height = (canvas ? CANVAS_SIZE_PX : SIZE_PX)[size];
  const aspect = canvas ? BRAND_LOCKUP_ASPECT : BRAND_LOGO_ASPECT;
  const width = Math.round(height * aspect);
  const compact = size === "sm" || size === "md" || size === "header";
  const src = canvas
    ? BRAND_LOCKUP_SRC
    : compact
      ? BRAND_LOGO_SRC_OFFICIAL_COMPACT
      : BRAND_LOGO_SRC_OFFICIAL;
  const decorative = label === "";
  const showWordmark = !canvas && layout === "lockup";
  const layoutClass = canvas ? "horizontal" : layout;

  return (
    <span
      className={`brand-logo brand-logo--${variant} brand-logo--${size} brand-logo--${layoutClass}${canvas ? " brand-logo--canvas" : ""}${className ? ` ${className}` : ""}`}
      style={{ ["--brand-logo-h" as string]: `${height}px` }}
      data-brand-logo=""
    >
      <Image
        src={src}
        alt={decorative || showWordmark ? "" : label}
        width={width}
        height={height}
        priority={priority}
        unoptimized={canvas}
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
