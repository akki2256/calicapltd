/** Shared primary nav — Calicon header/mobile + Canvas rail */
export const PRIMARY_NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
] as const;

/** Desktop Calicon chrome — logo covers Home */
export const CALICON_DESKTOP_NAV_LINKS = PRIMARY_NAV_LINKS;
