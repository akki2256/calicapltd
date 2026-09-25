/**
 * Delivery architecture — how Calicon executes work.
 *
 * Distinct from the customer journey on the homepage
 * (Problem → Strategy → Solution → Launch → Growth).
 * That journey is how we think about a transformation.
 * This module is how we deliver: Understand → Plan → Build → Test → Launch → Evolve.
 *
 * Depth is flexible by project. Do not invent capabilities or certifications.
 * Future Calicon-owned products, when they exist, belong under the relevant pillar —
 * not a separate Products section.
 */
import {
  BadgeCheck,
  Boxes,
  Eye,
  Handshake,
  PenLine,
  RefreshCw,
  Rocket,
  Scale,
  Shield,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { PillarId } from "@/lib/brand-architecture";

export const DELIVERY_PROCESS = {
  eyebrow: "Delivery",
  title: "How we deliver",
  intro: "A delivery approach suited to the project — not a single methodology for every engagement.",
  principle:
    "Understand the problem. Choose what fits. Build it properly. Test it thoroughly. Launch it confidently. Keep improving when needed.",
  /** Glanceable sequence chips — mirrors principle without the prose */
  principleBeats: [
    "Understand",
    "Choose",
    "Build",
    "Test",
    "Launch",
    "Improve",
  ] as const,
  sequence: "Understand → Plan → Build → Test → Launch → Evolve",
  steps: [
    {
      n: "01",
      t: "Understand",
      lead: "Before deciding what to build",
      d: "The goal, the problem, the people involved, the constraints, and what success looks like — before deciding what to build.",
      icon: Eye,
    },
    {
      n: "02",
      t: "Plan",
      lead: "Enough to start well",
      d: "Scope, solution direction, technology, and a delivery approach that matches the complexity — enough to start well, not a ceremony for its own sake.",
      icon: PenLine,
    },
    {
      n: "03",
      t: "Build",
      lead: "Keep the work moving",
      d: "Design, develop, and integrate. Iterate where it helps. Keep the work moving without adding unnecessary process.",
      icon: Boxes,
    },
    {
      n: "04",
      t: "Test",
      lead: "Thorough by default",
      d: "Quality is part of delivery, not a leftover step. Testing depth follows the system — thorough by default, never theatrical.",
      icon: BadgeCheck,
    },
    {
      n: "05",
      t: "Launch",
      lead: "Into real operation",
      d: "Put the solution into operation: deploy, hand over, and support the transition in the way the engagement needs.",
      icon: Rocket,
    },
    {
      n: "06",
      t: "Evolve",
      lead: "Improve when useful",
      d: "A defined support period after launch. Ongoing maintenance, improvements, and new work when they are useful — not a required contract.",
      icon: RefreshCw,
    },
  ] as const satisfies readonly {
    n: string;
    t: string;
    lead: string;
    d: string;
    icon: LucideIcon;
  }[],
} as const;

/** Homepage — short, sits under the existing customer journey */
export const DELIVERY_HOME_NOTE =
  "That's how we think about the work. How we execute — understand, plan, build, test, launch, evolve — scales with the project's complexity. Simple work starts efficiently. Complex work gets deeper discovery, architecture, and testing.";

export const DELIVERY_PRACTICES = [
  {
    label: "Discovery",
    lead: "Understand before we build",
    value:
      "Straightforward projects clarify objectives, scope, and constraints, then move. Uncertain or complex work gets deeper attention — workflows, integrations, risks, and success criteria. Not every project is a consulting engagement.",
    icon: Eye,
  },
  {
    label: "Technology",
    lead: "Use what's right. Build what's necessary.",
    value:
      "Choices follow requirements, maintainability, integration, security, and the client's environment — not a stack we happen to like.",
    icon: Wrench,
  },
  {
    label: "Scope",
    lead: "Structured enough. Flexible enough.",
    value:
      "We agree a baseline, then treat legitimate change as something to understand — including impact on cost and timeline. Not rigid. Not unlimited.",
    icon: Scale,
  },
  {
    label: "Quality",
    lead: "Testing is part of the work",
    value:
      "Functional, integration, regression, and the checks the system actually needs. Comprehensive by default does not mean applying enterprise process to a small, well-scoped build.",
    icon: BadgeCheck,
  },
  {
    label: "Security",
    lead: "A baseline on every project",
    value:
      "Considered from discovery through maintenance. Depth follows data sensitivity, access, and risk. This is how we build software — not a cybersecurity service.",
    icon: Shield,
  },
  {
    label: "Launch & after",
    lead: "Practical handover. Support when useful.",
    value:
      "What someone needs to operate and maintain the solution. Deployment fits the engagement. Ongoing support, AMC, and further development are available through Evolve — never forced.",
    icon: Handshake,
  },
] as const satisfies readonly {
  label: string;
  lead: string;
  value: string;
  icon: LucideIcon;
}[];


export const PILLAR_DELIVERY: Record<
  PillarId,
  { title: string; body: string }
> = {
  build: {
    title: "Delivery on Build",
    body: "Whether the brief is clear or still forming, we define enough to start well — then build around how the work actually happens. A focused application stays straightforward. A larger system gets deeper architecture, integration, and testing.",
  },
  transform: {
    title: "Delivery on Transform",
    body: "We start with how things operate today. The plan can be a focused modernization or a broader change in systems and workflows — not a package dropped onto the business. Change is controlled so the operation can keep running.",
  },
  automate: {
    title: "Delivery on Automate",
    body: "We look at the work being done by hand, then automate where it creates time, consistency, or fewer errors. AI is used when it is the right tool — not as the default. Testing follows the workflow, not a generic checklist.",
  },
  evolve: {
    title: "Delivery on Evolve",
    body: "Launch is not always the end. After a defined support period, maintenance, improvements, and new work can continue when they are useful — including AMC. Not every engagement needs a long-term contract.",
  },
};

export const SERVICE_DELIVERY: Record<
  "web-app-development" | "mobile-app-development",
  { title: string; body: string }
> = {
  "web-app-development": {
    title: "How this work is delivered",
    body: "We understand the experience, the conversion path, and how the site will be run — then build and test it for the screens and workflows that matter. A marketing site does not inherit the process of a large operating system.",
  },
  "mobile-app-development": {
    title: "How this work is delivered",
    body: "We clarify the product, the platforms, and how it will be used — then design, build, and validate on the devices that matter. Architecture and testing follow the product, not a template.",
  },
};

export const CONTACT_DELIVERY_NOTE =
  "Discovery and delivery adapt to what you bring. A clear brief can start quickly; an uncertain one gets more definition first.";
