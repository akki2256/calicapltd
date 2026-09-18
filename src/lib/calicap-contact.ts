/**
 * Single source for Calicon NAP, form copy, and contact-related constants.
 */
export const CALICON_SITE_NAME = "Calicon";

export const calicapContact = {
  brand: CALICON_SITE_NAME,
  email: process.env.CONTACT_INBOX_EMAIL ?? "",
  locale: "en_US",
  footerBlurb:
    "Technology built around what needs to happen next — from ideas and problems to digital products, practical automation, and everything that comes after launch.",
  footerTagline: "Think with us. Build with us. Grow with us.",
  footerCtaPrompt: "Have an idea, problem, or project in mind?",
  footerCtaBody: "Tell us what's happening.",
  footerCtaLabel: "Tell us your problem",
  footerCtaHref: "/contact",
  page: {
    eyebrow: "Contact",
    title: "Tell us your problem.",
    intro:
      "Whether the requirement is clear or still taking shape, share a little context and we'll take it from there.",
    bullets: [
      "Every note is reviewed personally",
      "Follow-up happens once the context is understood",
      "Remote-first; onsite when the work needs it",
    ] as const,
  },
  formSuccess: {
    title: "Thanks for reaching out.",
    body: "We'll review your requirements and someone from our team will contact you.",
  },
} as const;

export const calicapFooterLinks = [
  { href: "/build", label: "Build" },
  { href: "/transform", label: "Transform" },
  { href: "/automate", label: "Automate" },
  { href: "/evolve", label: "Evolve" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
] as const;
