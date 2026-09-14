/**
 * Single source for Calicon NAP, form copy, and contact-related constants.
 */
export const CALICON_SITE_NAME = "Calicon";

export const calicapContact = {
  brand: CALICON_SITE_NAME,
  email: process.env.CONTACT_INBOX_EMAIL ?? "",
  locale: "en_GB",
  footerBlurb:
    "Turn business ideas and challenges into digital products, custom software, and AI — then stay after launch.",
  page: {
    eyebrow: "Contact",
    title: "Start with context.",
    intro:
      "The more specifics you share—offer, timeline, constraints—the faster we can respond with an honest view on fit. If we are not the right team, we will say so and suggest alternatives.",
    bullets: [
      "Typical first reply: one to two business days",
      "Early calls are calendar-based once qualified",
      "Remote-first; onsite available for the right programme",
    ] as const,
  },
  formSuccess: {
    title: "Thanks — we have your note.",
    body: "You will hear back shortly. If your project is urgent, reply to the confirmation email once connected.",
  },
} as const;

export const calicapFooterLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/services/web-app-development", label: "Web app development" },
  { href: "/services/mobile-app-development", label: "Mobile app development" },
  { href: "/work", label: "Work" },
  { href: "/privacy", label: "Privacy" },
] as const;
