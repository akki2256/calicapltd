/**
 * Calicon brand architecture — master brand + capability framework.
 *
 * CALICON is the only company identity.
 * Build · Transform · Automate · Evolve are customer-facing capabilities,
 * not divisions. Internals may combine them; customers should not need
 * to understand the map before starting a conversation.
 *
 * Products, industries, and technologies are relational tags only.
 * No empty product/industry/geo pages are published from this module.
 */
import {
  Cpu,
  LayoutTemplate,
  RefreshCw,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const MASTER_BRAND = "Calicon";

export const PILLAR_IDS = ["build", "transform", "automate", "evolve"] as const;
export type PillarId = (typeof PILLAR_IDS)[number];

export type EngagementModel = "project" | "ongoing" | "multi-project";

export type CaliconDescriptorContext =
  | "default"
  | "software"
  | "digital"
  | "partner";

/** Contextual company descriptors — brand name stays Calicon */
export const CALICON_DESCRIPTORS: Record<CaliconDescriptorContext, string> = {
  default: "technology company",
  software: "software and technology company",
  digital: "digital solutions company",
  partner: "technology partner",
};

export function caliconDescriptor(
  context: CaliconDescriptorContext = "default",
): string {
  return CALICON_DESCRIPTORS[context];
}

export type PillarRecord = {
  id: PillarId;
  label: string;
  href: `/${PillarId}`;
  tagline: string;
  /** Home / nav summary — outcome language, not a division pitch */
  summary: string;
  icon: LucideIcon;
};

export const PILLARS: readonly PillarRecord[] = [
  {
    id: "build",
    label: "Build",
    href: "/build",
    tagline: "Create what's needed.",
    summary:
      "Applications, software, digital products, and integrations — from a defined requirement, a rough idea, or a real-world problem.",
    icon: LayoutTemplate,
  },
  {
    id: "transform",
    label: "Transform",
    href: "/transform",
    tagline: "Modernize what already exists.",
    summary:
      "Modernize websites, systems, workflows, and digital operations so technology works better for how things operate today.",
    icon: Workflow,
  },
  {
    id: "automate",
    label: "Automate",
    href: "/automate",
    tagline: "Remove unnecessary manual work.",
    summary:
      "Remove repetitive work through workflow automation, practical AI applications, chatbots, and integrations.",
    icon: Cpu,
  },
  {
    id: "evolve",
    label: "Evolve",
    href: "/evolve",
    tagline: "Keep technology moving.",
    summary:
      "Maintain, improve, extend, and continuously develop technology as requirements change.",
    icon: RefreshCw,
  },
];

export function getPillar(id: PillarId): PillarRecord {
  return PILLARS.find((p) => p.id === id)!;
}

export function isPillarId(value: string | null | undefined): value is PillarId {
  return PILLAR_IDS.includes(value as PillarId);
}

export type ServiceRecord = {
  id: string;
  pillar: PillarId;
  title: string;
  body: string;
  /** Live routes only — omit until a real page exists */
  hrefs?: readonly string[];
  technologies?: readonly string[];
};

/**
 * Individual capabilities under each pillar.
 * Titles/bodies match the existing pillar pages — no invented services.
 */
export const SERVICES: readonly ServiceRecord[] = [
  {
    id: "web-mobile-apps",
    pillar: "build",
    title: "Web & mobile applications",
    body: "Digital experiences built around customers and day-to-day workflows.",
    hrefs: ["/services/web-app-development", "/services/mobile-app-development"],
  },
  {
    id: "custom-software",
    pillar: "build",
    title: "Custom software",
    body: "Software designed around the way operations actually run.",
  },
  {
    id: "digital-products",
    pillar: "build",
    title: "Digital products",
    body: "Turn an idea into a product people can use.",
  },
  {
    id: "apis-integrations",
    pillar: "build",
    title: "APIs & integrations",
    body: "Connect systems, move data, and reduce disconnected workflows.",
  },
  {
    id: "web-ecommerce",
    pillar: "transform",
    title: "Web & e-commerce",
    body: "Better digital experiences and stronger online operations.",
  },
  {
    id: "business-management-systems",
    pillar: "transform",
    title: "Business management systems",
    body: "ERP, CRM, HRMS, and automation systems built around how the organization works.",
  },
  {
    id: "digital-transformation",
    pillar: "transform",
    title: "Digital transformation",
    body: "Improve the way work gets done through better technology.",
  },
  {
    id: "technology-consulting",
    pillar: "transform",
    title: "Technology consulting",
    body: "Think with us. Build with us. Clarity on what to build, change, connect, or improve.",
  },
  {
    id: "ai-applications",
    pillar: "automate",
    title: "AI applications",
    body: "Practical AI applications and intelligent functionality inside useful products and processes.",
  },
  {
    id: "ai-chatbots",
    pillar: "automate",
    title: "AI chatbots & assistants",
    body: "Customer interactions, internal assistance, knowledge access, and workflow-connected conversations.",
  },
  {
    id: "workflow-automation",
    pillar: "automate",
    title: "Workflow automation",
    body: "Repetitive processes, approvals, notifications, data movement, and routine operations.",
  },
  {
    id: "ai-integrations",
    pillar: "automate",
    title: "AI integrations",
    body: "Connect AI capabilities to existing systems and AI-enabled workflows.",
  },
  {
    id: "application-maintenance",
    pillar: "evolve",
    title: "Application maintenance",
    body: "Fixes, reliability, improvements, updates, and ongoing development.",
  },
  {
    id: "website-maintenance",
    pillar: "evolve",
    title: "Website maintenance",
    body: "Updates, fixes, improvements, content and functional changes, ongoing development.",
  },
  {
    id: "amc-support",
    pillar: "evolve",
    title: "AMC & support",
    body: "An ongoing technology relationship — maintenance, issue resolution, improvements, and continued development.",
  },
  {
    id: "continuous-development",
    pillar: "evolve",
    title: "Continuous development",
    body: "New features, improvements, product evolution, and long-term development as requirements change.",
  },
];

export function getService(id: string) {
  return SERVICES.find((s) => s.id === id);
}

export function getServicesForPillar(pillar: PillarId) {
  return SERVICES.filter((s) => s.pillar === pillar);
}

/** Customer-language goals — not internal service names */
export type CustomerOutcome = {
  id: string;
  label: string;
  value: string;
  examples: readonly string[];
  primaryPillar: PillarId;
  relatedPillars: readonly PillarId[];
  relatedServiceIds: readonly string[];
  href: string;
  linkLabel: string;
};

export const CUSTOMER_OUTCOMES: readonly CustomerOutcome[] = [
  {
    id: "create",
    label: "Create",
    value: "Build something new.",
    examples: ["Applications", "Software", "Digital products", "Platforms"],
    primaryPillar: "build",
    relatedPillars: ["build"],
    relatedServiceIds: ["web-mobile-apps", "custom-software", "digital-products"],
    href: "/build",
    linkLabel: "Explore Build",
  },
  {
    id: "modernize",
    label: "Modernize",
    value: "Improve technology that no longer fits.",
    examples: ["Existing software", "Websites", "Business systems", "Digital operations"],
    primaryPillar: "transform",
    relatedPillars: ["transform", "evolve"],
    relatedServiceIds: [
      "web-ecommerce",
      "business-management-systems",
      "digital-transformation",
    ],
    href: "/transform",
    linkLabel: "Explore Transform",
  },
  {
    id: "automate",
    label: "Automate",
    value: "Remove repetitive work.",
    examples: ["Workflows", "Manual processes", "Customer interactions", "Routine operations"],
    primaryPillar: "automate",
    relatedPillars: ["automate", "transform"],
    relatedServiceIds: ["workflow-automation", "ai-applications", "ai-chatbots"],
    href: "/automate",
    linkLabel: "Explore Automate",
  },
  {
    id: "connect",
    label: "Connect",
    value: "Bring systems, data, and workflows together.",
    examples: ["APIs", "Integrations", "Connected systems", "Data flows"],
    primaryPillar: "build",
    relatedPillars: ["build", "automate"],
    relatedServiceIds: ["apis-integrations", "ai-integrations", "workflow-automation"],
    href: "/build",
    linkLabel: "Explore integrations",
  },
  {
    id: "scale",
    label: "Scale",
    value: "Grow with changing needs.",
    examples: [
      "Continuous development",
      "Improved systems",
      "Expanded functionality",
      "Ongoing support",
    ],
    primaryPillar: "evolve",
    relatedPillars: ["evolve", "build"],
    relatedServiceIds: [
      "continuous-development",
      "amc-support",
      "application-maintenance",
    ],
    href: "/evolve",
    linkLabel: "Explore Evolve",
  },
];

export function getOutcome(id: string) {
  return CUSTOMER_OUTCOMES.find((o) => o.id === id);
}

export function getOutcomesForPillar(pillar: PillarId) {
  return CUSTOMER_OUTCOMES.filter(
    (o) => o.primaryPillar === pillar || o.relatedPillars.includes(pillar),
  );
}

/**
 * Industry tags for work/examples only — never top-level routes.
 */
export type IndustryTag = {
  id: string;
  label: string;
};

export const INDUSTRY_TAGS: readonly IndustryTag[] = [
  { id: "financial-services", label: "Financial services" },
  { id: "fitness-wellness", label: "Fitness & wellness" },
  { id: "healthcare", label: "Healthcare" },
  { id: "education", label: "Education" },
  { id: "retail-ecommerce", label: "Retail & e-commerce" },
  { id: "restaurants", label: "Restaurants" },
];

export function getIndustryTag(id: string) {
  return INDUSTRY_TAGS.find((i) => i.id === id);
}

/**
 * Future Calicon-owned products associate with a pillar.
 * Keep empty until a real product exists — do not publish placeholder pages.
 */
export type ProductRecord = {
  id: string;
  name: string;
  pillar: PillarId;
  relatedServiceIds?: readonly string[];
  /** Own landing page / app / domain when the product is independent enough */
  href?: string;
  status: "live" | "private";
};

export const PRODUCTS: readonly ProductRecord[] = [];

export function getLiveProducts() {
  return PRODUCTS.filter((p) => p.status === "live" && Boolean(p.href));
}

export function getProductsForPillar(pillar: PillarId) {
  return PRODUCTS.filter((p) => p.pillar === pillar);
}

export const SERVICE_PAGE_PATHS = SERVICES.flatMap((s) => s.hrefs ?? []);

export const PILLAR_PATHS = PILLARS.map((p) => p.href);
