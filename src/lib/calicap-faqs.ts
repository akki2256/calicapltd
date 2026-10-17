/**
 * FAQ page content — single source for Canvas and Calicon themes.
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
      "Calicon helps businesses solve operational and technology challenges through websites, applications, custom software, business systems, AI solutions, integrations, and automation.",
    keywords: ["overview", "company", "offerings", "digital products"],
  },
  {
    id: "what-types-of-businesses",
    categoryId: "general",
    question: "What types of businesses do you work with?",
    answer:
      "We work with businesses at different stages of growth — from those establishing a digital presence to those improving existing systems or building more advanced solutions.",
    keywords: ["clients", "industries", "startups", "enterprises"],
  },
  {
    id: "need-to-know-technology",
    categoryId: "general",
    question: "Do I need to know exactly what technology I need?",
    answer:
      "No. You can start with your business problem, goal, or idea. We help understand your requirements and identify a suitable approach.",
    keywords: ["unsure", "requirements", "discovery", "advice"],
  },
  {
    id: "where-is-calicon-available",
    categoryId: "general",
    question: "Where is Calicon available?",
    answer:
      "Calicon works with businesses looking for technology solutions across different markets. Use the Contact page to discuss your location and project requirements.",
    keywords: ["location", "remote", "markets", "geography"],
  },
  {
    id: "what-services",
    categoryId: "services",
    question: "What services does Calicon offer?",
    answer:
      "Our services include web development, mobile applications, custom software, business management systems, AI and automation, API and system integration, UI/UX design, technology consulting, and maintenance and support.",
    keywords: ["catalogue", "capabilities", "web", "mobile", "ai"],
  },
  {
    id: "improve-existing",
    categoryId: "services",
    question: "Can you improve or replace an existing website or application?",
    answer:
      "Yes. We can review your current solution and discuss improvements, redesigns, new functionality, integrations, or replacement options based on your needs.",
    keywords: ["redesign", "rebuild", "modernize", "legacy"],
  },
  {
    id: "idea-still-developing",
    categoryId: "services",
    question: "Can you work with an idea that is still being developed?",
    answer:
      "Yes. We can help clarify the requirements, explore possible approaches, and define a practical direction before development begins.",
    keywords: ["concept", "early stage", "scoping", "discovery"],
  },
  {
    id: "custom-or-platforms",
    categoryId: "services",
    question: "Do you build custom software or use existing platforms?",
    answer:
      "The approach depends on the problem. We can use existing platforms, customize and integrate available tools, or develop a custom solution when it makes sense.",
    keywords: ["wordpress", "saas", "bespoke", "off the shelf"],
  },
  {
    id: "integrate-systems",
    categoryId: "services",
    question: "Can you integrate different systems?",
    answer:
      "Yes. We can help connect applications, APIs, and business systems so information and processes work together more effectively.",
    keywords: ["api", "integrations", "connect", "sync"],
  },
  {
    id: "how-project-starts",
    categoryId: "projects",
    question: "How does a project get started?",
    answer:
      "Start by sharing your goals, challenges, or project idea through our Contact page. We can then discuss the requirements, possible approach, scope, and next steps.",
    keywords: ["kickoff", "onboarding", "enquiry", "begin"],
  },
  {
    id: "requirements-not-defined",
    categoryId: "projects",
    question: "What if my requirements are not fully defined?",
    answer:
      "That is fine. We can work through your current situation, identify what needs to be solved, and help clarify the requirements.",
    keywords: ["unclear", "discovery", "scoping"],
  },
  {
    id: "how-long-project",
    categoryId: "projects",
    question: "How long does a project take?",
    answer:
      "Timelines depend on the scope, complexity, requirements, and integrations involved. We discuss the expected timeline once we understand the project.",
    keywords: ["timeline", "duration", "schedule", "delivery"],
  },
  {
    id: "client-involvement",
    categoryId: "projects",
    question: "Will I be involved throughout the project?",
    answer:
      "We believe clear communication and collaboration are important. Project discussions, reviews, and feedback help keep the work aligned with your requirements.",
    keywords: ["collaboration", "updates", "reviews", "feedback"],
  },
  {
    id: "work-with-existing-team",
    categoryId: "projects",
    question: "Can you work with an existing team?",
    answer:
      "We can discuss your current team, systems, and workflow to determine how our services can fit into your existing setup.",
    keywords: ["partnership", "augment", "collaborate", "in-house"],
  },
  {
    id: "how-much-cost",
    categoryId: "pricing",
    question: "How much does a project cost?",
    answer:
      "Costs depend on the scope, functionality, complexity, and delivery requirements. Contact us with your needs so we can discuss the appropriate approach and estimate.",
    keywords: ["budget", "price", "cost", "quote"],
  },
  {
    id: "fixed-price",
    categoryId: "pricing",
    question: "Do you offer fixed-price projects?",
    answer:
      "The pricing model depends on the project requirements and how clearly the scope can be defined. We discuss suitable arrangements before work begins.",
    keywords: ["fixed bid", "time and materials", "retainer"],
  },
  {
    id: "phased-delivery",
    categoryId: "pricing",
    question: "Can the project be delivered in phases?",
    answer:
      "Where appropriate, we can discuss dividing a project into manageable phases based on priorities, dependencies, and requirements.",
    keywords: ["milestones", "mvp", "stages", "incremental"],
  },
  {
    id: "get-estimate",
    categoryId: "pricing",
    question: "How do I get a project estimate?",
    answer:
      "Share your idea, existing system, key requirements, and desired outcome through the Contact page. The more context you provide, the easier it is to assess the work involved.",
    keywords: ["quote", "proposal", "estimate", "budget"],
  },
  {
    id: "which-technologies",
    categoryId: "technology",
    question: "Which technologies do you work with?",
    answer:
      "Technology choices depend on the project's requirements, existing systems, performance needs, and long-term goals. We select an appropriate approach based on those factors.",
    keywords: ["stack", "react", "node", "tech", "framework"],
  },
  {
    id: "existing-software-tools",
    categoryId: "technology",
    question: "Can you work with our existing software and tools?",
    answer:
      "We can assess your existing tools and systems to understand whether they can be integrated, improved, extended, or replaced.",
    keywords: ["legacy", "tools", "stack", "compatibility"],
  },
  {
    id: "ai-in-process",
    categoryId: "technology",
    question: "Can AI be incorporated into an existing business process?",
    answer:
      "Potentially, yes. We can explore AI applications, chatbot development, AI integration, and workflow automation based on your use case and practical requirements.",
    keywords: ["artificial intelligence", "chatbot", "automation", "ml"],
  },
  {
    id: "scalable-solution",
    categoryId: "technology",
    question: "Will the solution be scalable as our business grows?",
    answer:
      "We consider anticipated growth, maintainability, and future requirements when planning a solution. The appropriate architecture depends on the specific project.",
    keywords: ["scale", "growth", "architecture", "future"],
  },
  {
    id: "ongoing-maintenance",
    categoryId: "maintenance",
    question: "Do you provide ongoing maintenance and support?",
    answer:
      "Yes. We offer website and application maintenance, annual maintenance contracts (AMC), ongoing improvements, and continued development where required.",
    keywords: ["amc", "support", "updates", "hosting"],
  },
  {
    id: "maintain-others-software",
    categoryId: "maintenance",
    question: "Can you maintain software developed by another team?",
    answer:
      "We can assess an existing application or website to understand its structure, condition, and maintenance requirements before determining the appropriate next steps.",
    keywords: ["takeover", "handover", "third party", "legacy"],
  },
  {
    id: "improve-after-launch",
    categoryId: "maintenance",
    question: "Can we continue improving the solution after launch?",
    answer:
      "Yes. We can discuss further features, integrations, optimizations, and enhancements as your business needs evolve.",
    keywords: ["iterate", "roadmap", "enhancements", "post-launch"],
  },
  {
    id: "get-support",
    categoryId: "maintenance",
    question: "How do we get support for an existing solution?",
    answer:
      "Contact us with details of the solution, the issue or improvement required, and any relevant technical information. We can discuss the next steps.",
    keywords: ["help", "issue", "bug", "support ticket"],
  },
] as const;

export const calicapFaqs = {
  metaTitle: "FAQs",
  metaDescription:
    "Answers about Calicon's services, project process, technology approach, pricing discussions, and ongoing maintenance — before you get in touch.",
  path: "/faqs",
  hero: {
    eyebrow: "Frequently asked questions",
    title: "Questions? Let's clear things up.",
    intro:
      "Find answers about our services, how we work, and what it takes to get your project started.",
    ctaLabel: "Still have questions?",
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
    body: "Explore what we deliver, how we work, or get in touch directly.",
    links: [
      { href: "/services", label: "Services" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
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
