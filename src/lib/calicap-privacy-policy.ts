/**
 * Privacy Policy — published website copy.
 *
 * Accuracy rules:
 * - State only practices verified in this codebase / provided by the owner.
 * - Do not invent legal entity names, retention years, certifications, or compliance claims.
 * - Unresolved items live in PRIVACY_POLICY_REVIEW_CHECKLIST (not as draft language on the page).
 */

export const calicapPrivacyPolicy = {
  /** Published notice. false keeps the route indexable. */
  requiresOwnerReview: false,
  metaTitle: "Privacy Policy",
  metaDescription:
    "How Calicon handles personal information submitted through this website and related communications.",
  path: "/privacy-policy",
  lastUpdatedLabel: "17 November 2026",
  lastUpdatedIso: "2026-11-17",
  brandName: "Calicon",
  privacyEmail: "communications@calicon.in",
  businessAddress:
    "501–502, Tower A, Corporate Park, Sector 136, Noida",
  hero: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro:
      "This notice explains how Calicon handles personal information collected through this website and related communications.",
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
      "Calicon is the business operating this website. This website is intended primarily for business customers and people contacting Calicon about professional services.",
      "This notice is for information only and is not legal advice.",
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
      "Answers to guided discovery questions, if you use the “I’m not sure what I need” path (for example, what your organisation does, what is not working well, what success would look like, and whether you already use related systems)",
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
      "We use service providers to operate the website and deliver related communications:",
    ],
    bullets: [
      "Vercel hosts and deploys this website. When you visit the site or submit a form, related request data may be processed on Vercel’s infrastructure so the site can load and server actions can run.",
      "Resend delivers Contact form enquiries by email. When delivery is configured, the enquiry content (including name, email, company, optional phone, message details, discovery answers where provided, and any attribution fields) is sent through Resend to Calicon’s inbox, with your email address set as the reply-to address.",
    ],
    note:
      "These providers process information as needed to perform their services. Their own terms, privacy notices, and data processing terms also apply.",
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    paragraphs: [
      "Calicon may use Google Analytics on this website when a measurement ID is configured. When Analytics is active, usage events are limited to non-personal page and interaction signals; form contents and direct personal details are not sent. The Analytics script does not load when your browser’s Do Not Track setting is enabled.",
      "Separately from Analytics, the site may use browser session storage for optional campaign attribution values described above.",
    ],
    bullets: [
      "Session storage: optional campaign attribution values from the URL",
      "Hosting and delivery platforms may set cookies or similar technology needed to operate the site",
    ],
    note:
      "Third-party destinations you choose to visit (for example social profiles or image hosts used on some pages) operate under their own policies.",
  },
  {
    id: "sharing-transfers",
    title: "Sharing and international processing",
    paragraphs: [
      "We share personal information with service providers only as needed to operate the website and handle enquiries — currently Vercel (hosting) and Resend (email delivery), and with Calicon personnel who need the information to respond.",
      "We do not sell personal information to third parties.",
      "Hosting and email infrastructure may process information outside India. Selecting a sending or compute region does not necessarily mean all related data remains in that region.",
    ],
  },
  {
    id: "retention",
    title: "Data retention",
    paragraphs: [
      "Contact information and enquiry details may be retained while they are needed to manage enquiries, provide related services, maintain relevant business records, and meet applicable legal obligations.",
      "You may ask us about retention or deletion for your information using the contact details below. We will consider requests in light of our operational needs and applicable law.",
    ],
  },
  {
    id: "security",
    title: "Data security",
    paragraphs: [
      "We take reasonable steps appropriate to the nature of a marketing and enquiry website. Those steps include transmitting the site over HTTPS on the hosting platform, validating Contact form input on the server, rate limiting submissions by IP and email, and failing closed when email delivery is not configured so enquiries are not silently treated as successful.",
      "No method of transmission or storage is completely secure. We do not claim absolute security or that unauthorised access can never occur.",
    ],
  },
  {
    id: "rights",
    title: "Privacy questions and requests",
    paragraphs: [
      "If you have questions about this notice, or want to ask about access, correction, or deletion of personal information you have provided, contact us at communications@calicon.in.",
      "We will review requests in good faith. We may decline or limit a request where we must keep information for legal, security, or legitimate business reasons, or where applicable law permits.",
      "Calicon’s activities may be subject to applicable Indian laws relating to personal data, including the Digital Personal Data Protection Act, 2023, and related rules as and when they apply.",
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
      "Calicon may update this Privacy Policy when practices, providers, or applicable requirements change. Updated notices are posted on this page with an updated date.",
      "Where changes are material, we will take reasonable steps to make the updated notice available on this page.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      "For privacy questions or requests:",
      "Email: communications@calicon.in",
      "Business address: 501–502, Tower A, Corporate Park, Sector 136, Noida, India.",
      "General website enquiries may also be sent through the Contact page. Please use the privacy email above for privacy-specific requests so they can be routed appropriately.",
    ],
  },
] as const;

/** Internal only — not rendered on the public page. */
export const PRIVACY_POLICY_REVIEW_CHECKLIST = [
  {
    id: "legal-entity",
    status: "unresolved" as const,
    item: "Confirm the exact registered legal entity name for Calicon (brand only is verified today).",
  },
  {
    id: "address",
    status: "owner-provided" as const,
    item: "Confirm the Noida address presentation (postal/country lines) and entity match.",
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
    item: "Production loads Google Analytics when NEXT_PUBLIC_GA_MEASUREMENT_ID is set. Events exclude form contents and direct personal details. Script stays off when Do Not Track is enabled.",
  },
  {
    id: "cookies-storage",
    status: "verified-in-code" as const,
    item: "Code uses sessionStorage for attribution. Theme localStorage was removed with dual-theme support. Confirm live-domain Set-Cookie headers from Vercel/Next as needed.",
  },
  {
    id: "providers",
    status: "partial" as const,
    item: "Confirm Calicon’s Vercel and Resend account regions, DPAs/subprocessor lists, and whether enquiry emails are retained in Resend logs.",
  },
  {
    id: "transfers",
    status: "unresolved" as const,
    item: "Confirm international transfer posture for India-based business customers if stronger transfer language is later required.",
  },
  {
    id: "retention",
    status: "unresolved" as const,
    item: "Approve concrete retention periods and deletion procedures for inactive enquiries if fixed durations should be published later.",
  },
  {
    id: "dpdp",
    status: "unresolved" as const,
    item: "Legal review of Digital Personal Data Protection Act, 2023 applicability before claiming formal compliance.",
  },
  {
    id: "publish-gate",
    status: "done" as const,
    item: "Published: requiresOwnerReview is false, the route is indexable, and /privacy-policy is in the sitemap.",
  },
] as const;
