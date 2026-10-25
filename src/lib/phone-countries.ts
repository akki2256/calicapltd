import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  isSupportedCountry,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

/**
 * Used only when IP geolocation is missing or invalid (e.g. local `next dev`).
 * Calicon’s home market — never overrides a successful geo detection.
 */
export const FALLBACK_PHONE_COUNTRY: CountryCode = "IN";

/**
 * Normalize a raw ISO 3166-1 alpha-2 code into a libphonenumber-supported country.
 * Returns null for missing, placeholder, or unsupported values.
 */
export function normalizeCountryCode(
  raw: string | null | undefined,
): CountryCode | null {
  if (!raw) return null;
  const code = raw.trim().toUpperCase();
  if (code.length !== 2) return null;
  // Vercel sends XX when the country cannot be determined
  if (code === "XX" || code === "T1") return null;
  if (!isSupportedCountry(code)) return null;
  return code;
}

export type PhoneCountryOption = {
  code: CountryCode;
  name: string;
  callingCode: string;
  flag: string;
};

function countryFlagEmoji(code: string): string {
  const upper = code.toUpperCase();
  if (!/^[A-Z]{2}$/.test(upper)) return "🏳️";
  const base = 0x1f1e6;
  return String.fromCodePoint(
    base + (upper.charCodeAt(0) - 65),
    base + (upper.charCodeAt(1) - 65),
  );
}

let cachedOptions: PhoneCountryOption[] | null = null;

export function getPhoneCountryOptions(): PhoneCountryOption[] {
  if (cachedOptions) return cachedOptions;
  const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
  cachedOptions = getCountries()
    .map((code) => ({
      code,
      name: displayNames.of(code) ?? code,
      callingCode: getCountryCallingCode(code),
      flag: countryFlagEmoji(code),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
  return cachedOptions;
}

export function getPhoneCountryOption(
  code: CountryCode,
): PhoneCountryOption | undefined {
  return getPhoneCountryOptions().find((c) => c.code === code);
}

export function filterPhoneCountries(
  query: string,
  options: readonly PhoneCountryOption[],
): PhoneCountryOption[] {
  const q = query.trim().toLowerCase().replace(/^\+/, "");
  if (!q) return [...options];
  return options.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.callingCode.includes(q),
  );
}

/** Soft national formatting while typing — not a validity check. */
export function formatNationalAsYouType(
  raw: string,
  country: CountryCode,
): string {
  const typer = new AsYouType(country);
  return typer.input(raw);
}

/**
 * Build an E.164 number from national (or partial international) input.
 * Returns "" when empty; null when non-empty but invalid.
 */
export function toE164Phone(
  raw: string,
  country: CountryCode,
): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const parsed = parsePhoneNumberFromString(trimmed, country);
  if (parsed?.isValid()) return parsed.format("E.164");
  if (isValidPhoneNumber(trimmed)) {
    const intl = parsePhoneNumberFromString(trimmed);
    return intl?.format("E.164") ?? null;
  }
  return null;
}

export function validateOptionalPhoneE164(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (isValidPhoneNumber(trimmed)) return undefined;
  return "Please enter a valid phone number for the selected country.";
}

/** Normalize a validated phone to E.164 for storage/email; empty stays empty. */
export function normalizePhoneForSubmit(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const parsed = parsePhoneNumberFromString(trimmed);
  if (parsed?.isValid()) return parsed.format("E.164");
  return trimmed;
}
