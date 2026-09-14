import {
  Code2,
  Compass,
  Gauge,
  Handshake,
  Monitor,
  Palette,
  Smartphone,
  TrendingUp,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { calicapWorkStudies } from "@/lib/calicap-work";
import { siteImages } from "@/lib/site-images";

export const calicapHomeHero = {
  eyebrow: "Websites · organic · paid",
  headlineBefore: "Digital presence that feels",
  headlineAccent: "expensive",
  headlineAfter: "—and converts.",
  bodyLead:
    "Calicon partners with ambitious operators on high-craft websites and measurable marketing. Strategy first, execution without theatre. We ship with current stacks—",
  bodyStack:
    "React, Node.js, Spring, AI features where they make sense, and mobile via native iOS and Android or React Native",
  bodyMid: "—hosted on",
  bodyCloud: ["AWS", "Azure"] as const,
  bodyTail: "to match your security and scale needs.",
  primaryCta: "Start a project",
  secondaryCta: "View selected work",
  engineeringTitle: "Engineering footprint",
  engineeringWebLabel: "Web & APIs:",
  engineeringWeb:
    "React ecosystems, Node.js and Java/Spring services, and product-grade AI integrations (assistants, retrieval, automation) grounded in your data policies.",
  engineeringMobileLabel: "Mobile:",
  engineeringMobile:
    "native SDKs for iOS and Android, or React Native for shared business logic.",
  engineeringCloudLabel: "Cloud:",
  engineeringCloud:
    "AWS and Azure—networking, observability, and releases tuned to how your team operates.",
  bannerSrc: "/images/home-hero-banner.png",
  sideImage: siteImages.heroWorkspace,
} as const;

export const calicapHomeHeroStats: {
  label: string;
  value: string;
  icon: LucideIcon;
}[] = [
  { label: "Core Web Vitals", value: "Built-in", icon: Gauge },
  { label: "Engagement model", value: "Project + growth", icon: Handshake },
  { label: "Delivery", value: "Senior-led, no bait-and-switch", icon: UsersRound },
];

export const calicapHomeServicesSection = {
  title: "Capability across the full funnel",
  intro:
    "Everything tied to acquisition—so design decisions do not fight distribution.",
  image: siteImages.analyticsDashboard,
  overviewLabel: "Services overview",
  workLabel: "Case studies",
} as const;

export const calicapHomeServices: {
  title: string;
  body: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Web app development",
    body: "React-led UIs, Node.js and Spring services, AI integrations where they earn their place—and cloud on AWS or Azure. Built for conversion and iteration.",
    href: "/services/web-app-development",
    icon: Monitor,
  },
  {
    title: "Mobile app development",
    body: "Native iOS and Android, plus React Native when one codebase should carry both stores—wired to the same API and cloud patterns as web.",
    href: "/services/mobile-app-development",
    icon: Smartphone,
  },
];

export const calicapHomeWorkSection = {
  title: "Proof, not posturing",
  intro:
    "Case studies written for decision-makers—constraints, decisions, and outcomes.",
  browseLabel: "Browse all case studies",
  allLabel: "All case studies",
  banner: siteImages.teamCollaboration,
} as const;

/** Home teaser cards — shared study list with short result lines */
export const calicapHomeWorkTeasers = calicapWorkStudies.map((s) => ({
  slug: s.slug,
  title: s.title,
  result: s.result,
  icon: s.icon,
  imageKey: s.imageKey,
}));

export const calicapHomeProcess = {
  title: "How we work",
  intro:
    "Predictable phases, async by default, with live sessions when they save time.",
  image: siteImages.strategySession,
  steps: [
    {
      n: "01",
      t: "Discovery",
      d: "Goals, audience, constraints, and success metrics—locked early.",
      icon: Compass,
    },
    {
      n: "02",
      t: "Design",
      d: "Typography, motion, and UX that match the calibre of your offer.",
      icon: Palette,
    },
    {
      n: "03",
      t: "Build",
      d: "React and modern web tooling, Node.js and Spring for APIs, intentional AI integrations, and hardened AWS or Azure environments.",
      icon: Code2,
    },
    {
      n: "04",
      t: "Grow",
      d: "Content, campaigns, and experiments with reporting you can trust.",
      icon: TrendingUp,
    },
  ],
} as const;

export const calicapHomeCta = {
  title: "Tell us what you are building next.",
  bodyLead: "Share context in a few lines—we reply with",
  fitLabel: "honest fit",
  bodyMid: ", timeline, and a suggested path forward. See",
  workLabel: "selected work",
  bodyTail: "for how we have helped similar teams.",
  primaryCta: "Request a call",
  secondaryCta: "About the practice",
  backdrop: siteImages.cloudNetwork,
} as const;
