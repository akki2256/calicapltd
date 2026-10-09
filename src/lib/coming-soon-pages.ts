import { calicapQuickLinks } from "@/lib/calicap-contact";

export type ComingSoonPage = (typeof calicapQuickLinks)[number];

export function comingSoonMeta(page: ComingSoonPage) {
  return {
    title: page.label,
    description: `${page.label} — coming soon from Calicon.`,
    path: page.href,
    noIndex: true as const,
  };
}
