/**
 * Privacy Policy content — shared by Canvas and Calicon themes.
 *
 * Accuracy rules:
 * - State only practices verified in this codebase / provided by the owner.
 * - Do not invent legal entity names, retention years, certifications, or compliance claims.
 * - Unresolved items live in PRIVACY_POLICY_REVIEW_CHECKLIST (not as fake certainty on the page).
 *
 * Publication gate: keep `requiresOwnerReview` true (and noIndex on the route)
 * until the checklist is completed and legal review is done.
 */

export const calicapPrivacyPolicy = {
  /** Flip to false only after owner + legal review of the checklist. */
  requiresOwnerReview: true,
  metaTitle: "Privacy Policy",
  metaDescription:
    "How Calicon handles personal information submitted through this website and related communications.",
  path: "/privacy-policy",
  lastUpdatedLabel: "17 October 2026",
  lastUpdatedIso: "2026-10-17",
  brandName: "Calicon",
  privacyEmail: "communications@calicon.in",
  businessAddress:
    "501–502, Tower A, Corporate Park, Sector 136, Noida",
  hero: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro:
      "This notice explains how Calicon handles personal information collected through this website and related communications. It is written from verified site practices and is not legal advice.",
  },
  reviewBanner: {
    title: "Owner review required before publication",
    body: "This page reflects practices confirmed in the current website codebase and details provided by the business. Several legal and operational items still need confirmation. Search engines are instructed not to index this page until review is complete.",
  },
} as const;

export type PrivacySection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  note?: string;
};

/**
 * Policy body. Keep claims conservative; prefer "may" where evidence is incomplete.
 */
export const PRIVACY_POLICY_SECTIONS: readonly PrivacySection[] = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      "This Privacy Policy describes how Calicon (“Calicon”, “we”, “us”) handles personal information collected through the Calicon website and communications that result from that website — in particular, enquiries sent through the Contact form.",
      "Calicon is the brand name presented on this website. The exact registered legal entity name that operates the site has not been confirmed for this notice and will be stated here once verified. Until then, references to Calicon mean the business operating this website under that brand.",
      "This website is intended primarily for business customers and people contacting Calicon about professional services. This notice is for information only and is not legal advice.",
    ],
  },
  {
    id: "information-collected",
    title: "Information we collect",
    paragraphs: [
      "We collect personal information that you choose to provide when you contact us. Through the website Contact form, that may include:",
    ],
    bullets: [
      "Name",
      "Work email address",
      "Company or business name",
      "Phone or WhatsApp number (optional)",
      "Details you provide about your goals, challenges, project needs, or situation",
      "Answers to guided discovery questions, if you use the “I’m not sure what I need” path (for example, what your organisation does, what is not working well, what you want to improve, what success would look like, and whether you already use related systems)",
      "Optional notes you choose to add",
    ],
    note:
      "We do not ask for account passwords, payment card details, or newsletter sign-ups through this website’s Contact form. We do not intentionally collect special categories of sensitive personal data through the form.",
  },
  {
    id: "technical-attribution",
    title: "Technical and attribution information",
    paragraphs: [
      "When you visit pages that load the site’s analytics helper, the site may store non-sensitive campaign details from the URL (for example utm_source, utm_medium, utm_campaign, and the landing path) in your browser’s session storage. If you later submit the Contact form, those values may be included with your enquiry so we can understand how you found us. They are not used to build advertising profiles.",
      "When you submit the Contact form, our servers may also process technical request information such as an IP address (from standard forwarding headers) for rate limiting and abuse prevention. That processing happens in memory for short windows and is not designed as a long-term contact database.",
      "The site stores a theme preference key in local storage so the interface can keep a consistent presentation. That value is not used to identify you for marketing.",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use information",
    paragraphs: [
      "We use the information you provide for these purposes:",
    ],
    bullets: [
      "Responding to enquiries",
      "Communicating about services you have asked about",
      "Providing services where an engagement follows",
      "Understanding enquiry context (including optional campaign attribution you arrived with)",
      "Protecting the Contact form from abuse through rate limiting",
    ],
    note:
      "We do not sell personal information. We do not use Contact form contents for advertising profiles, heatmaps, or session recording on this site.",
  },
  {
    id: "hosting-providers",
    title: "Hosting and service providers",
    paragraphs: [
      "We use service providers to operate the website and deliver related communications. Based on the current implementation:",
    ],
    bullets: [
      "Vercel hosts and deploys this website. When you visit the site or submit a form, related request data may be processed on Vercel’s infrastructure so the site can load and server actions can run.",
      "Resend delivers Contact form enquiries by email. When delivery is configured, the enquiry content (including name, email, company, optional phone, message details, discovery answers where provided, and any attribution fields) is sent through Resend to Calicon’s inbox, with your email address set as the reply-to address.",
    ],
    note:
      "These providers process information as needed to perform their services. Their own terms, privacy notices, and data processing terms also apply to their processing. We do not claim that either provider never stores data or that all processing stays in India.",
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    paragraphs: [
      "As of the last update of this notice, third-party website analytics are not enabled in the project’s configured environment: no Google Analytics measurement ID or custom analytics endpoint is set, so the site does not load Google’s gtag script under that configuration. The codebase can load Google Analytics only if a measurement ID is later configured and the browser’s Do Not Track setting is not enabled.",
      "Separately from analytics, the site uses browser storage for functional purposes:",
    ],
    bullets: [
      "Local storage: a theme preference key used for presentation",
      "Session storage: optional campaign attribution values described above",
    ],
    note:
      "This notice does not claim the site is cookie-free. Hosting platforms, browsers, and third-party assets used on some pages (for example image hosts such as Unsplash on pages that display those images, or social-network destinations if you follow outbound links) may set or read cookies or similar data under their own policies. A full production cookie inventory should be confirmed on the live domain before stronger cookie claims are made.",
  },
  {
    id: "sharing-transfers",
    title: "Sharing and international processing",
    paragraphs: [
      "We share personal information with service providers only as needed to operate the website and handle enquiries — currently Vercel (hosting) and Resend (email delivery), and with Calicon personnel who need the information to respond.",
      "We do not sell personal information to third parties.",
      "Hosting and email infrastructure may process information outside India. Public documentation from these providers indicates that processing and storage can involve facilities in the United States and other countries where they or their subprocessors operate. Selecting a sending or compute region does not necessarily mean all related data remains in that region.",
      "International transfers and the contractual safeguards that should apply (for example, provider data processing terms) need business-owner confirmation for Calicon’s specific accounts and arrangements.",
    ],
  },
  {
    id: "retention",
    title: "Data retention",
    paragraphs: [
      "Contact information and enquiry details may be retained while they are needed to manage enquiries, provide related services, maintain relevant business records, and meet applicable legal obligations. The business currently intends to keep contact information for an extended period where it remains relevant to those purposes.",
      "This notice does not set a fixed number of years or promise indefinite retention. Retention and deletion practices — including when inactive enquiries and unnecessary personal information should be deleted — still need a concrete owner-approved policy.",
      "You may ask us about retention or deletion for your information using the contact details below. We will consider requests in light of our operational needs and applicable law.",
    ],
  },
  {
    id: "security",
    title: "Data security",
    paragraphs: [
      "We take reasonable steps appropriate to the nature of a marketing and enquiry website. In the current implementation, those steps include transmitting the site over HTTPS on the hosting platform, validating Contact form input on the server, rate limiting submissions by IP and email, and failing closed when email delivery is not configured so enquiries are not silently discarded as “successful”.",
      "No method of transmission or storage is completely secure. We do not claim absolute security, specific encryption certifications for Calicon itself, or that unauthorised access can never occur.",
    ],
  },
  {
    id: "rights",
    title: "Privacy questions and requests",
    paragraphs: [
      "If you have questions about this notice, or want to ask about access, correction, or deletion of personal information you have provided, contact us at communications@calicon.in.",
      "We will review requests in good faith. We do not guarantee a specific response deadline or that every request can be fulfilled in every circumstance, especially where we must keep information for legal, security, or legitimate business reasons.",
      "Calicon’s activities may be subject to applicable Indian laws relating to personal data, including the Digital Personal Data Protection Act, 2023, and related rules as and when they apply. This notice mentions that framework for transparency; it does not claim that Calicon has completed a formal compliance assessment or that every provision of that law (or of other regimes such as the GDPR) applies to every visitor.",
    ],
  },
  {
    id: "children",
    title: "Children’s privacy",
    paragraphs: [
      "This website is directed at business customers and professional enquiries. It is not intended for children. We do not knowingly seek personal information from children through the Contact form. If you believe a child has provided personal information to us through this site, contact communications@calicon.in so we can review and address the matter.",
    ],
  },
  {
    id: "updates",
    title: "Updates to this notice",
    paragraphs: [
      "We may update this Privacy Policy when our practices, providers, or applicable requirements change. The “Last updated” date at the top of the page reflects the date of the latest update to this notice.",
      "Where changes are material, we will take reasonable steps to make the updated notice available on this page.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      "For privacy questions or requests:",
      "Email: communications@calicon.in",
      "Business address: 501–502, Tower A, Corporate Park, Sector 136, Noida",
      "General website enquiries may also be sent through the Contact page. Please use the privacy email above for privacy-specific requests so they can be routed appropriately.",
    ],
  },
] as const;

/** Internal pre-publication checklist — not rendered as public legal text. */
export const PRIVACY_POLICY_REVIEW_CHECKLIST = [
  {
    id: "legal-entity",
    status: "unresolved" as const,
    item: "Confirm the exact registered legal entity name for Calicon (brand name is Calicon; no company suffix or registration number is verified in the codebase).",
  },
  {
    id: "address",
    status: "owner-provided" as const,
    item: "Confirm presentation of the Noida address (postal code, country line, and that it is the correct public address for the operating entity).",
  },
  {
    id: "privacy-email",
    status: "owner-provided" as const,
    item: "Confirm communications@calicon.in is monitored for privacy requests and public contact.",
  },
  {
    id: "contact-fields",
    status: "verified-in-code" as const,
    item: "Contact form fields and Resend payload match this notice (name, email, company, optional phone, message/discovery content, attribution fields).",
  },
  {
    id: "analytics",
    status: "verified-in-code" as const,
    item: "Local env has no NEXT_PUBLIC_GA_MEASUREMENT_ID / analytics endpoint; owner reports analytics unused. Re-check production Vercel env before claiming analytics are off in production.",
  },
  {
    id: "cookies-storage",
    status: "partial" as const,
    item: "Code uses localStorage (theme) and sessionStorage (attribution). No first-party cookie API usage found. Confirm live-domain Set-Cookie headers from Vercel/Next and third-party image hosts.",
  },
  {
    id: "providers",
    status: "partial" as const,
    item: "Confirm Calicon’s Vercel and Resend account regions, DPAs/subprocessor lists, and whether enquiry emails are retained in Resend logs.",
  },
  {
    id: "transfers",
    status: "unresolved" as const,
    item: "Confirm international transfer posture for India-based business customers (Vercel/Resend public docs indicate US-centric storage/processing is possible).",
  },
  {
    id: "retention",
    status: "unresolved" as const,
    item: "Approve concrete retention periods and deletion procedures for inactive enquiries and unnecessary personal information.",
  },
  {
    id: "dpdp",
    status: "unresolved" as const,
    item: "Legal review of Digital Personal Data Protection Act, 2023 applicability, notices, and rights language before claiming compliance.",
  },
  {
    id: "production-domain",
    status: "unresolved" as const,
    item: "Confirm production NEXT_PUBLIC_SITE_URL for canonical metadata (repo example/local value is not a verified public domain).",
  },
  {
    id: "publish-gate",
    status: "unresolved" as const,
    item: "After review: set requiresOwnerReview to false, remove noIndex, add /privacy-policy to the sitemap, and retire or redirect any outdated privacy copy.",
  },
] as const;
