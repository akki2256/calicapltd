/**
 * Calicon service catalogue — single source of truth for the Services page.
 *
 * Nine delivery categories with individual services. Distinct from the
 * Build · Transform · Automate · Evolve brand pillars and from the five
 * customer outcomes (Create / Modernize / Automate / Integrate / Scale).
 *
 * Do not invent offerings here. Do not duplicate a service across categories.
 */
import type { PillarId } from "@/lib/brand-architecture";

/** Live detail routes that catalogue items may point to */
export const CATALOGUE_KNOWN_ROUTES = [
  "/services/web-app-development",
  "/services/mobile-app-development",
] as const;

export type CatalogueKnownRoute = (typeof CATALOGUE_KNOWN_ROUTES)[number];

export const SERVICE_CATEGORY_IDS = [
  "web-development",
  "mobile-app-development",
  "custom-software-development",
  "business-management-systems",
  "ai-automation",
  "api-system-integration",
  "ui-ux-design",
  "technology-consulting",
  "maintenance-support",
] as const;

export type ServiceCategoryId = (typeof SERVICE_CATEGORY_IDS)[number];

export type CatalogueService = {
  id: string;
  name: string;
  categoryId: ServiceCategoryId;
  /** Concise scope when the UI needs more than the name */
  description: string;
  /** Existing detail route only — omit until a real page exists */
  href?: CatalogueKnownRoute;
};

export type CatalogueCategory = {
  id: ServiceCategoryId;
  name: string;
  description: string;
  /** Optional brand-pillar affinity for navigation context — not a category */
  relatedPillar: PillarId;
  services: readonly CatalogueService[];
};

/**
 * Approved catalogue order. Every service appears in exactly one category.
 *
 * Workflow Automation and Business Process Automation stay distinct:
 * workflows = task/step automation; BPA = end-to-end multi-team processes.
 */
export const SERVICE_CATALOGUE: readonly CatalogueCategory[] = [
  {
    id: "web-development",
    name: "Web Development",
    description:
      "Sites, web applications, commerce, and portals built around how customers and teams use them.",
    relatedPillar: "build",
    services: [
      {
        id: "website-design-development",
        name: "Website Design & Development",
        categoryId: "web-development",
        description:
          "Marketing and corporate websites — information architecture, design, and build in one engagement.",
      },
      {
        id: "web-application-development",
        name: "Web Application Development",
        categoryId: "web-development",
        description:
          "Interactive web products and tools beyond a content site — workflows, accounts, and ongoing product use.",
        href: "/services/web-app-development",
      },
      {
        id: "ecommerce-development",
        name: "E-commerce Development",
        categoryId: "web-development",
        description:
          "Online stores and commerce experiences — catalogue, checkout, and operations as one offering.",
      },
      {
        id: "wordpress-development",
        name: "WordPress Development",
        categoryId: "web-development",
        description:
          "WordPress sites and themes when the platform is the right fit — not a separate design or CMS track.",
      },
      {
        id: "content-management-systems",
        name: "Content Management Systems (CMS)",
        categoryId: "web-development",
        description:
          "CMS selection, setup, and content models editors can run without a black box.",
      },
      {
        id: "customer-partner-portals",
        name: "Customer & Partner Portals",
        categoryId: "web-development",
        description:
          "Logged-in portals that replace spreadsheets, email chains, and ad-hoc file sharing.",
      },
    ],
  },
  {
    id: "mobile-app-development",
    name: "Mobile App Development",
    description:
      "Native and cross-platform mobile products designed around real customer and team use.",
    relatedPillar: "build",
    services: [
      {
        id: "ios-app-development",
        name: "iOS App Development",
        categoryId: "mobile-app-development",
        description: "Native iOS applications with store-ready delivery and a maintainable backend path.",
        href: "/services/mobile-app-development",
      },
      {
        id: "android-app-development",
        name: "Android App Development",
        categoryId: "mobile-app-development",
        description: "Native Android applications built for device reality and long-term release hygiene.",
        href: "/services/mobile-app-development",
      },
      {
        id: "cross-platform-app-development",
        name: "Cross-Platform App Development",
        categoryId: "mobile-app-development",
        description:
          "Shared-code mobile products when one codebase is the right delivery trade-off.",
        href: "/services/mobile-app-development",
      },
      {
        id: "custom-mobile-applications",
        name: "Custom Mobile Applications",
        categoryId: "mobile-app-development",
        description:
          "Purpose-built mobile products for customers or internal teams when off-the-shelf apps fall short.",
        href: "/services/mobile-app-development",
      },
    ],
  },
  {
    id: "custom-software-development",
    name: "Custom Software Development",
    description:
      "Software designed around how the business actually operates — not a package dropped onto it.",
    relatedPillar: "build",
    services: [
      {
        id: "custom-business-software",
        name: "Custom Business Software",
        categoryId: "custom-software-development",
        description: "Software shaped around specific operational rules, data, and day-to-day work.",
      },
      {
        id: "enterprise-applications",
        name: "Enterprise Applications",
        categoryId: "custom-software-development",
        description:
          "Larger-scale applications with multi-team use, access control, and integration requirements.",
      },
      {
        id: "digital-product-development",
        name: "Digital Product Development",
        categoryId: "custom-software-development",
        description: "Turn a product idea into something people can use, iterate on, and grow.",
      },
      {
        id: "internal-business-tools",
        name: "Internal Business Tools",
        categoryId: "custom-software-development",
        description:
          "Internal tools that replace chat threads, sheets, and tribal knowledge with a clear system.",
      },
    ],
  },
  {
    id: "business-management-systems",
    name: "Business Management Systems",
    description:
      "Core operating systems — ERP, CRM, HRMS, and process systems that fit how the organization works.",
    relatedPillar: "transform",
    services: [
      {
        id: "erp-solutions",
        name: "ERP Solutions",
        categoryId: "business-management-systems",
        description: "Enterprise resource planning configured and extended around real operations.",
      },
      {
        id: "crm-solutions",
        name: "CRM Solutions",
        categoryId: "business-management-systems",
        description: "Customer relationship systems that sales, service, and operations can share.",
      },
      {
        id: "hrms-solutions",
        name: "HRMS Solutions",
        categoryId: "business-management-systems",
        description: "People and HR systems for hiring, records, and people operations.",
      },
      {
        id: "business-process-systems",
        name: "Business Process Systems",
        categoryId: "business-management-systems",
        description:
          "Systems of record for core business processes — distinct from automation of those processes.",
      },
    ],
  },
  {
    id: "ai-automation",
    name: "AI & Automation",
    description:
      "Practical AI and automation where they remove repetitive work or create usable leverage.",
    relatedPillar: "automate",
    services: [
      {
        id: "ai-application-development",
        name: "AI Application Development",
        categoryId: "ai-automation",
        description: "Applications where AI is a core capability, not a bolt-on feature.",
      },
      {
        id: "ai-chatbot-development",
        name: "AI Chatbot Development",
        categoryId: "ai-automation",
        description:
          "Chatbots and assistants for customer or internal use, connected to real knowledge and workflows.",
      },
      {
        id: "workflow-automation",
        name: "Workflow Automation",
        categoryId: "ai-automation",
        description:
          "Automate repetitive steps — approvals, notifications, handoffs, and routine operational tasks.",
      },
      {
        id: "business-process-automation",
        name: "Business Process Automation",
        categoryId: "ai-automation",
        description:
          "End-to-end automation of multi-step business processes across teams and systems.",
      },
      {
        id: "ai-integration",
        name: "AI Integration",
        categoryId: "ai-automation",
        description:
          "Connect AI capabilities into existing products and systems — not general API connectivity.",
      },
    ],
  },
  {
    id: "api-system-integration",
    name: "API & System Integration",
    description:
      "APIs and integrations so systems share data cleanly and processes stop living in silos.",
    relatedPillar: "build",
    services: [
      {
        id: "api-development",
        name: "API Development",
        categoryId: "api-system-integration",
        description: "Design and build APIs that products, partners, and internal tools can rely on.",
      },
      {
        id: "third-party-integrations",
        name: "Third-Party Integrations",
        categoryId: "api-system-integration",
        description: "Connect to external platforms and services without inventing a new stack.",
      },
      {
        id: "application-integration",
        name: "Application Integration",
        categoryId: "api-system-integration",
        description: "Wire applications together so work and data move between them reliably.",
      },
      {
        id: "data-system-connectivity",
        name: "Data & System Connectivity",
        categoryId: "api-system-integration",
        description: "Sync, migration, and event-driven data flows across systems of record.",
      },
    ],
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    description:
      "Interface and experience design grounded in research, structure, and usable prototypes.",
    relatedPillar: "transform",
    services: [
      {
        id: "website-ui-ux-design",
        name: "Website UI/UX Design",
        categoryId: "ui-ux-design",
        description: "Website experience design for clarity, conversion, and maintainable structure.",
      },
      {
        id: "application-ui-ux-design",
        name: "Application UI/UX Design",
        categoryId: "ui-ux-design",
        description: "Product and application interfaces shaped around real tasks and users.",
      },
      {
        id: "user-research-wireframing",
        name: "User Research & Wireframing",
        categoryId: "ui-ux-design",
        description: "Research and structural wireframes before visual design or build locks in.",
      },
      {
        id: "prototyping",
        name: "Prototyping",
        categoryId: "ui-ux-design",
        description: "Interactive prototypes to validate flows before engineering investment.",
      },
    ],
  },
  {
    id: "technology-consulting",
    name: "Technology Consulting",
    description:
      "Clarity on what to build, change, connect, or improve — before commitment to a build.",
    relatedPillar: "transform",
    services: [
      {
        id: "technology-strategy",
        name: "Technology Strategy",
        categoryId: "technology-consulting",
        description: "Direction on platforms, priorities, and sequencing aligned to business goals.",
      },
      {
        id: "technical-discovery-scoping",
        name: "Technical Discovery & Scoping",
        categoryId: "technology-consulting",
        description: "Structured discovery to define scope, constraints, and a credible path forward.",
      },
      {
        id: "software-architecture",
        name: "Software Architecture",
        categoryId: "technology-consulting",
        description: "Architecture decisions that keep systems maintainable as requirements change.",
      },
      {
        id: "digital-transformation-consulting",
        name: "Digital Transformation Consulting",
        categoryId: "technology-consulting",
        description:
          "Advise on how technology should change operations — without assuming a packaged programme.",
      },
    ],
  },
  {
    id: "maintenance-support",
    name: "Maintenance & Support",
    description:
      "Keep websites and applications reliable, useful, and moving after launch.",
    relatedPillar: "evolve",
    services: [
      {
        id: "website-maintenance",
        name: "Website Maintenance",
        categoryId: "maintenance-support",
        description: "Updates, fixes, content and functional changes for live websites.",
      },
      {
        id: "application-maintenance",
        name: "Application Maintenance",
        categoryId: "maintenance-support",
        description: "Reliability, fixes, and improvements for live applications and products.",
      },
      {
        id: "annual-maintenance-contracts",
        name: "Annual Maintenance Contracts (AMC)",
        categoryId: "maintenance-support",
        description: "Agreed ongoing maintenance, issue resolution, and planned improvements.",
      },
      {
        id: "continuous-development-enhancement",
        name: "Continuous Development & Enhancement",
        categoryId: "maintenance-support",
        description:
          "Ongoing feature work and enhancement as priorities change — beyond break/fix support.",
      },
    ],
  },
] as const;

export const CATALOGUE_SERVICES: readonly CatalogueService[] =
  SERVICE_CATALOGUE.flatMap((category) => category.services);

export function getCatalogueCategory(id: ServiceCategoryId) {
  return SERVICE_CATALOGUE.find((category) => category.id === id);
}

export function getCatalogueService(id: string) {
  return CATALOGUE_SERVICES.find((service) => service.id === id);
}

export function getCatalogueServicesForCategory(id: ServiceCategoryId) {
  return getCatalogueCategory(id)?.services ?? [];
}

function normalizeServiceName(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

const KNOWN_ROUTE_SET = new Set<string>(CATALOGUE_KNOWN_ROUTES);

/**
 * Structural validation for the catalogue.
 * Semantic near-duplicates still need a human pass against the approved list.
 */
export function validateServiceCatalogue(): string[] {
  const errors: string[] = [];

  if (SERVICE_CATALOGUE.length !== SERVICE_CATEGORY_IDS.length) {
    errors.push(
      `Expected ${SERVICE_CATEGORY_IDS.length} categories, found ${SERVICE_CATALOGUE.length}.`,
    );
  }

  const categoryIds = new Set<string>();
  const serviceIds = new Set<string>();
  const normalizedNames = new Map<string, string>();
  const servicePrimaryCategory = new Map<string, string>();

  SERVICE_CATEGORY_IDS.forEach((expectedId, index) => {
    const category = SERVICE_CATALOGUE[index];
    if (!category) {
      errors.push(`Missing category at position ${index + 1} (expected ${expectedId}).`);
      return;
    }
    if (category.id !== expectedId) {
      errors.push(
        `Category order mismatch at position ${index + 1}: expected ${expectedId}, found ${category.id}.`,
      );
    }
  });

  for (const category of SERVICE_CATALOGUE) {
    if (categoryIds.has(category.id)) {
      errors.push(`Duplicate category id: ${category.id}`);
    }
    categoryIds.add(category.id);

    if (category.services.length === 0) {
      errors.push(`Empty category: ${category.id}`);
    }

    for (const service of category.services) {
      if (service.categoryId !== category.id) {
        errors.push(
          `Service ${service.id} categoryId ${service.categoryId} does not match parent ${category.id}.`,
        );
      }

      if (serviceIds.has(service.id)) {
        errors.push(`Duplicate service id: ${service.id}`);
      }
      serviceIds.add(service.id);

      const priorCategory = servicePrimaryCategory.get(service.id);
      if (priorCategory && priorCategory !== category.id) {
        errors.push(
          `Service ${service.id} assigned to multiple categories: ${priorCategory}, ${category.id}.`,
        );
      }
      servicePrimaryCategory.set(service.id, category.id);

      const normalized = normalizeServiceName(service.name);
      const existing = normalizedNames.get(normalized);
      if (existing) {
        errors.push(
          `Duplicate normalized service name "${service.name}" conflicts with "${existing}".`,
        );
      } else {
        normalizedNames.set(normalized, service.name);
      }

      if (service.href && !KNOWN_ROUTE_SET.has(service.href)) {
        errors.push(`Invalid route for ${service.id}: ${service.href}`);
      }
    }
  }

  return errors;
}

const catalogueValidationErrors = validateServiceCatalogue();
if (catalogueValidationErrors.length > 0) {
  throw new Error(
    `Service catalogue invalid:\n- ${catalogueValidationErrors.join("\n- ")}`,
  );
}
