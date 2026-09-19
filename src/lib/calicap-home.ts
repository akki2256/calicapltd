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
  secondaryHref: "/build",
  stayOn:
    "Consulting sits with Transform when a plan is needed. Evolve covers support and continuous improvement after launch.",
  bannerSrc: "/images/home-hero-banner.png",
  sideImage: siteImages.heroWorkspace,
} as const;

/** Problem recognition + differentiation */
export const calicapHomeRecognition = {
  title: "Your business is moving forward. Your technology should too.",
  intro:
    "Technology becomes a constraint when it no longer matches how work actually happens.",
  examples: [
    "Too much manual work",
    "Outdated software",
    "Disconnected systems",
    "Processes spread across spreadsheets, email, and multiple tools",
  ],
  differentiator: "We understand before we build.",
  differentiatorLead:
    "You don't need to know exactly what technology you need. You just need to know what you want to achieve.",
  differentiatorBody:
    "Goals, workflows, and direction come first — then the approach that fits. No rigid packages.",
  bridgeTitle: "Bring the problem. Build the solution.",
  bridgeBody:
    "A clear brief, an early idea, something inefficient, or a system that needs to change — the approach adapts to where things start.",
  problemCtaTitle: "Not sure what the solution should be?",
  problemCtaBody:
    "Tell us what's happening. We'll help figure out what comes next.",
  problemCtaLabel: "Tell us your problem",
  problemCtaOpensChooser: true,
} as const;

export const calicapHomePrinciples: {
  label: string;
  value: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Understand",
    value: "Goals, problems, workflows, and future direction — before deciding what to build.",
    icon: Compass,
  },
  {
    label: "Find the right approach",
    value: "Use existing technology where it makes sense. Build custom where it creates real value.",
    icon: ListChecks,
  },
  {
    label: "Build around the real need",
    value: "Technology should fit the way things actually work.",
    icon: Workflow,
  },
  {
    label: "Move & evolve",
    value: "Start with what matters, move efficiently, and adapt as needs change.",
    icon: Rocket,
  },
];

export const calicapHomeDiscovery = {
  title: "What do you need to move forward?",
  intro: "Technology built around what needs to happen next.",
} as const;

export const calicapHomeOutcomes: {
  label: string;
  value: string;
  examples: readonly string[];
  href: string;
  linkLabel: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Create",
    value: "Build something new.",
    examples: ["Applications", "Software", "Digital products", "Platforms"],
    href: "/build",
    linkLabel: "Explore Build",
    icon: LayoutTemplate,
  },
  {
    label: "Modernize",
    value: "Improve technology that no longer fits.",
    examples: ["Existing software", "Websites", "Business systems", "Digital operations"],
    href: "/transform",
    linkLabel: "Explore Transform",
    icon: Workflow,
  },
  {
    label: "Automate",
    value: "Remove repetitive work.",
    examples: ["Workflows", "Manual processes", "Customer interactions", "Routine operations"],
    href: "/automate",
    linkLabel: "Explore Automate",
    icon: Cpu,
  },
  {
    label: "Connect",
    value: "Bring systems, data, and workflows together.",
    examples: ["APIs", "Integrations", "Connected systems", "Data flows"],
    href: "/build",
    linkLabel: "Explore integrations",
    icon: Link2,
  },
  {
    label: "Scale",
    value: "Grow with changing needs.",
    examples: ["Continuous development", "Improved systems", "Expanded functionality", "Ongoing support"],
    href: "/evolve",
    linkLabel: "Explore Evolve",
    icon: Rocket,
  },
];

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

export const calicapHomeServicesSection = {
  title: "We build technology around your business.",
  intro:
    "Four ways in — create what's needed, modernize what exists, remove manual work, and keep systems moving as requirements change.",
  image: siteImages.analyticsDashboard,
  overviewLabel: "Explore Build",
  workLabel: "Case studies",
} as const;

export const calicapHomeServices: {
  title: string;
  body: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Build",
    body: "Applications, software, digital products, and integrations — from a defined requirement, a rough idea, or a real-world problem.",
    href: "/build",
    icon: LayoutTemplate,
  },
  {
    title: "Transform",
    body: "Modernize websites, systems, workflows, and digital operations so technology works better for how things operate today.",
    href: "/transform",
    icon: Workflow,
  },
  {
    title: "Automate",
    body: "Remove repetitive work through workflow automation, practical AI applications, chatbots, and integrations.",
    href: "/automate",
    icon: Cpu,
  },
  {
    title: "Evolve",
    body: "Maintain, improve, extend, and continuously develop technology as requirements change.",
    href: "/evolve",
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
  secondaryHref: "/build",
  workLabel: "selected work",
  bodyTail: "See how similar teams started.",
  backdrop: siteImages.cloudNetwork,
} as const;
