export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "company" | "budget" | "message", string>
>;

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
};

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string; fieldErrors: ContactFieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  formData: FormData,
): ContactValidationResult {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: ContactFieldErrors = {};

  if (!name) fieldErrors.name = "Name is required.";
  if (!email) fieldErrors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "Please enter a valid email address.";
  if (!message) fieldErrors.message = "Please tell us about your project.";

  if (Object.keys(fieldErrors).length > 0) {
    const error =
      fieldErrors.email && !email
        ? "Please fill in name, email, and how we can help."
        : fieldErrors.email && email && !EMAIL_RE.test(email)
          ? "Please enter a valid email address."
          : "Please fill in name, email, and how we can help.";

    return { ok: false, error, fieldErrors };
  }

  return {
    ok: true,
    data: { name, email, company, budget, message },
  };
}
