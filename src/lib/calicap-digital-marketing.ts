/**
 * Digital marketing readiness — internal checklist only.
 *
 * Not rendered on the public site. Track ops/activation gaps that Privacy and
 * Terms checklists do not cover (ads, NAP UI, social proof, content, pixels).
 *
 * Status meanings (same vocabulary as legal checklists):
 * - done / verified-in-code — implemented and confirmed in this repo
 * - owner-provided — owner supplied a value; still confirm live ops
 * - partial — scaffolded or half-wired
 * - unresolved — needs owner decision, content, or production config
 */

export type DigitalMarketingChecklistStatus =
  | "done"
  | "verified-in-code"
  | "owner-provided"
  | "partial"
  | "unresolved";

export type DigitalMarketingChecklistItem = {
  id: string;
  area:
    | "trust"
    | "nap-local"
    | "measurement"
    | "paid"
    | "organic"
    | "conversion"
    | "ops";
  status: DigitalMarketingChecklistStatus;
  item: string;
  priority: "p0" | "p1" | "p2";
};

/**
 * Reviewed against the repo (Nov 2026). Update statuses as items ship.
 */
export const DIGITAL_MARKETING_REVIEW_CHECKLIST: readonly DigitalMarketingChecklistItem[] =
  [
    // —— Trust & social proof ——
    {
      id: "testimonials-approved",
      area: "trust",
      status: "unresolved",
      priority: "p0",
      item: "Replace placeholder testimonials with client-approved quotes and set published: true. Until then, home falls back to unpublished placeholders (calicap-testimonials.ts) — do not treat as live endorsements.",
    },
    {
      id: "testimonials-gate",
      area: "trust",
      status: "partial",
      priority: "p0",
      item: "getHomeTestimonials() shows placeholders when none are published. Prefer empty/hidden section until at least one approved quote exists.",
    },
    {
      id: "legal-entity-ads",
      area: "trust",
      status: "unresolved",
      priority: "p0",
      item: "Confirm registered legal entity name for Google/Meta Ads verification and contracts (brand “Calicon” only today). Same open item as Privacy/Terms legal-entity.",
    },
    {
      id: "case-study-proof",
      area: "trust",
      status: "verified-in-code",
      priority: "p2",
      item: "Five published case studies with outcomes/delivery notes under /work. Live site links on Yog Mantram, Amazing Art, and Chaitanya; CRM/MIS studies correctly omit public product URLs.",
    },

    // —— NAP & local ——
    {
      id: "nap-contact-ui",
      area: "nap-local",
      status: "partial",
      priority: "p0",
      item: "Public email is in Contact/footer. Noida address appears on Privacy/Terms only — add address (and phone if any) to Contact page and footer for consistent NAP.",
    },
    {
      id: "nap-single-source",
      area: "nap-local",
      status: "partial",
      priority: "p0",
      item: "calicap-contact.ts is intended as NAP source but holds email/social only. Centralize address + phone there, then wire UI + schema from that object.",
    },
    {
      id: "phone-whatsapp",
      area: "nap-local",
      status: "unresolved",
      priority: "p0",
      item: "No public Calicon tel: or WhatsApp Business (wa.me) links. Add if you want call/chat conversion; analytics already classifies those outbound types.",
    },
    {
      id: "org-schema-enrichment",
      area: "nap-local",
      status: "partial",
      priority: "p1",
      item: "Organization / ProfessionalService JSON-LD has name, url, logo, email. Still missing address, telephone, and sameAs (social profiles).",
    },
    {
      id: "social-profiles-live",
      area: "nap-local",
      status: "unresolved",
      priority: "p1",
      item: "Footer social hrefs exist (LinkedIn, X, Instagram, Facebook) with a note to update when live. Confirm each profile exists and matches brand before promoting.",
    },
    {
      id: "google-business-profile",
      area: "nap-local",
      status: "unresolved",
      priority: "p1",
      item: "Ops (not code): claim/verify Google Business Profile for Noida with matching NAP, categories, and website URL.",
    },

    // —— Measurement ——
    {
      id: "prod-site-url",
      area: "measurement",
      status: "unresolved",
      priority: "p0",
      item: "Set production NEXT_PUBLIC_SITE_URL (no trailing slash) so canonicals, sitemap, and OG URLs resolve to the live domain.",
    },
    {
      id: "prod-resend",
      area: "measurement",
      status: "unresolved",
      priority: "p0",
      item: "Configure RESEND_API_KEY, RESEND_FROM_EMAIL, and CONTACT_INBOX_EMAIL in production. Form fails closed without them.",
    },
    {
      id: "prod-ga4",
      area: "measurement",
      status: "unresolved",
      priority: "p0",
      item: "Set NEXT_PUBLIC_GA_MEASUREMENT_ID in production when ready to measure. Event plumbing exists (page_viewed, CTAs, form start/submit, work views).",
    },
    {
      id: "ga4-key-events",
      area: "measurement",
      status: "unresolved",
      priority: "p0",
      item: "In GA4 Admin, mark contact_form_submitted (and optionally contact_cta_clicked) as key events / conversions for Ads and Search reporting.",
    },
    {
      id: "search-console",
      area: "measurement",
      status: "partial",
      priority: "p1",
      item: "Optional NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION is supported. Verify property, submit sitemap.xml, and monitor coverage once the live URL is set.",
    },
    {
      id: "utm-attribution",
      area: "measurement",
      status: "verified-in-code",
      priority: "p2",
      item: "UTM/source params → sessionStorage → Contact form hidden fields → Resend email + channel inference (attribution.ts, growth.ts).",
    },
    {
      id: "first-party-endpoint",
      area: "measurement",
      status: "partial",
      priority: "p2",
      item: "NEXT_PUBLIC_ANALYTICS_ENDPOINT hook exists for first-party event POST/beacon. Wire a receiver only if you want CRM/warehouse capture beyond GA.",
    },
    {
      id: "consent-mode",
      area: "measurement",
      status: "unresolved",
      priority: "p2",
      item: "Site honors Do Not Track only. Add Consent Mode / cookie banner before running EU-heavy paid traffic or extra ad pixels if counsel requires it.",
    },

    // —— Paid / campaigns ——
    {
      id: "campaign-landings",
      area: "paid",
      status: "partial",
      priority: "p1",
      item: "campaigns.ts catalog + sitemap hook exist; CAMPAIGN_LANDINGS is empty. Add real published landings only when a paid campaign has a clear offer and CTA.",
    },
    {
      id: "ad-pixels",
      area: "paid",
      status: "unresolved",
      priority: "p1",
      item: "No Meta, LinkedIn, TikTok, or GTM containers in code. Add only when running paid/retargeting; update Privacy providers checklist if new processors are introduced.",
    },
    {
      id: "ads-conversion-ids",
      area: "paid",
      status: "unresolved",
      priority: "p1",
      item: "Map Google Ads (and other) conversion actions to enquiry submit / key events so CPA/ROAS is measurable.",
    },
    {
      id: "per-page-og",
      area: "paid",
      status: "partial",
      priority: "p2",
      item: "Default opengraph-image + pageMetadata OG/Twitter exist. Most routes share the default image — add custom OG for priority service and case URLs used in ads/social.",
    },

    // —— Organic / content ——
    {
      id: "editorial-content",
      area: "organic",
      status: "partial",
      priority: "p2",
      item: "content.ts editorial types exist; EDITORIAL_CONTENT is empty by design. Publish insights only with real topics — do not invent filler. No Blog nav until content exists.",
    },
    {
      id: "seo-foundation",
      area: "organic",
      status: "verified-in-code",
      priority: "p2",
      item: "Sitemap, robots, canonicals, breadcrumbs, Service/FAQ/CreativeWork JSON-LD, and indexable Privacy/Terms are in place.",
    },
    {
      id: "bing-webmaster",
      area: "organic",
      status: "unresolved",
      priority: "p2",
      item: "Optional: verify Bing Webmaster Tools if Bing/Yahoo discovery matters for your ICP.",
    },

    // —— Conversion paths ——
    {
      id: "contact-funnel",
      area: "conversion",
      status: "verified-in-code",
      priority: "p2",
      item: "Dual know/unsure paths, discovery questions, ProblemCtaButton chooser, floating CTA, rate-limited Resend delivery, and form analytics events are wired.",
    },
    {
      id: "crm-handoff",
      area: "conversion",
      status: "unresolved",
      priority: "p1",
      item: "Enquiries land in email only. Add CRM/webhook/sheet sync if paid leads need SLA tracking and channel reporting without inbox parsing.",
    },
    {
      id: "lead-segment-ops",
      area: "conversion",
      status: "partial",
      priority: "p2",
      item: "segmentFromEnquiry infers channel into the email body. pillarInterest is unused; no durable lead store or scoring yet.",
    },

    // —— Ops hygiene ——
    {
      id: "cwv-heavy-scenes",
      area: "ops",
      status: "partial",
      priority: "p2",
      item: "Canvas/Three.js home and case backdrops are capped but can still pressure mobile LCP/INP. Spot-check CWV on live URLs used in ads before scaling spend.",
    },
    {
      id: "privacy-pixel-sync",
      area: "ops",
      status: "unresolved",
      priority: "p1",
      item: "When adding ad pixels or CRM processors, update Privacy Policy providers language and PRIVACY_POLICY_REVIEW_CHECKLIST before go-live.",
    },
  ] as const;

/** Counts by status — handy for progress snapshots in ops reviews. */
export function digitalMarketingChecklistSummary() {
  const counts: Record<DigitalMarketingChecklistStatus, number> = {
    done: 0,
    "verified-in-code": 0,
    "owner-provided": 0,
    partial: 0,
    unresolved: 0,
  };
  for (const row of DIGITAL_MARKETING_REVIEW_CHECKLIST) {
    counts[row.status] += 1;
  }
  return counts;
}

/** Open work ordered by priority (p0 → p2), unresolved/partial first. */
export function digitalMarketingOpenItems() {
  const rank = { p0: 0, p1: 1, p2: 2 } as const;
  return DIGITAL_MARKETING_REVIEW_CHECKLIST.filter(
    (row) => row.status === "unresolved" || row.status === "partial",
  ).slice().sort((a, b) => rank[a.priority] - rank[b.priority]);
}
