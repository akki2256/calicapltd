/**
 * Single source for Calicon NAP, form copy, and contact-related constants.
 */
import { PILLARS } from "@/lib/brand-architecture";
import { CONTACT_DELIVERY_NOTE } from "@/lib/delivery-architecture";

export const CALICON_SITE_NAME = "Calicon";

export const calicapContact = {
  brand: CALICON_SITE_NAME,
  email: process.env.CONTACT_INBOX_EMAIL ?? "info@calicon.com",
  /** Display placeholder until a live number is confirmed */
  phone: "+1 (000) 000-0000",
  phoneHref: "tel:+10000000000",
  locale: "en_US",
  footerBlurb:
    "Technology built around what needs to happen next — from ideas and problems to digital products, practical automation, and everything that comes after launch.",
  footerTagline: "Think with us. Build with us. Grow with us.",
  footerCtaPrompt: "Have an idea, problem, or project in mind?",
  footerCtaBody: "Tell us what's happening.",
  footerCtaLabel: "Tell us your problem",
  footerCtaHref: "/contact",
  /** Update hrefs when live profiles are ready */
  social: [
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/calicon" },
    { id: "x", label: "X", href: "https://x.com/calicon" },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/calicon" },
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/calicon" },
  ] as const,
  page: {
    eyebrow: "Contact",
    title: "Tell us your problem.",
    intro:
      "Whether the requirement is clear or still taking shape, share a little context and we'll take it from there.",
    bullets: [
      "Every note is reviewed personally",
      "Follow-up happens once the context is understood",
      CONTACT_DELIVERY_NOTE,
      "Remote-first; onsite when the work needs it",
    ] as const,
  },
  formSuccess: {
    title: "Thanks for reaching out.",
    body: "We'll review your requirements and someone from our team will contact you.",
  },
} as const;

export const calicapFooterLinks = [
  ...PILLARS.map((p) => ({ href: p.href, label: p.label })),
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
] as const;

export const calicapQuickLinks = [
  { href: "/faqs", label: "FAQs" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/online-safety", label: "Online Safety" },
] as const;
