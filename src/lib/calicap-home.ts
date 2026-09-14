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
import { siteImages } from "@/lib/site-images";

export const HOME_POSITIONING_ID = "positioning";
export const HOME_BUILD_ID = "what-we-build";

export const calicapHomeHero = {
  splash: "Build what's next",
  eyebrow: "Software · Digital products · AI & automation · Transformation",
  headlineBefore: "Build",
  headlineAccent: "what's next",
  headlineAfter: ".",
  body:
    "We turn business ideas and operational challenges into digital products, custom software, and technology that fits how the business already works — then stay as it evolves.",
  primaryCta: "Start a project",
  secondaryCta: "Explore what we build",
  stayOn:
    "Consulting and ongoing maintenance sit behind the work — architecture when you need a plan, support when the product is live.",
  bannerSrc: "/images/home-hero-banner.png",
  sideImage: siteImages.heroWorkspace,
} as const;

/** Recognition + clarity chapter immediately after the hero */
export const calicapHomeRecognition = {
  title: "Your business shouldn't have to work around its technology.",
  body:
    "Businesses often outgrow spreadsheets, manual processes, disconnected tools, and software that no longer fits how they operate. When that happens, the cost shows up as wasted time, slow operations, and friction that gets harder to grow past.",
  differentiator:
    "You don't need to know exactly what technology you need. You just need to know what you want to achieve.",
  bridgeTitle: "Bring us the problem. We'll help build the solution.",
  bridgeBody:
    "Whether you have a clear specification, an early idea, or simply know that something needs to work better — we help define the approach and turn it into working technology.",
} as const;

export const calicapHomeOutcomes: {
  label: string;
  value: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Automate",
    value: "Reduce repetitive and manual work that eats the day.",
    icon: Cpu,
  },
  {
    label: "Modernize",
    value: "Replace outdated systems and processes that no longer fit.",
    icon: Workflow,
  },
  {
    label: "Connect",
    value: "Bring disconnected tools and workflows into one picture.",
    icon: Link2,
  },
  {
    label: "Build",
    value: "Turn ideas and opportunities into products that ship.",
    icon: LayoutTemplate,
  },
];

export const calicapHomeEntryDoors: {
  label: string;
  value: string;
  icon: LucideIcon;
}[] = [
  {
    label: "An idea",
    value: "You want to build something — site, app, platform, or system.",
    icon: Sparkles,
  },
  {
    label: "A requirement",
    value: "You know exactly what you need and need it built well.",
    icon: ListChecks,
  },
  {
    label: "A problem",
    value: "The current way of working isn't working anymore.",
    icon: MessageSquare,
  },
  {
    label: "An existing system",
    value: "Improve, replace, or connect what you already have.",
    icon: RefreshCw,
  },
];

export const calicapHomeServicesSection = {
  title: "What we take on",
  intro:
    "What we can actually build for you. Consulting and after-launch support sit with the engagement — not as a separate shop window.",
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
    title: "Digital products",
    body: "Websites, web apps, and mobile — designed to convert and built to iterate. Marketing sites and product UIs in the same craft.",
    href: "/services",
    icon: LayoutTemplate,
  },
  {
    title: "Custom software",
    body: "Business systems shaped to how the floor already works — CRM, workflows, integrations — not a generic package the team has to bend around.",
    href: "/work/calicap-india",
    icon: Workflow,
  },
  {
    title: "AI & automation",
    body: "Follow-ups, intake, and the repetitive steps inside a real process. AI where it removes work — not a chatbot bolted on for the slide.",
    href: "/services/web-app-development",
    icon: Cpu,
  },
];

export const calicapHomeWorkSection = {
  title: "Proof, not posturing",
  intro:
    "Two recent engagements, written for decision-makers — constraints, decisions, and outcomes.",
  browseLabel: "Browse case studies",
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
    "You do not need a perfect technical brief to start. We understand the business, define the right approach, build it, launch it, and stay as it evolves.",
  steps: [
    {
      n: "01",
      t: "Understand",
      d: "Business, requirements, and what success actually looks like.",
      icon: Compass,
    },
    {
      n: "02",
      t: "Define",
      d: "The right solution, scope, and technology approach — honest about what we will not build.",
      icon: ListChecks,
    },
    {
      n: "03",
      t: "Build",
      d: "Design, develop, integrate, and test until it fits how the team already works.",
      icon: Code2,
    },
    {
      n: "04",
      t: "Launch",
      d: "Deploy and get it into operation — not a handoff that leaves you guessing.",
      icon: Rocket,
    },
    {
      n: "05",
      t: "Evolve",
      d: "Maintain, improve, automate, and scale as the business grows.",
      icon: RefreshCw,
    },
  ],
  traits: [
    {
      label: "Understand",
      value: "We take the time to hear what the business actually needs.",
    },
    {
      label: "Flexible",
      value: "Solutions shaped around the work — not rigid packages.",
    },
    {
      label: "Stay",
      value: "Maintenance and continuous improvement after launch.",
    },
  ],
} as const;

export const calicapHomeCta = {
  title: "Have an idea? A problem? Let's build what's next.",
  bodyLead:
    "Whether you know exactly what you need or only know that something needs to change — a few lines of context is enough. We reply with",
  fitLabel: "honest fit",
  bodyMid: ", timeline, and a suggested path. See",
  workLabel: "selected work",
  bodyTail: "for how we have helped similar teams.",
  primaryCta: "Start a project",
  secondaryCta: "Talk to us",
  backdrop: siteImages.cloudNetwork,
} as const;
