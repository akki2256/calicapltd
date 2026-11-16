/**
 * FAQ page content — single source for the Canvas site.
 * Do not invent policies, prices, guarantees, or client claims here.
 */

export const FAQ_CATEGORY_IDS = [
  "general",
  "services",
  "projects",
  "pricing",
  "technology",
  "maintenance",
] as const;

export type FaqCategoryId = (typeof FAQ_CATEGORY_IDS)[number];

export type FaqCategory = {
  id: FaqCategoryId;
  label: string;
};

export type FaqItem = {
  id: string;
  categoryId: FaqCategoryId;
  question: string;
  answer: string;
  /** Extra terms that help search without changing visible copy */
  keywords?: readonly string[];
};

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  { id: "general", label: "General" },
  { id: "services", label: "Services & Capabilities" },
  { id: "projects", label: "Projects & Process" },
  { id: "pricing", label: "Pricing & Payments" },
  { id: "technology", label: "Technology & Integrations" },
  { id: "maintenance", label: "Maintenance & Support" },
] as const;

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "what-does-calicon-do",
    categoryId: "general",
    question: "What does Calicon do?",
    answer:
      "Calicon builds business technology and digital solutions — websites, applications, custom software, business systems, AI and automation, integrations, and the support that keeps them running after launch.",
    keywords: ["overview", "company", "offerings", "digital products"],
  },
  {
    id: "what-types-of-businesses",
    categoryId: "general",
    question: "What types of businesses do you work with?",
    answer:
      "We work with organisations that need a clear digital product or operating system — from establishing a public presence to modernising existing tools or building something purpose-built for how they work.",
    keywords: ["clients", "industries", "startups", "enterprises"],
  },
  {
    id: "need-to-know-technology",
    categoryId: "general",
    question: "Do I need to know exactly what technology I need?",
    answer:
      "No. Start with the business problem, goal, or opportunity. We help translate that into requirements and a practical technical approach.",
    keywords: ["unsure", "requirements", "discovery", "advice"],
  },
  {
    id: "where-is-calicon-available",
    categoryId: "general",
    question: "Where is Calicon based, and who do you work with?",
    answer:
      "Calicon operates from Noida, India, and works with businesses that need technology solutions across different markets. Use the Contact page to discuss your location and project requirements.",
    keywords: ["location", "remote", "markets", "geography", "noida"],
  },
  {
    id: "what-services",
    categoryId: "services",
    question: "What services does Calicon offer?",
    answer:
      "Core capabilities include web development, mobile applications, custom software, business management systems, AI and automation, API and system integration, UI/UX design, technology consulting, and maintenance and support. What is in scope for a given engagement is agreed in writing for that project.",
    keywords: ["catalogue", "capabilities", "web", "mobile", "ai"],
  },
  {
    id: "improve-existing",
    categoryId: "services",
    question: "Can you improve or replace an existing website or application?",
    answer:
      "Yes. We review the current product, identify what should stay, change, or be replaced, and then plan improvements, redesign, new functionality, integrations, or a rebuild around your priorities.",
    keywords: ["redesign", "rebuild", "modernize", "legacy"],
  },
  {
    id: "idea-still-developing",
    categoryId: "services",
    question: "Can you work with an idea that is still being developed?",
    answer:
      "Yes. Early work often starts with clarifying the problem, users, and success criteria, then shaping a practical direction before full development begins.",
    keywords: ["concept", "early stage", "scoping", "discovery"],
  },
  {
    id: "custom-or-platforms",
    categoryId: "services",
    question: "Do you build custom software or use existing platforms?",
    answer:
      "We choose the approach that fits the problem. That can mean configuring and integrating existing platforms, extending tools you already use, or building a custom solution when the workflow needs something shaped to your process.",
    keywords: ["wordpress", "saas", "bespoke", "off the shelf"],
  },
  {
    id: "integrate-systems",
    categoryId: "services",
    question: "Can you integrate different systems?",
    answer:
      "Yes. We connect applications, APIs, and business systems so records, workflows, and handoffs move between tools without constant manual re-entry.",
    keywords: ["api", "integrations", "connect", "sync"],
  },
  {
    id: "how-project-starts",
    categoryId: "projects",
    question: "How does a project get started?",
    answer:
      "Share your goals, challenges, or project idea through the Contact page. From there we clarify requirements, outline a suitable approach, discuss scope and timeline, and agree next steps in writing before work begins.",
    keywords: ["kickoff", "onboarding", "enquiry", "begin"],
  },
  {
    id: "requirements-not-defined",
    categoryId: "projects",
    question: "What if my requirements are not fully defined?",
    answer:
      "That is a common starting point. We work from your current situation, identify what needs to be solved, and help turn that into a clear scope before build decisions are locked in.",
    keywords: ["unclear", "discovery", "scoping"],
  },
  {
    id: "how-long-project",
    categoryId: "projects",
    question: "How long does a project take?",
    answer:
      "Timelines depend on scope, complexity, dependencies, and integrations. Once we understand the work, we share an expected timeline as part of the project discussion — not a generic estimate from this page.",
    keywords: ["timeline", "duration", "schedule", "delivery"],
  },
  {
    id: "client-involvement",
    categoryId: "projects",
    question: "Will I be involved throughout the project?",
    answer:
      "Yes. Clear communication matters. We plan for reviews, decisions, and feedback at the points that keep the work aligned with your requirements.",
    keywords: ["collaboration", "updates", "reviews", "feedback"],
  },
  {
    id: "work-with-existing-team",
    categoryId: "projects",
    question: "Can you work with an existing team?",
    answer:
      "Yes. We can fit around your current team, systems, and handoffs — as a delivery partner, a specialist build team, or support for an internal group — depending on what the engagement needs.",
    keywords: ["partnership", "augment", "collaborate", "in-house"],
  },
  {
    id: "how-much-cost",
    categoryId: "pricing",
    question: "How much does a project cost?",
    answer:
      "Cost depends on scope, functionality, complexity, and delivery requirements. Share what you need through the Contact page and we will discuss a suitable approach and estimate for that work.",
    keywords: ["budget", "price", "cost", "quote"],
  },
  {
    id: "fixed-price",
    categoryId: "pricing",
    question: "Do you offer fixed-price projects?",
    answer:
      "When scope is clear enough, we can work on a fixed-price basis. Where requirements are still evolving, we may recommend a phased or time-based arrangement. The model is agreed before work begins.",
    keywords: ["fixed bid", "time and materials", "retainer"],
  },
  {
    id: "phased-delivery",
    categoryId: "pricing",
    question: "Can the project be delivered in phases?",
    answer:
      "Yes. Many engagements ship in phases — for example an initial release followed by integrations, automation, or further product work — based on priorities and dependencies.",
    keywords: ["milestones", "mvp", "stages", "incremental"],
  },
  {
    id: "get-estimate",
    categoryId: "pricing",
    question: "How do I get a project estimate?",
    answer:
      "Use the Contact page and include your idea or existing system, key requirements, constraints, and the outcome you want. More context makes a meaningful estimate possible.",
    keywords: ["quote", "proposal", "estimate", "budget"],
  },
  {
    id: "which-technologies",
    categoryId: "technology",
    question: "Which technologies do you work with?",
    answer:
      "We select the stack from the project’s requirements, existing systems, performance needs, and long-term maintainability — not from a fixed list published for every engagement.",
    keywords: ["stack", "react", "node", "tech", "framework"],
  },
  {
    id: "existing-software-tools",
    categoryId: "technology",
    question: "Can you work with our existing software and tools?",
    answer:
      "Yes. We assess what you already use, then decide whether to integrate, extend, improve, or replace parts of that stack based on fit and risk.",
    keywords: ["legacy", "tools", "stack", "compatibility"],
  },
  {
    id: "ai-in-process",
    categoryId: "technology",
    question: "Can AI be incorporated into an existing business process?",
    answer:
      "Yes, where the use case is clear and practical. That can include assistants and chatbots, AI-assisted workflows, or integrating models into an existing product — scoped to the process that needs to improve.",
    keywords: ["artificial intelligence", "chatbot", "automation", "ml"],
  },
  {
    id: "scalable-solution",
    categoryId: "technology",
    question: "Will the solution be scalable as our business grows?",
    answer:
      "We design with growth, maintainability, and future change in mind. The right architecture still depends on the product, the expected load, and how you plan to operate it.",
    keywords: ["scale", "growth", "architecture", "future"],
  },
  {
    id: "ongoing-maintenance",
    categoryId: "maintenance",
    question: "Do you provide ongoing maintenance and support?",
    answer:
      "Yes. We offer website and application maintenance, annual maintenance contracts (AMC), ongoing improvements, and continued development when that support is agreed separately from the original delivery.",
    keywords: ["amc", "support", "updates", "hosting"],
  },
  {
    id: "maintain-others-software",
    categoryId: "maintenance",
    question: "Can you maintain software developed by another team?",
    answer:
      "Yes, after an assessment. We review structure, condition, access, and risk first, then recommend the right maintenance or remediation path.",
    keywords: ["takeover", "handover", "third party", "legacy"],
  },
  {
    id: "improve-after-launch",
    categoryId: "maintenance",
    question: "Can we continue improving the solution after launch?",
    answer:
      "Yes. After launch we can continue with features, integrations, performance work, and enhancements as your priorities evolve.",
    keywords: ["iterate", "roadmap", "enhancements", "post-launch"],
  },
  {
    id: "get-support",
    categoryId: "maintenance",
    question: "How do we get support for an existing solution?",
    answer:
      "Contact us with the product or site involved, what needs attention, and any relevant technical context. We will confirm the next steps and whether support falls under an existing arrangement or a new engagement.",
    keywords: ["help", "issue", "bug", "support ticket"],
  },
] as const;

export const calicapFaqs = {
  metaTitle: "FAQs",
  metaDescription:
    "Answers about Calicon’s services, project process, technology approach, pricing discussions, and ongoing maintenance.",
  path: "/faqs",
  hero: {
    eyebrow: "FAQs",
    title: "Frequently asked questions",
    intro:
      "Clear answers about our services, how projects start, technology choices, pricing discussions, and support after launch.",
    ctaLabel: "Contact Calicon",
    ctaHref: "/contact",
  },
  search: {
    label: "Search questions",
    placeholder: "Search by topic, service, or keyword…",
    clearLabel: "Clear search",
  },
  categories: {
    allLabel: "All",
    navLabel: "FAQ categories",
  },
  results: {
    matchOne: "1 matching question",
    matchMany: (n: number) => `${n} matching questions`,
    emptyTitle: "No matching questions",
    emptyBody:
      "Try a different search term, or clear the search to browse by category.",
  },
  related: {
    title: "Looking for something else?",
    body: "Explore what we deliver, how we work, or read the legal notices that apply to this website.",
    links: [
      { href: "/services", label: "Services" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/terms-and-conditions", label: "Terms & Conditions" },
      { href: "/privacy-policy", label: "Privacy Policy" },
    ] as const,
  },
} as const;

export function getFaqCategoryLabel(id: FaqCategoryId): string {
  return FAQ_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function filterFaqItems(
  items: readonly FaqItem[],
  categoryId: FaqCategoryId | "all",
  query: string,
): FaqItem[] {
  const normalized = query.trim().toLowerCase();
  return items.filter((item) => {
    if (categoryId !== "all" && item.categoryId !== categoryId) return false;
    if (!normalized) return true;
    const haystack = [
      item.question,
      item.answer,
      ...(item.keywords ?? []),
      getFaqCategoryLabel(item.categoryId),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}
