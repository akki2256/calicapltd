import { headers } from "next/headers";
import {
  FALLBACK_PHONE_COUNTRY,
  normalizeCountryCode,
} from "@/lib/phone-countries";
import type { CountryCode } from "libphonenumber-js";

export { FALLBACK_PHONE_COUNTRY } from "@/lib/phone-countries";

/** Prefer Vercel; accept common CDN equivalents when present. Never reads the IP. */
const COUNTRY_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "x-country-code",
] as const;

/**
 * Read the visitor’s likely country from request geolocation headers.
 * Passes only the ISO country code — never the IP — to callers.
 * Server-only: uses Next.js request headers.
 */
export async function getVisitorCountryCode(): Promise<CountryCode> {
  const headerList = await headers();
  for (const name of COUNTRY_HEADERS) {
    const detected = normalizeCountryCode(headerList.get(name));
    if (detected) return detected;
  }
  return FALLBACK_PHONE_COUNTRY;
}
