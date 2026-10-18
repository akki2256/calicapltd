/**
 * Terms & Conditions content — shared by Canvas and Calicon themes.
 *
 * Accuracy rules:
 * - Do not invent commercial policies, warranties, liability caps, or ownership rules.
 * - Distinguish website use from separate project agreements.
 * - Unresolved items live in TERMS_REVIEW_CHECKLIST.
 *
 * Publication gate: keep `requiresOwnerReview` true (and noIndex on the route)
 * until the checklist is completed and legal review is done.
 */

export const calicapTerms = {
  /** Flip to false only after owner + legal review of the checklist. */
  requiresOwnerReview: true,
  metaTitle: "Terms & Conditions",
  metaDescription:
    "Terms governing use of the Calicon website, and how website information relates to separate project agreements.",
  path: "/terms-and-conditions",
  lastUpdatedLabel: "17 October 2026",
  lastUpdatedIso: "2026-10-17",
  brandName: "Calicon",
  contactEmail: "communications@calicon.in",
  businessAddress:
    "501–502, Tower A, Corporate Park, Sector 136, Noida",
  hero: {
    eyebrow: "Legal",
    title: "Terms & Conditions",
    intro:
      "These terms explain how you may use the Calicon website. They are written carefully from known business context and are not a substitute for a reviewed service contract or legal advice.",
  },
  reviewBanner: {
    title: "Owner and legal review required before publication",
    body: "This page describes website use and how project work is expected to be agreed separately. Several commercial and legal items remain unconfirmed. Search engines are instructed not to index this page until review is complete. Preliminary sections are labelled clearly and should not be treated as final contract language.",
  },
} as const;

export type TermsSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  note?: string;
  /** Visible marker that the section is not finalized legal language */
  preliminary?: boolean;
};

export const TERMS_SECTIONS: readonly TermsSection[] = [
  {
    id: "introduction",
    title: "Introduction and acceptance",
    paragraphs: [
      "These Terms & Conditions (“Terms”) apply to access to and use of the Calicon website (the “Site”), including browsing public pages and submitting enquiries through the Contact form.",
      "By using the Site, you agree to use it in accordance with these Terms and applicable law. These Terms are intended as website usage terms. They are not, by themselves, a signed service agreement for a technology project, and they do not replace a proposal, statement of work, or other written contract that may later be agreed for specific work.",
      "If you do not agree with these Terms, please do not use the Site. Calicon is the brand name presented on this Site. The exact registered legal entity name that operates the Site has not been confirmed for this notice and will be stated here once verified.",
    ],
  },
  {
    id: "about-calicon",
    title: "About Calicon",
    paragraphs: [
      "Calicon provides business technology and digital solutions. Information published on the Site describes capabilities that may include websites, web applications, mobile applications, custom software, business management systems, UI/UX design, AI applications, workflow automation, API and system integration, technology consulting, and maintenance and support.",
      "Not every capability is included in every engagement, and availability depends on requirements, feasibility, and what is agreed in writing for a specific project.",
      "Business address currently provided for correspondence: 501–502, Tower A, Corporate Park, Sector 136, Noida, India. Confirmation of the registered legal entity associated with this address remains outstanding.",
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
      "Detailed payment schedules, deposits, cancellations, and refunds — if any — are commercial policies that must be set in the applicable written agreement. They are not defined by these website Terms.",
    ],
    note:
      "Commercial terms for payments, cancellations, and refunds remain subject to owner confirmation and should not be inferred from this page.",
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    paragraphs: [
      "Unless otherwise stated, Calicon’s website content, branding, design, and other materials on the Site are protected by applicable intellectual property laws. You may view and use the Site for lawful enquiry and evaluation purposes, but you may not copy or reuse Site materials for commercial republication without permission, except where law allows.",
      "The Site and Calicon’s work may refer to or rely on third-party software, trademarks, libraries, fonts, stock assets, platforms, or other licensed materials. Those items remain subject to their owners’ rights and licence terms.",
      "Ownership, licensing, source-code access, reuse rights, and third-party licensing obligations for project deliverables depend on the applicable written agreement and relevant third-party licences. These Terms do not assign automatic exclusive ownership of all deliverables to either Calicon or the client, and they do not grant unrestricted rights to all source code by default.",
    ],
    preliminary: true,
  },
  {
    id: "client-responsibilities",
    title: "Client responsibilities",
    paragraphs: [
      "Where you engage Calicon on a project, you are generally expected to provide accurate information, obtain permissions for materials you supply (such as content, logos, data, or credentials you are authorized to share), review deliverables in a timely way, and identify relevant business requirements.",
      "These expectations are illustrative. Project-specific responsibilities, dependencies, and acceptance processes should be documented in the relevant agreement. These Terms do not make the client responsible for every possible project outcome.",
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
      "Project confidentiality obligations, if any, should be set out in the applicable proposal or service agreement.",
    ],
  },
  {
    id: "warranties",
    title: "Warranties and disclaimers",
    paragraphs: [
      "The Site is provided for general information and enquiry purposes. Calicon aims to keep Site content useful and reasonably accurate, but does not promise that the Site will always be available, complete, current, error-free, or fully secure.",
      "General descriptions of capabilities on the Site are not warranties of fitness for a particular purpose. Contractual commitments about deliverables, performance, or remedies — if any — are made only in an applicable written project agreement.",
      "Nothing in these Terms is intended to exclude rights or obligations that cannot lawfully be excluded under applicable Indian law. Warranty language for projects and for the Site requires legal review before it is treated as final.",
    ],
    preliminary: true,
  },
  {
    id: "liability",
    title: "Limitation of liability",
    paragraphs: [
      "This section is preliminary and is published only as a placeholder for legal review. It does not set a monetary liability cap, does not exclude all categories of loss, and should not be treated as finalized contract language.",
      "Any limitation of liability relating to the Site or to project work must be appropriately scoped, consistent with applicable law, and coordinated with the written agreements that govern specific engagements. Until that review is complete, liability questions for project work are expected to be addressed in the applicable project agreement rather than by these website Terms alone.",
    ],
    preliminary: true,
    note:
      "Do not rely on this section as an enforceable limitation. Owner and counsel must approve final wording before publication as established terms.",
  },
  {
    id: "suspension",
    title: "Suspension and termination",
    paragraphs: [
      "Calicon may restrict or suspend access to Site features where reasonably necessary to protect the Site, other users, or lawful operation (for example, in response to abuse of the Contact form).",
      "These Terms do not define project termination notice periods, automatic termination fees, refund restrictions, or cancellation rules. Those matters belong in the applicable project agreement, if any.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these Terms",
    paragraphs: [
      "Calicon may update these Terms when Site practices, services descriptions, or legal requirements change. The “Last updated” date at the top of this page reflects the date of the latest update to this notice.",
      "Updated Terms will be posted on this page. These Terms do not claim that every change automatically applies retroactively, or that every visitor will receive individual notice. The process for when updated website Terms take effect — and whether additional notice is required — remains subject to owner and legal confirmation.",
    ],
    preliminary: true,
  },
  {
    id: "governing-law",
    title: "Governing law and jurisdiction",
    paragraphs: [
      "Calicon operates from India. The exact registered legal entity, and the governing law, venue, and dispute-resolution process that should apply to website use and to project contracts, have not been confirmed for this notice.",
      "This section therefore does not declare exclusive jurisdiction of any particular court or city, and it does not select a governing-law clause for publication as final terms.",
    ],
    preliminary: true,
    note:
      "Legal review required: confirm governing law, jurisdiction, and dispute-resolution wording appropriate to the operating entity and customer relationships before this section is finalized.",
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      "Questions about these Terms may be sent to communications@calicon.in.",
      "Business address currently provided: 501–502, Tower A, Corporate Park, Sector 136, Noida.",
      "For privacy-specific requests, see the Privacy Policy and use the privacy contact details stated there. General project enquiries may also be submitted through the Contact page.",
    ],
  },
] as const;

/** Internal pre-publication checklist — not rendered as public legal text. */
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
    status: "unresolved" as const,
    item: "After review: set requiresOwnerReview to false, remove noIndex, add /terms-and-conditions to the sitemap, and keep /terms redirect.",
  },
] as const;
