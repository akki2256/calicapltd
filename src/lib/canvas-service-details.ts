/**
 * Canvas service detail pages.
 * One page per catalogue category. Every card in that category links here,
 * whether the work starts as something to create, connect, automate, or improve.
 */
import { SERVICE_CATEGORY_IDS, type ServiceCategoryId } from "@/lib/service-catalogue";
import { siteImages, type SiteImageKey } from "@/lib/site-images";

export type CanvasServiceAspect = {
  title: string;
  summary: string;
  points: readonly string[];
};

export type CanvasServiceContext = {
  label: string;
  body: string;
};

export type CanvasServiceDetail = {
  slug: string;
  path: string;
  categoryId: ServiceCategoryId;
  /** Case-study service ids used to pull related work */
  workServiceIds: readonly string[];
  /** Existing static route — the dynamic [slug] page must not also claim it */
  staticRoute: boolean;
  eyebrow: string;
  title: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
  cta: string;
  siblingHref?: string;
  siblingLabel?: string;
  imageKey: SiteImageKey;
  aspectsTitle: string;
  aspectsIntro: string;
  aspects: readonly CanvasServiceAspect[];
  contextsTitle: string;
  contextsIntro: string;
  contexts: readonly CanvasServiceContext[];
  useCases: readonly string[];
  deliveryTitle: string;
  deliveryBody: string;
  footerPrompt: string;
  footerCta: string;
};

const DETAILS: readonly CanvasServiceDetail[] = [
  {
    slug: "web-app-development",
    path: "/services/web-app-development",
    categoryId: "web-development",
    workServiceIds: ["web-mobile-apps", "web-ecommerce"],
    staticRoute: true,
    eyebrow: "Web",
    title: "Websites, web applications, and the systems around them.",
    body:
      "A marketing site, a product people log into, a store, a CMS, and a partner portal are different shapes of the same work. This page covers all of them — whether the brief is to create something new, connect it to other systems, automate the work inside it, or improve what is already live.",
    metaTitle: "Web development",
    metaDescription:
      "Websites, web applications, e-commerce, WordPress, content systems, and customer portals — one practice, whatever the starting point.",
    cta: "Start a web project",
    siblingHref: "/services/mobile-app-development",
    siblingLabel: "Mobile app development",
    imageKey: "heroWorkspace",
    aspectsTitle: "What this page covers",
    aspectsIntro:
      "Every web card on the services page opens here. The engagement can include one of these, or several together.",
    aspects: [
      {
        title: "Website Design & Development",
        summary:
          "Marketing and corporate websites — structure, design, and build in one engagement.",
        points: [
          "Information architecture and page structure around how people actually decide",
          "Design and front-end build that can be run after launch",
          "Analytics and technical SEO as part of the site, not a later add-on",
        ],
      },
      {
        title: "Web Application Development",
        summary:
          "Interactive products beyond a content site — accounts, workflows, and ongoing use.",
        points: [
          "Logged-in products shaped around a real job, not a generic dashboard",
          "Workflows, roles, and states that match how the work already moves",
          "A path to grow the product after the first release",
        ],
      },
      {
        title: "E-commerce Development",
        summary:
          "Online stores where catalogue, checkout, and operations are one offering.",
        points: [
          "Catalogue and product presentation that sales can live with",
          "Checkout, payments, and order flow connected to how fulfilment actually works",
          "The operational side — stock, orders, and the tools the shop already uses",
        ],
      },
      {
        title: "WordPress Development",
        summary:
          "WordPress when that platform is the right fit — not a separate design or CMS track.",
        points: [
          "Theme and structure chosen for the content model, not a stock layout",
          "Editor experience the team can run without a developer for every change",
          "Performance, updates, and integrations kept deliberate",
        ],
      },
      {
        title: "Content Management Systems (CMS)",
        summary: "CMS selection, setup, and content models editors can run without a black box.",
        points: [
          "A content model that matches how the organisation publishes",
          "Setup and training so editors are not locked out of their own site",
          "Room to add pages, programmes, or catalogue without rebuilding",
        ],
      },
      {
        title: "Customer & Partner Portals",
        summary:
          "Logged-in portals that replace spreadsheets, email chains, and ad-hoc file sharing.",
        points: [
          "A shared place for the people who should not be working out of inboxes",
          "Access, status, and documents in one record",
          "Connections back to the systems that already hold the source data",
        ],
      },
    ],
    contextsTitle: "Same work, different starting points",
    contextsIntro:
      "Web-related cards lead here whether the conversation starts as create, connect, automate, or something already in the world that needs to change.",
    contexts: [
      {
        label: "Create",
        body: "A new site, web application, store, or portal that does not exist yet.",
      },
      {
        label: "Modernize",
        body: "An existing website or web product that no longer fits how people use it.",
      },
      {
        label: "Automate",
        body: "Accounts, approvals, notifications, and other work that should happen inside the product instead of by hand.",
      },
      {
        label: "Integrate",
        body: "Payments, CRM, inventory, and the other systems the web product has to share data with.",
      },
      {
        label: "Scale",
        body: "More pages, more catalogue, more users, and a content model the team can run after launch.",
      },
    ],
    useCases: [
      "A marketing site that needs to convert, not just look finished",
      "A web product with accounts, roles, and a workflow people repeat",
      "A store whose checkout has to match how orders are actually fulfilled",
      "A WordPress or CMS site editors can run without a black box",
      "A customer or partner portal that replaces spreadsheets and email chains",
    ],
    deliveryTitle: "How this work is delivered",
    deliveryBody:
      "We start from the experience, the conversion or workflow path, and how the site will be run — then build and test the screens and connections that matter. A marketing site does not inherit the process of a large operating system, and a portal does not get treated as a brochure.",
    footerPrompt: "Need web and mobile together?",
    footerCta: "Tell us about the full roadmap",
  },
  {
    slug: "mobile-app-development",
    path: "/services/mobile-app-development",
    categoryId: "mobile-app-development",
    workServiceIds: ["web-mobile-apps"],
    staticRoute: true,
    eyebrow: "Mobile",
    title: "Mobile products for customers and for teams.",
    body:
      "iOS, Android, cross-platform, and custom mobile applications are one practice. The page is the same whether the app is a new product, a companion to a system you already run, or a tool that takes repetitive work off the floor.",
    metaTitle: "Mobile app development",
    metaDescription:
      "Native iOS, Android, cross-platform, and custom mobile applications — one practice for customer and team products.",
    cta: "Start a mobile project",
    siblingHref: "/services/web-app-development",
    siblingLabel: "Web development",
    imageKey: "mobileHands",
    aspectsTitle: "What this page covers",
    aspectsIntro:
      "Every mobile card on the services page opens here. Platform choice follows the product, not a default stack.",
    aspects: [
      {
        title: "iOS App Development",
        summary: "Native iOS applications with store-ready delivery and a maintainable backend path.",
        points: [
          "Product and interface decisions made for iPhone and iPad, not a shrunk website",
          "Store listing, release hygiene, and a backend the app can grow on",
          "Instrumentation so usage is visible after launch",
        ],
      },
      {
        title: "Android App Development",
        summary: "Native Android applications built for device reality and long-term release hygiene.",
        points: [
          "Builds that respect the range of Android devices the audience actually uses",
          "Release and update practice that does not depend on a one-off build",
          "A backend contract shared with the rest of the product when one exists",
        ],
      },
      {
        title: "Cross-Platform App Development",
        summary: "Shared-code mobile products when one codebase is the right delivery trade-off.",
        points: [
          "One codebase when iOS and Android need to ship together",
          "A clear line on what stays shared and what must be native",
          "The same release and backend discipline as a native build",
        ],
      },
      {
        title: "Custom Mobile Applications",
        summary:
          "Purpose-built mobile products for customers or internal teams when off-the-shelf apps fall short.",
        points: [
          "Customer-facing apps that have to match the quality of the rest of the product",
          "Internal tools that replace chat threads, sheets, and tribal knowledge",
          "Scope held to the job the app is actually for",
        ],
      },
    ],
    contextsTitle: "Same work, different starting points",
    contextsIntro:
      "Mobile cards lead here whether the app is being created, connected to existing systems, or used to take manual work out of a process.",
    contexts: [
      {
        label: "Create",
        body: "A new customer or team app that needs a store presence and a backend that can grow.",
      },
      {
        label: "Modernize",
        body: "An existing app or mobile workflow that no longer matches how people work.",
      },
      {
        label: "Automate",
        body: "Field or floor tasks — capture, status, approvals — that should happen on a device instead of on paper or in chat.",
      },
      {
        label: "Integrate",
        body: "The app as a front door to systems that already hold customers, orders, or records.",
      },
    ],
    useCases: [
      "A customer-facing app that has to match the quality of the website",
      "An internal tool teams can run from a phone",
      "iOS and Android shipping together from one codebase",
      "A native app when shared code is the wrong trade-off",
    ],
    deliveryTitle: "How this work is delivered",
    deliveryBody:
      "We clarify the product, the platforms, and how it will be used — then design, build, and validate on the devices that matter. Architecture and testing follow the product, not a template.",
    footerPrompt: "Shipping web and mobile together?",
    footerCta: "Outline the constraints",
  },
  {
    slug: "custom-software",
    path: "/services/custom-software",
    categoryId: "custom-software-development",
    workServiceIds: ["custom-software"],
    staticRoute: false,
    eyebrow: "Custom software",
    title: "Software shaped around how the business actually runs.",
    body:
      "Custom business software, enterprise applications, digital products, and internal tools belong on one page. The work is the same practice whether you are creating something new, replacing a stack of sheets, or connecting a tool to the systems around it.",
    metaTitle: "Custom software",
    metaDescription:
      "Custom business software, enterprise applications, digital products, and internal tools — built around real operations.",
    cta: "Start a software project",
    siblingHref: "/services/business-management-systems",
    siblingLabel: "Business management systems",
    imageKey: "productLaunch",
    aspectsTitle: "What this page covers",
    aspectsIntro: "Every custom-software card on the services page opens here.",
    aspects: [
      {
        title: "Custom Business Software",
        summary: "Software shaped around specific operational rules, data, and day-to-day work.",
        points: [
          "The operating rules of the business become the product model",
          "Screens and roles follow who actually does the work",
          "Data the team already trusts, brought into one place",
        ],
      },
      {
        title: "Enterprise Applications",
        summary:
          "Larger-scale applications with multi-team use, access control, and integration requirements.",
        points: [
          "More than one team, with access that matches responsibility",
          "Integrations where the application cannot live alone",
          "A structure that stays understandable as the surface grows",
        ],
      },
      {
        title: "Digital Product Development",
        summary: "Turn a product idea into something people can use, iterate on, and grow.",
        points: [
          "Enough definition to build the first usable version",
          "A product people can try, not a specification that stays on paper",
          "A path to change it once real use is visible",
        ],
      },
      {
        title: "Internal Business Tools",
        summary:
          "Internal tools that replace chat threads, sheets, and tribal knowledge with a clear system.",
        points: [
          "One place for a job that currently lives in chat and spreadsheets",
          "Only the workflow the team repeats — not a platform for its own sake",
          "Handoffs and status that do not depend on one person remembering",
        ],
      },
    ],
    contextsTitle: "Same work, different starting points",
    contextsIntro:
      "These cards lead here whether the software is new, a replacement, or the place where a manual process should live.",
    contexts: [
      {
        label: "Create",
        body: "A product or internal tool that does not exist yet and should.",
      },
      {
        label: "Modernize",
        body: "Software, sheets, or a patchwork of tools that no longer fit the operation.",
      },
      {
        label: "Automate",
        body: "Steps people repeat by hand that the software should carry.",
      },
      {
        label: "Integrate",
        body: "The new system sharing data with what already runs the business.",
      },
    ],
    useCases: [
      "An operation running across spreadsheets, chat, and fragmented tools",
      "A product idea that needs a first version people can use",
      "An internal tool for a workflow only this organisation has",
      "A multi-team application with real access and integration needs",
    ],
    deliveryTitle: "How this work is delivered",
    deliveryBody:
      "We start from the workflow and the data, not from a package. Scope stays tied to the job. Testing follows the paths people actually take.",
    footerPrompt: "Not sure whether this should be a product or a business system?",
    footerCta: "Tell us what's happening",
  },
  {
    slug: "business-management-systems",
    path: "/services/business-management-systems",
    categoryId: "business-management-systems",
    workServiceIds: ["business-management-systems"],
    staticRoute: false,
    eyebrow: "Business systems",
    title: "ERP, CRM, HRMS, and the processes they have to carry.",
    body:
      "Core operating systems belong together. An ERP, a CRM, an HRMS, or a process system is the same kind of work: software of record fitted to how the organisation operates, not a package dropped on top of it.",
    metaTitle: "Business management systems",
    metaDescription:
      "ERP, CRM, HRMS, and business process systems configured and extended around how the organisation actually works.",
    cta: "Talk about a business system",
    siblingHref: "/services/custom-software",
    siblingLabel: "Custom software",
    imageKey: "analyticsDashboard",
    aspectsTitle: "What this page covers",
    aspectsIntro: "Every business-system card on the services page opens here.",
    aspects: [
      {
        title: "ERP Solutions",
        summary: "Enterprise resource planning configured and extended around real operations.",
        points: [
          "Finance, inventory, and operations mapped before configuration",
          "Extensions where the package does not match the work",
          "A system people can run, not a parallel spreadsheet",
        ],
      },
      {
        title: "CRM Solutions",
        summary: "Customer relationship systems that sales, service, and operations can share.",
        points: [
          "Pipeline and customer record shaped around how deals or cases actually move",
          "One record shared by the teams who touch the customer",
          "Handoffs that do not fall out of the system",
        ],
      },
      {
        title: "HRMS Solutions",
        summary: "People and HR systems for hiring, records, and people operations.",
        points: [
          "Employee records and people processes in one system",
          "Hiring and day-to-day HR work the team will actually use",
          "Access and history that stay with the organisation",
        ],
      },
      {
        title: "Business Process Systems",
        summary:
          "Systems of record for core business processes — distinct from automation of those processes.",
        points: [
          "The process itself becomes the system of record",
          "Status, ownership, and history in one place",
          "Automation can sit on top later — the record comes first",
        ],
      },
    ],
    contextsTitle: "Same work, different starting points",
    contextsIntro:
      "These cards lead here whether you are standing up a system, replacing one, or connecting it to the rest of the operation.",
    contexts: [
      {
        label: "Create",
        body: "A system of record the organisation does not have yet.",
      },
      {
        label: "Modernize",
        body: "An ERP, CRM, or people system that no longer matches how work is done.",
      },
      {
        label: "Automate",
        body: "Routine steps inside the system — reminders, handoffs, status — once the record is trustworthy.",
      },
      {
        label: "Integrate",
        body: "The system sharing customers, orders, or people data with the tools around it.",
      },
    ],
    useCases: [
      "Sales, service, and operations working from different customer records",
      "Inventory and finance that do not agree",
      "People operations spread across sheets and inboxes",
      "A core process with no system of record",
    ],
    deliveryTitle: "How this work is delivered",
    deliveryBody:
      "We start with how the operation runs today. Configuration and any custom work follow that, so the system fits the business instead of the other way around.",
    footerPrompt: "Need the system and the software around it?",
    footerCta: "Tell us what's happening",
  },
  {
    slug: "ai-automation",
    path: "/services/ai-automation",
    categoryId: "ai-automation",
    workServiceIds: ["workflow-automation", "ai-applications", "ai-chatbots"],
    staticRoute: false,
    eyebrow: "AI & automation",
    title: "Practical AI and automation, where they remove work.",
    body:
      "AI applications, chatbots, workflow automation, and AI inside existing products are one practice. Use this page whether the aim is to create an intelligent product, connect AI to systems you already have, or take a repetitive process off people's plates.",
    metaTitle: "AI and automation",
    metaDescription:
      "AI applications, chatbots, workflow automation, and AI integrated into existing products — used where they remove real work.",
    cta: "Talk about automation",
    siblingHref: "/services/system-integration",
    siblingLabel: "API & system integration",
    imageKey: "teamCollaboration",
    aspectsTitle: "What this page covers",
    aspectsIntro: "Every AI and automation card on the services page opens here.",
    aspects: [
      {
        title: "AI Application Development",
        summary: "Applications where AI is a core capability, not a bolt-on feature.",
        points: [
          "A product whose job depends on the model, not a chat box added at the end",
          "Inputs, review, and failure paths designed before the model is wired in",
          "A useful application around the capability, not a demo",
        ],
      },
      {
        title: "AI Chatbot Development",
        summary:
          "Chatbots and assistants for customer or internal use, connected to real knowledge and workflows.",
        points: [
          "Answers grounded in the organisation's own knowledge",
          "Handoff to a person or a workflow when the bot should stop",
          "Customer-facing or internal — scoped to the conversations that repeat",
        ],
      },
      {
        title: "Workflow & Process Automation",
        summary:
          "Repetitive steps and end-to-end processes — approvals, handoffs, and multi-team workflows across systems.",
        points: [
          "The manual path mapped before anything is automated",
          "Approvals, notifications, and handoffs that follow the real process",
          "Automation across the systems the work already touches",
        ],
      },
      {
        title: "AI Integration",
        summary:
          "AI capabilities inside existing products and systems — not general API connectivity.",
        points: [
          "A specific capability added to a product or system that already exists",
          "Clear boundaries on what the model may do",
          "Distinct from wiring two ordinary systems together",
        ],
      },
    ],
    contextsTitle: "Same work, different starting points",
    contextsIntro:
      "These cards lead here whether you are creating an AI product, automating a process, or connecting a model to something already live.",
    contexts: [
      {
        label: "Create",
        body: "An application or assistant where AI is the point of the product.",
      },
      {
        label: "Automate",
        body: "A repetitive process — approvals, follow-ups, data movement — that should run without someone pushing it.",
      },
      {
        label: "Integrate",
        body: "AI added to a product or system you already operate, with a defined job.",
      },
      {
        label: "Modernize",
        body: "A manual or half-scripted workflow that has outgrown inboxes and sheets.",
      },
    ],
    useCases: [
      "A customer or internal assistant that has to know the real answers",
      "Approvals and handoffs still moving by chat",
      "A product that needs a specific AI capability, not a general chatbot",
      "A process repeated the same way across more than one system",
    ],
    deliveryTitle: "How this work is delivered",
    deliveryBody:
      "We look at the work being done by hand, then automate where it creates time, consistency, or fewer errors. AI is used when it is the right tool — not as the default. Testing follows the workflow.",
    footerPrompt: "Not sure whether this is automation or a new product?",
    footerCta: "Tell us what's happening",
  },
  {
    slug: "system-integration",
    path: "/services/system-integration",
    categoryId: "api-system-integration",
    workServiceIds: ["apis-integrations"],
    staticRoute: false,
    eyebrow: "Integration",
    title: "APIs and connections so systems stop living apart.",
    body:
      "API development, third-party integrations, application integration, and data connectivity are one practice. Every integration card opens this page — whether you are creating an API, connecting products you already run, or moving data so a process can be automated.",
    metaTitle: "API and system integration",
    metaDescription:
      "APIs, third-party integrations, application integration, and data connectivity so systems share data cleanly.",
    cta: "Talk about an integration",
    siblingHref: "/services/ai-automation",
    siblingLabel: "AI & automation",
    imageKey: "cloudNetwork",
    aspectsTitle: "What this page covers",
    aspectsIntro: "Every API and integration card on the services page opens here.",
    aspects: [
      {
        title: "API Development",
        summary: "APIs that products, partners, and internal tools can rely on.",
        points: [
          "Contracts designed around the consumers, not an internal database dump",
          "Authentication, errors, and versioning treated as part of the API",
          "Documentation the next team can use",
        ],
      },
      {
        title: "Third-Party Integrations",
        summary: "Connections to external platforms and services without inventing a new stack.",
        points: [
          "Payments, messaging, CRM, and other platforms you already depend on",
          "Failure and retry behaviour, not only the happy path",
          "The smallest reliable connection that does the job",
        ],
      },
      {
        title: "Application Integration",
        summary: "Applications wired so work and data move between them reliably.",
        points: [
          "The handoff between two applications made explicit",
          "Ownership of the record stays clear",
          "People stop re-keying the same fact into a second system",
        ],
      },
      {
        title: "Data & System Connectivity",
        summary: "Sync, migration, and event-driven data flows across systems of record.",
        points: [
          "Sync and migration with a known source of truth",
          "Event-driven updates where waiting for a nightly file is the problem",
          "A path to check that the systems still agree",
        ],
      },
    ],
    contextsTitle: "Same work, different starting points",
    contextsIntro:
      "Integration cards lead here whether the job is to create a connection, automate a flow across systems, or make an existing product talk to something new.",
    contexts: [
      {
        label: "Create",
        body: "A new API or connection that products, partners, or internal tools need.",
      },
      {
        label: "Integrate",
        body: "Two or more systems that should share a customer, order, or record and do not.",
      },
      {
        label: "Automate",
        body: "Data movement and handoffs that still depend on someone exporting a file.",
      },
      {
        label: "Modernize",
        body: "A brittle integration or manual bridge that has become part of the operation.",
      },
    ],
    useCases: [
      "A product that needs an API partners or internal tools can call",
      "A payment, CRM, or messaging platform that has to join the workflow",
      "Two applications where staff re-enter the same data",
      "A migration or sync between systems of record",
    ],
    deliveryTitle: "How this work is delivered",
    deliveryBody:
      "We name the source of truth, the consumers, and what happens when a call fails — then build the smallest connection that keeps the process moving.",
    footerPrompt: "The connection is only half of a larger build?",
    footerCta: "Tell us the full picture",
  },
  {
    slug: "ui-ux-design",
    path: "/services/ui-ux-design",
    categoryId: "ui-ux-design",
    workServiceIds: ["web-ecommerce", "web-mobile-apps"],
    staticRoute: false,
    eyebrow: "UI/UX",
    title: "Interface and experience design before, and with, the build.",
    body:
      "Website UI/UX, application UI/UX, research, wireframes, and prototypes are one practice. Design cards open this page whether the work is a new product, a site being modernized, or the flows inside something that will later be automated or connected.",
    metaTitle: "UI/UX design",
    metaDescription:
      "Website and application UI/UX, user research, wireframes, and prototypes — structure and interface before the build locks in.",
    cta: "Start a design engagement",
    siblingHref: "/services/web-app-development",
    siblingLabel: "Web development",
    imageKey: "strategySession",
    aspectsTitle: "What this page covers",
    aspectsIntro: "Every UI/UX card on the services page opens here.",
    aspects: [
      {
        title: "Website UI/UX Design",
        summary: "Website experience design for clarity, conversion, and a structure that can be maintained.",
        points: [
          "Page structure and hierarchy before visual polish",
          "Paths that match how someone decides, enquires, or buys",
          "A design the build can implement without reinventing it",
        ],
      },
      {
        title: "Application UI/UX Design",
        summary: "Product and application interfaces shaped around real tasks and users.",
        points: [
          "Screens organised around the task, not a feature list",
          "States for empty, error, and in-progress — not only the ideal path",
          "An interface a team can extend as the product grows",
        ],
      },
      {
        title: "User Research & Wireframing",
        summary: "Research and structural wireframes before visual design or build locks in.",
        points: [
          "Enough research to know who the work is for and what they are trying to do",
          "Wireframes that settle structure before colour and type",
          "Decisions written down so the build does not rediscover them",
        ],
      },
      {
        title: "Prototyping",
        summary: "Interactive prototypes to validate flows before engineering investment.",
        points: [
          "A clickable flow for the paths that carry risk",
          "Feedback while change is still cheap",
          "A prototype the build can follow, not a separate artefact",
        ],
      },
    ],
    contextsTitle: "Same work, different starting points",
    contextsIntro:
      "Design cards lead here whether you are creating a new experience, improving one that exists, or shaping the interface for a system that will connect or automate work.",
    contexts: [
      {
        label: "Create",
        body: "A new site or product that needs structure and interface before it is built.",
      },
      {
        label: "Modernize",
        body: "An existing experience that looks finished and still fails the task.",
      },
      {
        label: "Automate",
        body: "The screens and steps for a workflow that should no longer be manual.",
      },
      {
        label: "Integrate",
        body: "An interface that has to make sense of data coming from more than one system.",
      },
    ],
    useCases: [
      "A website whose enquiry or purchase path is unclear",
      "An application whose screens follow the database instead of the task",
      "A team that needs wireframes and a prototype before committing to a build",
      "A redesign that has to stay implementable",
    ],
    deliveryTitle: "How this work is delivered",
    deliveryBody:
      "Research and structure come before visual design. Prototypes are used where a static screen would hide the risk. The output is something the build can follow.",
    footerPrompt: "Design and build in the same engagement?",
    footerCta: "Tell us what you're making",
  },
  {
    slug: "technology-consulting",
    path: "/services/technology-consulting",
    categoryId: "technology-consulting",
    workServiceIds: [],
    staticRoute: false,
    eyebrow: "Consulting",
    title: "Clarity on what to build, change, connect, or improve.",
    body:
      "Technology strategy, discovery, architecture, and transformation consulting are one practice. Consulting cards open this page whether the next step might be to create, connect, automate, or leave something alone until it is ready.",
    metaTitle: "Technology consulting",
    metaDescription:
      "Technology strategy, discovery and scoping, software architecture, and digital transformation consulting — before commitment to a build.",
    cta: "Start with a conversation",
    siblingHref: "/services/custom-software",
    siblingLabel: "Custom software",
    imageKey: "strategySession",
    aspectsTitle: "What this page covers",
    aspectsIntro: "Every consulting card on the services page opens here.",
    aspects: [
      {
        title: "Technology Strategy",
        summary: "Direction on platforms, priorities, and sequencing aligned to business goals.",
        points: [
          "What to do first, and what can wait",
          "Platform and priority choices tied to the business, not a trend",
          "A sequence the organisation can actually follow",
        ],
      },
      {
        title: "Technical Discovery & Scoping",
        summary: "Structured discovery to define scope, constraints, and a credible path forward.",
        points: [
          "The problem, the constraints, and what is out of scope",
          "A scope a build can start from",
          "An honest read when something is not ready to build",
        ],
      },
      {
        title: "Software Architecture",
        summary: "Architecture decisions that keep systems maintainable as requirements change.",
        points: [
          "Boundaries, data ownership, and the choices that are expensive to reverse",
          "Enough structure for the next stage of the product",
          "Decisions recorded so they are not relitigated in every sprint",
        ],
      },
      {
        title: "Digital Transformation Consulting",
        summary:
          "Advice on how technology should change operations — without assuming a packaged programme.",
        points: [
          "Where technology should change the operation, and where it should not",
          "No assumed platform or multi-year programme",
          "A next step that can be a build, a change, or a decision to wait",
        ],
      },
    ],
    contextsTitle: "Same work, different starting points",
    contextsIntro:
      "Consulting leads here when the right move might be to create, connect, automate, modernize — or not build yet.",
    contexts: [
      {
        label: "Create",
        body: "An idea or requirement that needs scope before anyone writes software.",
      },
      {
        label: "Modernize",
        body: "Technology that no longer fits, and no agreed picture of what should replace it.",
      },
      {
        label: "Automate",
        body: "A process people want automated before anyone has mapped the work.",
      },
      {
        label: "Integrate",
        body: "Systems that should connect, and no decision yet on what owns the data.",
      },
    ],
    useCases: [
      "A build that keeps expanding because the problem was never scoped",
      "A platform choice that has to be made before more work piles on",
      "An architecture that will be painful to change in six months",
      "A transformation conversation that does not yet have a first project",
    ],
    deliveryTitle: "How this work is delivered",
    deliveryBody:
      "Discovery stays concrete: constraints, scope, and a path. We say when something is not ready to build. The output is a decision and a next step, not a slide deck that replaces one.",
    footerPrompt: "Ready to turn the conclusion into a build?",
    footerCta: "Tell us what's happening",
  },
  {
    slug: "maintenance-support",
    path: "/services/maintenance-support",
    categoryId: "maintenance-support",
    workServiceIds: [],
    staticRoute: false,
    eyebrow: "Maintenance & support",
    title: "Keep what is live reliable, and keep it moving.",
    body:
      "Website maintenance, application maintenance, annual contracts, and continuous development are one practice. Support cards open this page whether the need is to keep a site healthy, extend a product, or carry work that started as a create, connect, or automate engagement.",
    metaTitle: "Maintenance and support",
    metaDescription:
      "Website and application maintenance, annual maintenance contracts, and continuous development after launch.",
    cta: "Talk about ongoing support",
    siblingHref: "/services/web-app-development",
    siblingLabel: "Web development",
    imageKey: "modernOffice",
    aspectsTitle: "What this page covers",
    aspectsIntro: "Every maintenance and support card on the services page opens here.",
    aspects: [
      {
        title: "Website Maintenance",
        summary: "Updates, fixes, and content or functional changes for live websites.",
        points: [
          "Fixes and updates on a site that is already public",
          "Content and functional changes that should not wait for a new project",
          "A site that stays current without a full rebuild",
        ],
      },
      {
        title: "Application Maintenance",
        summary: "Reliability, fixes, and improvements for live applications and products.",
        points: [
          "Defects, reliability, and the small improvements live products need",
          "Releases that do not put the operation at risk",
          "Someone who already understands the system",
        ],
      },
      {
        title: "Annual Maintenance Contracts (AMC)",
        summary: "Agreed ongoing maintenance, issue resolution, and planned improvements.",
        points: [
          "A defined scope for issues, updates, and planned improvements",
          "Response that does not depend on starting a new contract each time",
          "Not every engagement needs one — this is for when ongoing cover is useful",
        ],
      },
      {
        title: "Continuous Development & Enhancement",
        summary: "Ongoing feature work as priorities change — beyond break/fix support.",
        points: [
          "New capability on a product that is already live",
          "Priorities that move after launch, without a stop-start project",
          "Distinct from fixing what is broken",
        ],
      },
    ],
    contextsTitle: "Same work, different starting points",
    contextsIntro:
      "Support cards lead here after a create, connect, or automate engagement — or for a system that is already live and needs to keep moving.",
    contexts: [
      {
        label: "Scale",
        body: "A live site or product that needs to grow as priorities change.",
      },
      {
        label: "Modernize",
        body: "Small, continuous improvement of something that is not ready for a rebuild.",
      },
      {
        label: "Create",
        body: "Features added to a product that already shipped, rather than a separate project each time.",
      },
      {
        label: "Automate",
        body: "Follow-on automation and fixes once a workflow is in production.",
      },
    ],
    useCases: [
      "A website that needs updates and fixes without a new project every time",
      "A live application whose issues and small improvements have nowhere to go",
      "An agreed year of maintenance and planned improvements",
      "Feature work that continues as the business changes",
    ],
    deliveryTitle: "How this work is delivered",
    deliveryBody:
      "Launch is not always the end. After a defined support period, maintenance, improvements, and new work can continue when they are useful — including an annual contract. Not every engagement needs one.",
    footerPrompt: "Something live that needs attention?",
    footerCta: "Tell us what's happening",
  },
];

const bySlug = new Map(DETAILS.map((detail) => [detail.slug, detail]));
const byCategory = new Map(DETAILS.map((detail) => [detail.categoryId, detail]));

for (const id of SERVICE_CATEGORY_IDS) {
  if (!byCategory.has(id)) {
    throw new Error(`Missing Canvas service detail for category ${id}.`);
  }
}

export const CANVAS_SERVICE_DETAILS = DETAILS;

export const CANVAS_SERVICE_DETAIL_PATHS: readonly string[] = DETAILS.map(
  (detail) => detail.path,
);

export function getCanvasServiceDetailBySlug(slug: string) {
  return bySlug.get(slug) ?? null;
}

export function canvasServicePathForCategory(categoryId: ServiceCategoryId) {
  const detail = byCategory.get(categoryId);
  if (!detail) {
    throw new Error(`No Canvas service detail for category ${categoryId}.`);
  }
  return detail.path;
}

export function canvasServiceImage(detail: CanvasServiceDetail) {
  return siteImages[detail.imageKey];
}

export function canvasServiceDetailsForDynamicRoutes() {
  return DETAILS.filter((detail) => !detail.staticRoute);
}
