/**
 * Lightweight, privacy-conscious measurement.
 *
 * Purpose: understand what leads to qualified inquiries — not traffic vanity.
 * Hierarchy: business value → qualified inquiries → conversion quality →
 * relevant behavior → traffic.
 *
 * Provider-specific code stays here. UI calls `track(...)`.
 * No-ops unless a measurement ID or endpoint is configured.
 * Never loads third-party tags without an explicit env value.
 * Never send names, emails, phones, form text, or query strings.
 */
import { PILLAR_IDS, SERVICES, type PillarId } from "@/lib/brand-architecture";

export const ANALYTICS_EVENTS = [
  "page_viewed",
  "contact_cta_clicked",
  "contact_path_selected",
  "contact_form_started",
  "contact_form_submitted",
  "service_cta_clicked",
  "work_item_viewed",
  "case_study_cta_clicked",
  "outbound_clicked",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export const PAGE_TYPES = [
  "home",
  "about",
  "contact",
  "work",
  "case_study",
  "pillar",
  "service",
  "content",
  "legal",
  "other",
] as const;

export type PageType = (typeof PAGE_TYPES)[number];

export type AnalyticsProps = {
  page_type?: PageType;
  page_path?: string;
  cta_location?: string;
  pillar?: string;
  service?: string;
  outcome?: string;
  content_type?: string;
  case_study?: string;
  contact_path?: "know" | "unsure";
  source?: string;
  medium?: string;
  campaign?: string;
  outbound_type?: "email" | "phone" | "whatsapp";
};

const ALLOWED_PROP_KEYS = new Set<keyof AnalyticsProps>([
  "page_type",
  "page_path",
  "cta_location",
  "pillar",
  "service",
  "outcome",
  "content_type",
  "case_study",
  "contact_path",
  "source",
  "medium",
  "campaign",
  "outbound_type",
]);

/** Future internal dashboard grouping — not a public UI */
export const MEASUREMENT_AREAS = {
  acquisition: ["source", "medium", "campaign"],
  engagement: ["page_viewed", "work_item_viewed"],
  conversion: [
    "contact_cta_clicked",
    "contact_path_selected",
    "contact_form_started",
    "contact_form_submitted",
  ],
  commercial: ["service_cta_clicked", "case_study_cta_clicked", "outbound_clicked"],
} as const;

const GA_ID_PATTERN = /^G-[A-Z0-9]+$/i;
const EMAIL_PATTERN = /\S+@\S+\.\S+/;
const PHONE_PATTERN = /^\+?[\d\s().-]{8,}$/;
const QUEUE_LIMIT = 20;

type QueuedEvent = {
  event: AnalyticsEvent;
  props: Record<string, string | number | boolean>;
};

const eventQueue: QueuedEvent[] = [];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function measurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!id || !GA_ID_PATTERN.test(id)) return undefined;
  return id;
}

function endpoint(): string | undefined {
  const url = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT?.trim();
  return url || undefined;
}

function prefersNoTracking(): boolean {
  if (typeof navigator === "undefined") return false;
  return navigator.doNotTrack === "1";
}

function analyticsEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (prefersNoTracking()) return false;
  return Boolean(measurementId() || endpoint());
}

export function isAnalyticsConfigured(): boolean {
  return Boolean(measurementId() || endpoint());
}

export function getGaMeasurementId(): string | undefined {
  return measurementId();
}

export function safePagePath(pathname?: string): string {
  const raw = (pathname ?? (typeof window === "undefined" ? "/" : window.location.pathname))
    .split("?")[0]
    .split("#")[0];
  if (!raw.startsWith("/")) return "/";
  return raw.slice(0, 200);
}

export function pageContextFromPath(pathname: string): AnalyticsProps {
  const page_path = safePagePath(pathname);

  if (page_path === "/") return { page_type: "home", page_path };
  if (page_path === "/about") return { page_type: "about", page_path };
  if (page_path === "/contact") return { page_type: "contact", page_path };
  if (page_path === "/work") return { page_type: "work", page_path };
  if (page_path === "/privacy") return { page_type: "legal", page_path };

  if (page_path.startsWith("/work/")) {
    const case_study = page_path.slice("/work/".length).split("/")[0];
    return { page_type: "case_study", page_path, case_study };
  }

  const pillarMatch = PILLAR_IDS.find((id) => page_path === `/${id}`);
  if (pillarMatch) {
    return { page_type: "pillar", page_path, pillar: pillarMatch };
  }

  if (page_path.startsWith("/services/")) {
    const service = page_path.slice("/services/".length).split("/")[0];
    const record = SERVICES.find((item) => item.hrefs?.includes(page_path));
    const pillar: PillarId | undefined = record?.pillar;
    return {
      page_type: "service",
      page_path,
      service,
      ...(pillar ? { pillar } : {}),
    };
  }

  return { page_type: "other", page_path };
}

function looksLikePii(value: string): boolean {
  if (EMAIL_PATTERN.test(value)) return true;
  if (PHONE_PATTERN.test(value.trim())) return true;
  return false;
}

export function sanitizeProps(
  props: AnalyticsProps,
): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const key of ALLOWED_PROP_KEYS) {
    const value = props[key];
    if (value === undefined || value === "") continue;
    if (typeof value === "string") {
      const trimmed = value.slice(0, 120);
      if (looksLikePii(trimmed)) continue;
      if (key === "page_path" || key === "cta_location") {
        out[key] = safePagePath(trimmed);
        continue;
      }
      out[key] = trimmed;
      continue;
    }
    out[key] = value;
  }
  return out;
}

function currentCtaLocation(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return safePagePath(window.location.pathname);
}

export function classifyCtaHref(href: string): {
  event: AnalyticsEvent;
  props: AnalyticsProps;
} | null {
  const path = safePagePath(href.split("?")[0]);
  if (path === "/contact") {
    return { event: "contact_cta_clicked", props: {} };
  }
  if (path.startsWith("/work/") && path !== "/work") {
    const case_study = path.slice("/work/".length).split("/")[0];
    return { event: "case_study_cta_clicked", props: { case_study } };
  }
  const context = pageContextFromPath(path);
  if (context.page_type === "pillar" || context.page_type === "service") {
    return {
      event: "service_cta_clicked",
      props: {
        ...(context.pillar ? { pillar: context.pillar } : {}),
        ...(context.service ? { service: context.service } : {}),
      },
    };
  }
  return null;
}

export function outboundTypeFromHref(
  href: string,
): AnalyticsProps["outbound_type"] | undefined {
  const value = href.trim().toLowerCase();
  if (value.startsWith("mailto:")) return "email";
  if (value.startsWith("tel:")) return "phone";
  if (value.includes("wa.me") || value.includes("whatsapp.com") || value.startsWith("whatsapp:")) {
    return "whatsapp";
  }
  return undefined;
}

function sendToGtag(
  event: AnalyticsEvent,
  props: Record<string, string | number | boolean>,
) {
  if (typeof window.gtag !== "function") {
    if (measurementId() && eventQueue.length < QUEUE_LIMIT) {
      eventQueue.push({ event, props });
    }
    return;
  }
  if (event === "page_viewed") {
    const pagePath = typeof props.page_path === "string" ? props.page_path : safePagePath();
    window.gtag("event", "page_view", {
      ...props,
      page_path: pagePath,
      page_location: `${window.location.origin}${pagePath}`,
    });
    return;
  }
  window.gtag("event", event, props);
}

function sendToEndpoint(
  event: AnalyticsEvent,
  props: Record<string, string | number | boolean>,
) {
  const dest = endpoint();
  if (!dest) return;
  try {
    const body = JSON.stringify({ event, ...props });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(dest, body);
    } else {
      void fetch(dest, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  } catch {
    /* ignore transport errors */
  }
}

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (!analyticsEnabled()) return;
  const safe = sanitizeProps({
    ...props,
    page_path: props.page_path ?? safePagePath(),
  });
  sendToGtag(event, safe);
  sendToEndpoint(event, safe);
}

let lastViewedPath: string | undefined;

export function trackPageView(pathname: string): void {
  const context = pageContextFromPath(pathname);
  if (context.page_path && context.page_path === lastViewedPath) return;
  lastViewedPath = context.page_path;
  track("page_viewed", context);
}

export function trackCta(href: string): void {
  const classified = classifyCtaHref(href);
  if (!classified) return;
  track(classified.event, {
    ...classified.props,
    cta_location: currentCtaLocation(),
  });
}

export function initGtag(gaId: string): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // GA's snippet uses the Arguments object; a rest array is not equivalent.
    // eslint-disable-next-line prefer-rest-params -- gtag protocol
    window.dataLayer?.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", gaId, {
    anonymize_ip: true,
    send_page_view: false,
  });
  flushAnalyticsQueue();
}

export function flushAnalyticsQueue(): void {
  if (typeof window.gtag !== "function") return;
  while (eventQueue.length > 0) {
    const item = eventQueue.shift();
    if (!item) break;
    sendToGtag(item.event, item.props);
  }
}
