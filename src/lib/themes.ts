export const THEMES = [
  {
    id: "calicon",
    label: "Calicon",
    description: "Steel grey & gold",
  },
  {
    id: "canvas",
    label: "Canvas Group",
    description: "Dark editorial",
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "canvas";

export const THEME_STORAGE_KEY = "calicon-theme";

/** @deprecated migrated to THEME_STORAGE_KEY */
export const LEGACY_THEME_STORAGE_KEY = "calicap-theme";

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return value === "calicon" || value === "canvas";
}

export const CANVAS_NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;
