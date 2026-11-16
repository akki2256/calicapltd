/**
 * Terms & Conditions — published website copy.
 *
 * Website use is covered here. Project commercial terms live in the
 * applicable written agreement. TERMS_REVIEW_CHECKLIST is internal only
 * and is not rendered on the page.
 */

export const calicapTerms = {
  /** Published terms. false keeps the route indexable. */
  requiresOwnerReview: false,
  metaTitle: "Terms & Conditions",
  metaDescription:
    "Terms governing use of the Calicon website, and how website information relates to separate project agreements.",
  path: "/terms-and-conditions",
  lastUpdatedLabel: "17 November 2026",
  lastUpdatedIso: "2026-11-17",
  brandName: "Calicon",
  contactEmail: "communications@calicon.in",
  businessAddress:
    "501–502, Tower A, Corporate Park, Sector 136, Noida",
  hero: {
    eyebrow: "Legal",
    title: "Terms & Conditions",
    intro:
      "These terms govern use of the Calicon website. Project work is agreed separately in writing.",
  },
} as const;

export type TermsSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  note?: string;
};

export const TERMS_SECTIONS: readonly TermsSection[] = [
  {
    id: "introduction",
    title: "Introduction and acceptance",
    paragraphs: [
      "These Terms & Conditions (“Terms”) apply to access to and use of the Calicon website (the “Site”), including browsing public pages and submitting enquiries through the Contact form.",
      "By using the Site, you agree to use it in accordance with these Terms and applicable law. These Terms are website usage terms. They are not, by themselves, a signed service agreement for a technology project, and they do not replace a proposal, statement of work, or other written contract that may later be agreed for specific work.",
      "If you do not agree with these Terms, please do not use the Site. Calicon is the business operating this website.",
    ],
  },
  {
    id: "about-calicon",
    title: "About Calicon",
    paragraphs: [
      "Calicon provides business technology and digital solutions. Information published on the Site describes capabilities that may include websites, web applications, mobile applications, custom software, business management systems, UI/UX design, AI applications, workflow automation, API and system integration, technology consulting, and maintenance and support.",
      "Not every capability is included in every engagement, and availability depends on requirements, feasibility, and what is agreed in writing for a specific project.",
      "Business address: 501–502, Tower A, Corporate Park, Sector 136, Noida, India.",
    ],
  },
  {
    id: "website-use",
    title: "Website use",
    paragraphs: [
      "You agree to use the Site lawfully and responsibly. Without limitation, you must not:",
    ],
    bullets: [
      "Attempt unauthorized access to systems, accounts, or non-public areas of the Site or related infrastructure",
      "Disrupt, overload, or interfere with the Site’s operation or other users’ use of the Site",
      "Introduce malicious code or otherwise abuse website functionality, including the Contact form",
      "Copy, scrape, misuse, or exploit Site content in ways that violate applicable law or these Terms",
      "Misrepresent your identity or submit knowingly fraudulent or deceptive enquiries",
    ],
    note:
      "Calicon may take reasonable steps to protect the Site (for example, rate limiting on the Contact form). These Terms do not claim continuous monitoring of every visitor action.",
  },
  {
    id: "services-agreements",
    title: "Services and project agreements",
    paragraphs: [
      "Descriptions of services on the Site are general information about Calicon’s capabilities. They are not a binding offer to perform specific work on stated prices, timelines, or outcomes.",
      "Project scope, deliverables, milestones, timelines, responsibilities, pricing, payment arrangements, acceptance criteria, and other project-specific terms are agreed separately in a proposal, statement of work, service agreement, or other applicable written agreement.",
      "Submitting an enquiry through the Site does not oblige Calicon to accept a project, and it does not create a project contract until both parties agree in writing (or another accepted form of agreement) to proceed.",
    ],
  },
  {
    id: "quotes-pricing",
    title: "Quotes, pricing, and changes",
    paragraphs: [
      "Estimates, proposals, and similar commercial communications are subject to their stated assumptions, scope, validity periods (if any), and terms. This Site does not publish a universal quote-validity period or a single pricing model for all work.",
      "If requirements change, new dependencies appear, third-party costs arise, or the scope expands, a revised estimate or written amendment may be required before additional work proceeds.",
      "Detailed payment schedules, deposits, cancellations, and refunds — if any — are commercial terms set in the applicable written agreement. They are not defined by these website Terms.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    paragraphs: [
      "Unless otherwise stated, Calicon’s website content, branding, design, and other materials on the Site are protected by applicable intellectual property laws. You may view and use the Site for lawful enquiry and evaluation purposes, but you may not copy or reuse Site materials for commercial republication without permission, except where law allows.",
      "The Site and Calicon’s work may refer to or rely on third-party software, trademarks, libraries, fonts, stock assets, platforms, or other licensed materials. Those items remain subject to their owners’ rights and licence terms.",
      "Ownership, licensing, source-code access, reuse rights, and third-party licensing obligations for project deliverables depend on the applicable written agreement and relevant third-party licences. These Terms do not assign automatic exclusive ownership of all deliverables to either Calicon or the client, and they do not grant unrestricted rights to all source code by default.",
    ],
  },
  {
    id: "client-responsibilities",
    title: "Client responsibilities",
    paragraphs: [
      "Where you engage Calicon on a project, you are generally expected to provide accurate information, obtain permissions for materials you supply (such as content, logos, data, or credentials you are authorized to share), review deliverables in a timely way, and identify relevant business requirements.",
      "These expectations are illustrative. Project-specific responsibilities, dependencies, and acceptance processes are documented in the relevant agreement. These Terms do not make the client responsible for every possible project outcome.",
    ],
  },
  {
    id: "third-party",
    title: "Third-party services and integrations",
    paragraphs: [
      "Projects and the Site itself may depend on third-party platforms, APIs, hosting providers, email delivery services, software libraries, payment services, or other external systems. For example, the Site is hosted on Vercel infrastructure, and Contact form delivery may use Resend when configured.",
      "Third-party providers operate under their own terms, pricing, availability, technical limits, and policies. Calicon does not control systems operated solely by other providers and does not guarantee that third-party services will be uninterrupted or unchanged.",
    ],
  },
  {
    id: "maintenance-support",
    title: "Maintenance, support, and updates",
    paragraphs: [
      "Maintenance, support, ongoing development, response times, service levels, and update commitments depend on the applicable service agreement (for example, a maintenance arrangement or continued development engagement).",
      "Unless a written agreement says otherwise, a project delivery does not automatically include free lifetime support, unlimited revisions, ongoing maintenance, or guaranteed response times.",
    ],
  },
  {
    id: "confidentiality-privacy",
    title: "Confidentiality and personal information",
    paragraphs: [
      "Personal information submitted through the Site is handled as described in the Privacy Policy. These Terms do not replace that Privacy Policy and do not create additional data-processing commitments beyond what is stated there or in a separate written agreement.",
      "Project confidentiality obligations, if any, are set out in the applicable proposal or service agreement.",
    ],
  },
  {
    id: "warranties",
    title: "Warranties and disclaimers",
    paragraphs: [
      "The Site is provided for general information and enquiry purposes. Calicon aims to keep Site content useful and reasonably accurate, but does not promise that the Site will always be available, complete, current, error-free, or fully secure.",
      "General descriptions of capabilities on the Site are not warranties of fitness for a particular purpose. Contractual commitments about deliverables, performance, or remedies — if any — are made only in an applicable written project agreement.",
      "Nothing in these Terms excludes rights that cannot lawfully be excluded under applicable Indian law.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    paragraphs: [
      "Liability for project work is governed by the applicable written agreement.",
      "Nothing in these Terms excludes rights that cannot lawfully be excluded under applicable Indian law.",
    ],
  },
  {
    id: "suspension",
    title: "Suspension and termination",
    paragraphs: [
      "Calicon may restrict or suspend access to Site features where reasonably necessary to protect the Site, other users, or lawful operation (for example, in response to abuse of the Contact form).",
      "These Terms do not define project termination notice periods, termination fees, refund restrictions, or cancellation rules. Those matters belong in the applicable project agreement, if any.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these Terms",
    paragraphs: [
      "Calicon may update these website Terms from time to time. Updated Terms are posted on this page with an updated date.",
      "Continued use of the Site after updated Terms are posted is acceptance of the updated website Terms. Updating these website Terms does not rewrite a project contract that has already been signed.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law and jurisdiction",
    paragraphs: [
      "Calicon operates from India. These website Terms are governed by the laws of India.",
      "Project disputes follow the applicable written agreement.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      "Questions about these Terms may be sent to communications@calicon.in.",
      "Business address: 501–502, Tower A, Corporate Park, Sector 136, Noida.",
      "For privacy-specific requests, see the Privacy Policy and use the privacy contact details stated there. General project enquiries may also be submitted through the Contact page.",
    ],
  },
] as const;

/** Internal only — not rendered on the public page. */
export const TERMS_REVIEW_CHECKLIST = [
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
    id: "governing-law",
    status: "unresolved" as const,
    item: "Approve governing law, jurisdiction, and dispute-resolution wording; do not publish exclusive venue until confirmed.",
  },
  {
    id: "warranties-liability",
    status: "unresolved" as const,
    item: "Legal review of warranty disclaimers and any limitation of liability for Site use and coordination with project contracts.",
  },
  {
    id: "ip-ownership",
    status: "unresolved" as const,
    item: "Confirm default ownership/licensing approach for client deliverables and source code (to be reflected in templates and, if needed, a short Site statement).",
  },
  {
    id: "commercial-terms",
    status: "unresolved" as const,
    item: "Confirm whether any payments, cancellations, refunds, or termination rules should ever appear on the Site vs remaining contract-only.",
  },
  {
    id: "terms-acceptance",
    status: "unresolved" as const,
    item: "Confirm notice/acceptance mechanism for updated website Terms (posting only vs additional notice).",
  },
  {
    id: "consistency",
    status: "partial" as const,
    item: "Align final Terms with actual service-agreement templates and the Privacy Policy after both are reviewed.",
  },
  {
    id: "publish-gate",
    status: "done" as const,
    item: "Published: requiresOwnerReview is false, the route is indexable, and /terms-and-conditions is in the sitemap. Keep the /terms redirect.",
  },
] as const;
