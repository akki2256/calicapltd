import type { ContactPayload } from "@/lib/contact-form-validation";
import { calicapDiscoveryQuestions } from "@/lib/calicap-discovery";

export type SendContactEmailResult =
  | { ok: true; delivered: boolean }
  | { ok: false; error: string };

function formatDiscovery(payload: ContactPayload): string[] {
  if (payload.mode !== "unsure" || Object.keys(payload.discovery).length === 0) {
    return [];
  }
  const lines = ["", "— Discovery answers —"];
  for (const q of calicapDiscoveryQuestions) {
    const answer = payload.discovery[q.id];
    if (!answer) continue;
    const optionLabel =
      q.options?.find((o) => o.value === answer)?.label ?? answer;
    lines.push(`${q.label}: ${optionLabel}`);
  }
  return lines;
}

/**
 * Sends enquiry via Resend when configured; otherwise logs for local/dev.
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

  const modeLabel =
    payload.mode === "unsure" ? "Not sure (discovery)" : "Knows what they need";

  const subject = `Calicon enquiry · ${modeLabel} · ${payload.name}`;
  const text = [
    `Mode: ${modeLabel}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || "—"}`,
    `Phone / WhatsApp: ${payload.phone || "—"}`,
    "",
    payload.message,
    ...formatDiscovery(payload),
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
        error:
          "Something went wrong while sending your message. Please try again.",
      };
    }

    return { ok: true, delivered: true };
  } catch (err) {
    console.error("[contact email error]", err);
    return {
      ok: false,
      error:
        "Something went wrong while sending your message. Please try again.",
    };
  }
}
