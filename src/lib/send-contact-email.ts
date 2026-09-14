import type { ContactPayload } from "@/lib/contact-form-validation";

export type SendContactEmailResult =
  | { ok: true; delivered: boolean }
  | { ok: false; error: string };

/**
 * Sends enquiry via Resend when configured; otherwise logs for local/dev.
 * No new dependency — uses the Resend HTTP API directly.
 */
export async function sendContactEmail(
  payload: ContactPayload,
): Promise<SendContactEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_INBOX_EMAIL;

  const stamped = {
    ...payload,
    at: new Date().toISOString(),
  };

  if (!apiKey || !from || !to) {
    console.info("[contact enquiry]", stamped);
    return { ok: true, delivered: false };
  }

  const subject = `Calicon enquiry from ${payload.name}`;
  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || "—"}`,
    `Budget: ${payload.budget || "—"}`,
    "",
    payload.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact email failed]", res.status, detail);
      return {
        ok: false,
        error: "We could not send your message right now. Please try again shortly.",
      };
    }

    return { ok: true, delivered: true };
  } catch (err) {
    console.error("[contact email error]", err);
    return {
      ok: false,
      error: "We could not send your message right now. Please try again shortly.",
    };
  }
}
