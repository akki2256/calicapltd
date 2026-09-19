export type ContactMode = "know" | "unsure";

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
};

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string; fieldErrors: ContactFieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseMode(raw: string): ContactMode {
  return raw === "unsure" ? "unsure" : "know";
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

  const fieldErrors: ContactFieldErrors = {};

  if (!name) fieldErrors.name = "Please enter your name.";
  if (!email) fieldErrors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email))
    fieldErrors.email = "Please enter a valid email address.";

  if (mode === "know") {
    if (!company) fieldErrors.company = "Please enter your company or business.";
    if (!achieve) fieldErrors.achieve = "Please tell us what you're trying to achieve.";
    if (!problem) fieldErrors.problem = "Please tell us what problem you're facing.";
    if (!built) fieldErrors.built = "Please tell us what you need built or improved.";
  } else {
    const requiredDiscovery = [
      "business",
      "problem",
      "improve",
      "outcome",
      "existing",
    ];
    const missing = requiredDiscovery.some((id) => !discovery[id]?.trim());
    if (missing) {
      fieldErrors.discovery = "Please complete the discovery questions.";
    }
    if (!company) fieldErrors.company = "Please enter your company or business.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    const first =
      fieldErrors.name ||
      fieldErrors.email ||
      fieldErrors.company ||
      fieldErrors.achieve ||
      fieldErrors.problem ||
      fieldErrors.built ||
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
          `Trying to achieve: ${achieve}`,
          `Problem: ${problem}`,
          `Build or improve: ${built}`,
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
      phone,
      achieve,
      problem,
      built,
      message: composedMessage,
      discovery,
    },
  };
}
