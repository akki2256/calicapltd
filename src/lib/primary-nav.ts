/** Shared flat primary nav — Calicon header/mobile + Canvas rail */
export const PRIMARY_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/build", label: "Build" },
  { href: "/transform", label: "Transform" },
  { href: "/automate", label: "Automate" },
  { href: "/evolve", label: "Evolve" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Desktop Calicon chrome — logo covers Home */
export const CALICON_DESKTOP_NAV_LINKS = PRIMARY_NAV_LINKS.filter(
  (l) => l.href !== "/",
);
