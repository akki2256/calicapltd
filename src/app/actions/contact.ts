"use server";

export type ContactState =
  | { ok?: undefined; error?: undefined }
  | { ok: true }
  | { error: string };

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "Please fill in name, email, and how we can help." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const payload = {
    name,
    email,
    company: company || null,
    budget: budget || null,
    message,
    at: new Date().toISOString(),
  };

  // Swap for Resend, Slack webhook, etc. on Vercel — logs locally for development.
  console.info("[contact enquiry]", payload);

  return { ok: true };
}
