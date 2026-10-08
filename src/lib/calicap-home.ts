import {
  Code2,
  Compass,
  Cpu,
  LayoutTemplate,
  Link2,
  ListChecks,
  MessageSquare,
  RefreshCw,
  Rocket,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { calicapWorkStudies } from "@/lib/calicap-work";
import { CUSTOMER_OUTCOMES } from "@/lib/brand-architecture";
import { siteImages } from "@/lib/site-images";

export const HOME_IMPACT_ID = "impact";

/**
 * Homepage impact / results metrics.
 * Keep values as obvious placeholders (e.g. "XX%") until verified project data exists.
 * Do not invent percentages. When a real value is supplied, prefer a countable form like "37%"
 * so theme UIs can optionally animate a count-up.
 */
export type HomeImpactMetric = {
  /** Display value — use "XX%" until verified; countable forms like "37%" enable count-up */
  value: string;
  label: string;
  /** Compact label for tight Canvas compositions */
  shortLabel: string;
};

export const calicapHomeImpact = {
  title: "Built for measurable impact.",
  body: "Technology designed to help improve growth, efficiency, visibility, and performance.",
  attribution: "Measured impact across selected projects",
  metrics: [
    {
      value: "XX%",
      label: "Increase in qualified leads",
      shortLabel: "Qualified leads",
    },
    {
      value: "XX%",
      label: "Increase in organic traffic",
      shortLabel: "Organic traffic",
    },
    {
      value: "XX%",
      label: "Increase in sales",
      shortLabel: "Sales",
    },
    {
      value: "XX%",
      label: "Reduction in operating costs",
      shortLabel: "Operating costs",
    },
  ] as const satisfies readonly HomeImpactMetric[],
} as const;

/** True when value is a numeric percentage suitable for count-up animation */
export function isCountablePercentValue(value: string): boolean {
  return /^\d+(\.\d+)?%$/.test(value.trim());
}

export const calicapHomeHero = {
  splash: "Build what's next",
  eyebrow: "Software · Digital products · Systems · Automation",
  headlineBefore: "Build",
  headlineAccent: "what's next",
  headlineAfter: ".",
  body:
    "Turn ideas and challenges into digital products, software, intelligent solutions, and technology that moves things forward.",
  primaryCta: "Tell us your problem",
  /** Opens two-path chooser — not a direct form dump */
  primaryOpensChooser: true,
  secondaryCta: "Explore services",
  secondaryHref: "/services",
  bannerSrc: "/images/home-hero-banner.png",
  sideImage: siteImages.heroWorkspace,
} as const;

/** Entry framing (home) */
export const calicapHomeRecognition = {
  bridgeTitle: "Bring the problem. Build the solution.",
  bridgeBody:
    "A clear brief, an early idea, something inefficient, or a system that needs to change — the approach adapts to where things start.",
  problemCtaTitle: "Not sure what the solution should be?",
  problemCtaBody:
    "Tell us what's happening. We'll help figure out what comes next.",
  problemCtaLabel: "Tell us your problem",
  problemCtaOpensChooser: true,
} as const;

export const calicapHomeDiscovery = {
  title: "What we can help you with?",
  intro: "Technology built around what needs to happen next.",
} as const;

export const calicapHomeOutcomes: {
  label: string;
  value: string;
  examples: readonly string[];
  href: string;
  linkLabel: string;
  icon: LucideIcon;
}[] = CUSTOMER_OUTCOMES.map((o) => {
  const icons: Record<string, LucideIcon> = {
    create: LayoutTemplate,
    modernize: Workflow,
    automate: Cpu,
    connect: Link2,
    scale: Rocket,
  };
  return {
    label: o.label,
    value: o.value,
    examples: o.examples,
    href: o.href,
    linkLabel: o.linkLabel,
    icon: icons[o.id] ?? LayoutTemplate,
  };
});

export const calicapHomeEntryDoors: {
  label: string;
  value: string;
  icon: LucideIcon;
}[] = [
  {
    label: "An idea",
    value: "Something new to build — a site, app, platform, or system.",
    icon: Sparkles,
  },
  {
    label: "A requirement",
    value: "What's needed is clear — it just needs to be built well.",
    icon: ListChecks,
  },
  {
    label: "A problem",
    value: "The current way of working isn't working anymore.",
    icon: MessageSquare,
  },
  {
    label: "An existing system",
    value: "Improve, replace, or connect what already exists.",
    icon: RefreshCw,
  },
];

export const calicapHomeWorkSection = {
  title: "What we've built.",
  intro: "Evidence from real projects — challenge, solution, and outcome.",
  browseLabel: "View all work",
  allLabel: "View all work",
  banner: siteImages.teamCollaboration,
} as const;

export const calicapHomeOutcomesSection = {
  title: "Documented outcomes",
  intro: "Results from engagements where the numbers are real and attributable.",
} as const;

export const calicapHomeTestimonialsSection = {
  title: "Trusted by the businesses we work with.",
  intro: "Feedback from people we've built with.",
} as const;

/** Home teaser cards — shared study list with short result lines */
export const calicapHomeWorkTeasers = calicapWorkStudies.map((s) => ({
  slug: s.slug,
  title: s.title,
  label: s.label,
  context: s.context,
  built: s.built,
  result: s.result,
  beforeAfter: s.beforeAfter,
  icon: s.icon,
  imageKey: s.imageKey,
}));

export const calicapHomeProcess = {
  title: "How we work",
  intro: "Problem → Strategy → Solution → Launch → Growth.",
  steps: [
    {
      n: "01",
      t: "Problem",
      d: "Understand what needs to change and why.",
      icon: Compass,
    },
    {
      n: "02",
      t: "Strategy",
      d: "Determine the right technology approach.",
      icon: ListChecks,
    },
    {
      n: "03",
      t: "Solution",
      d: "Design and build what is actually needed.",
      icon: Code2,
    },
    {
      n: "04",
      t: "Launch",
      d: "Put the solution into use.",
      icon: Rocket,
    },
    {
      n: "05",
      t: "Growth",
      d: "Improve, expand, and evolve as needs change.",
      icon: RefreshCw,
    },
  ],
  traitsTitle: "The difference is how we approach the problem.",
  traits: [
    {
      label: "Understand",
      value: "Understand before deciding what to build.",
    },
    {
      label: "Solve",
      value: "Focus on the actual problem, not unnecessary technology.",
    },
    {
      label: "Move",
      value: "Keep work moving without adding unnecessary complexity.",
    },
    {
      label: "Adapt",
      value: "Stay flexible when requirements change.",
    },
    {
      label: "Communicate",
      value: "Keep communication clear.",
    },
    {
      label: "Stay",
      value: "Continue supporting and improving what gets built.",
    },
  ],
} as const;

export const calicapHomeCta = {
  title: "Technology that moves your business forward.",
  bodyLead:
    "No technical specification required to start. Share what you're trying to achieve, what's not working, or what you have in mind.",
  primaryCta: "Tell us your problem",
  primaryOpensChooser: true,
  secondaryCta: "Explore services",
  secondaryHref: "/services",
  workLabel: "selected work",
  bodyTail: "See how similar teams started.",
  backdrop: siteImages.cloudNetwork,
} as const;
