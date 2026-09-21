/**
 * Campaign / UTM attribution for enquiry nurturing.
 * Captured quietly from the URL — no extra form fields for the visitor.
 */
const STORAGE_KEY = "calicon-lead-attribution";

export type LeadAttribution = {
  source?: string;
  medium?: string;
  campaign?: string;
  landingPath?: string;
};

function first(params: URLSearchParams, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = params.get(key)?.trim();
    if (value) return value.slice(0, 120);
  }
  return undefined;
}

export function parseAttribution(
  params: URLSearchParams,
  landingPath?: string,
): LeadAttribution {
  return {
    source: first(params, ["utm_source", "src", "source"]),
    medium: first(params, ["utm_medium", "medium"]),
    campaign: first(params, ["utm_campaign", "campaign"]),
    landingPath: landingPath?.slice(0, 200),
  };
}

export function attributionHasValue(attr: LeadAttribution): boolean {
  return Boolean(attr.source || attr.medium || attr.campaign);
}

export function persistAttribution(attr: LeadAttribution): void {
  if (typeof window === "undefined") return;
  if (!attributionHasValue(attr) && !attr.landingPath) return;
  try {
    const previous = readStoredAttribution();
    const merged: LeadAttribution = {
      source: attr.source || previous.source,
      medium: attr.medium || previous.medium,
      campaign: attr.campaign || previous.campaign,
      landingPath: previous.landingPath || attr.landingPath,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* private mode */
  }
}

export function readStoredAttribution(): LeadAttribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as LeadAttribution;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function captureAttributionFromWindow(): LeadAttribution {
  if (typeof window === "undefined") return {};
  const attr = parseAttribution(
    new URLSearchParams(window.location.search),
    window.location.pathname,
  );
  persistAttribution(attr);
  return readStoredAttribution();
}
