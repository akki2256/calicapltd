/** Shared flat primary nav — Calicon header/mobile + Canvas rail */
import { PILLARS } from "@/lib/brand-architecture";

export const PRIMARY_NAV_LINKS = [
  { href: "/", label: "Home" },
  ...PILLARS.map((p) => ({ href: p.href, label: p.label })),
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Desktop Calicon chrome — logo covers Home */
export const CALICON_DESKTOP_NAV_LINKS = PRIMARY_NAV_LINKS.filter(
  (l) => l.href !== "/",
);
