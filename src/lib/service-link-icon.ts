import { Monitor, Smartphone, type LucideIcon } from "lucide-react";

export function serviceHrefIcon(href: string): LucideIcon {
  return href.includes("mobile") ? Smartphone : Monitor;
}
