/**
 * Delivery architecture — how Calicon executes work.
 *
 * Distinct from the customer journey on the homepage
 * (Problem → Strategy → Solution → Launch → Growth).
 * That journey is how we think about a transformation.
 * This module is how we deliver: Envision → Create → Transform.
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
  RefreshCw,
  Scale,
  Shield,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const DELIVERY_PROCESS = {
  title: "How we deliver",
  intro: "A delivery approach suited to the project — not a single methodology for every engagement.",
  principle:
    "Envision the work. Create it properly. Transform it as needs change.",
  sequence: "Envision → Create → Transform",
  steps: [
    {
      n: "01",
      t: "Envision",
      lead: "Understand the need, then plan enough to start",
      bullets: [
        "Clarify the goal, problem, people involved, and constraints",
        "Define what success looks like before choosing a solution",
        "Set scope, direction, and technology to match the complexity",
        "Plan enough to start well — not process for its own sake",
      ],
      icon: Eye,
    },
    {
      n: "02",
      t: "Create",
      lead: "Build, prove, and put it into operation",
      bullets: [
        "Design, develop, and integrate without unnecessary process",
        "Iterate where it helps and keep the work moving",
        "Test as part of delivery",
        "Deploy, hand over, and support the transition as the engagement needs",
      ],
      icon: Boxes,
    },
    {
      n: "03",
      t: "Transform",
      lead: "Keep improving when it is useful",
      bullets: [
        "Support the solution after launch",
        "Maintain and improve the system as priorities change",
        "Take on new work when business demands",
        "Be the long-term tech partner businesses need",
      ],
      icon: RefreshCw,
    },
  ] as const satisfies readonly {
    n: string;
    t: string;
    lead: string;
    bullets: readonly string[];
    icon: LucideIcon;
  }[],
} as const;

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
