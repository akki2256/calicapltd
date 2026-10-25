import {
  calicapDiscoveryQuestions,
  type ContactMode,
} from "@/lib/calicap-discovery";
import {
  normalizePhoneForSubmit,
  validateOptionalPhoneE164,
} from "@/lib/phone-countries";

export type { ContactMode };

export type ContactFieldErrors = Partial<
  Record<
    | "name"
    | "email"
    | "company"
    | "phone"
    | "achieve"
    | "problem"
    | "built"
    | "message"
    | "discovery",
    string
  >
>;

export type ContactPayload = {
  mode: ContactMode;
  name: string;
  email: string;
  company: string;
  phone: string;
  achieve: string;
  problem: string;
  built: string;
  message: string;
  /** Structured discovery answers for unsure mode */
  discovery: Record<string, string>;
  source?: string;
  medium?: string;
  campaign?: string;
  landingPath?: string;
};

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string; fieldErrors: ContactFieldErrors };

export type ContactFieldKey = keyof ContactFieldErrors;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseMode(raw: string): ContactMode {
  return raw === "unsure" ? "unsure" : "know";
}

export function validateContactField(
  field: ContactFieldKey,
  value: string,
  mode: ContactMode = "know",
): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "name":
      return trimmed ? undefined : "Please enter your name.";
    case "email":
      if (!trimmed) return "Please enter your email address.";
      if (!EMAIL_RE.test(trimmed)) return "Please enter a valid email address.";
      return undefined;
    case "company":
      return trimmed ? undefined : "Please enter your company or business.";
    case "phone":
      return validateOptionalPhoneE164(trimmed);
    case "achieve":
      if (mode !== "know") return undefined;
      return trimmed ? undefined : "Please tell us what you're trying to achieve.";
    case "problem":
      return undefined;
    case "built":
      return undefined;
    case "message":
      return undefined;
    case "discovery":
      return undefined;
    default:
      return undefined;
  }
}

export function validateContactFields(
  values: Partial<Record<ContactFieldKey, string>>,
  mode: ContactMode,
  discovery: Record<string, string> = {},
): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {};

  const nameError = validateContactField("name", values.name ?? "");
  if (nameError) fieldErrors.name = nameError;

  const emailError = validateContactField("email", values.email ?? "");
  if (emailError) fieldErrors.email = emailError;

  const companyError = validateContactField("company", values.company ?? "");
  if (companyError) fieldErrors.company = companyError;

  const phoneError = validateContactField("phone", values.phone ?? "");
  if (phoneError) fieldErrors.phone = phoneError;

  if (mode === "know") {
    const achieveError = validateContactField("achieve", values.achieve ?? "", mode);
    if (achieveError) fieldErrors.achieve = achieveError;
  } else {
    const requiredDiscovery = calicapDiscoveryQuestions
      .filter((q) => q.required)
      .map((q) => q.id);
    const missing = requiredDiscovery.some((id) => !discovery[id]?.trim());
    if (missing) {
      fieldErrors.discovery = "Please complete the discovery questions.";
    }
  }

  return fieldErrors;
}

export function validateContactForm(
  formData: FormData,
): ContactValidationResult {
  const mode = parseMode(String(formData.get("mode") ?? "know"));
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const achieve = String(formData.get("achieve") ?? "").trim();
  const problem = String(formData.get("problem") ?? "").trim();
  const built = String(formData.get("built") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const landingPath = String(formData.get("landingPath") ?? "").trim().slice(0, 200);
  const source = String(formData.get("source") ?? "").trim().slice(0, 120);
  const medium = String(formData.get("medium") ?? "").trim().slice(0, 120);
  const campaign = String(formData.get("campaign") ?? "").trim().slice(0, 120);
  const discoveryRaw = String(formData.get("discovery") ?? "").trim();
  let discovery: Record<string, string> = {};
  if (discoveryRaw) {
    try {
      const parsed = JSON.parse(discoveryRaw) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        discovery = Object.fromEntries(
          Object.entries(parsed as Record<string, unknown>).map(([k, v]) => [
            k,
            String(v ?? "").trim(),
          ]),
        );
      }
    } catch {
      discovery = {};
    }
  }

  const fieldErrors = validateContactFields(
    { name, email, company, phone, achieve, problem, built, message },
    mode,
    discovery,
  );

  if (Object.keys(fieldErrors).length > 0) {
    const first =
      fieldErrors.name ||
      fieldErrors.email ||
      fieldErrors.company ||
      fieldErrors.phone ||
      fieldErrors.achieve ||
      fieldErrors.discovery ||
      "Please fill in the required fields so we can respond properly.";
    return {
      ok: false,
      error: first,
      fieldErrors,
    };
  }

  const composedMessage =
    mode === "know"
      ? [
          achieve ? `Trying to achieve: ${achieve}` : "",
          problem ? `Problem: ${problem}` : "",
          built ? `Build or improve: ${built}` : "",
          message ? `Note: ${message}` : "",
        ]
          .filter(Boolean)
          .join("\n\n")
      : message || "Came through the guided discovery path.";

  return {
    ok: true,
    data: {
      mode,
      name,
      email,
      company,
      phone: normalizePhoneForSubmit(phone),
      achieve,
      problem,
      built,
      message: composedMessage,
      discovery,
      source: source || undefined,
      medium: medium || undefined,
      campaign: campaign || undefined,
      landingPath: landingPath || undefined,
    },
  };
}
