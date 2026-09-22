"use server";

import { headers } from "next/headers";
import {
  validateContactForm,
  type ContactFieldErrors,
} from "@/lib/contact-form-validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/send-contact-email";

export type ContactState =
  | { ok?: undefined; error?: undefined; fieldErrors?: undefined }
  | { ok: true }
  | { error: string; fieldErrors?: ContactFieldErrors };

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_IP = 20;
const MAX_PER_EMAIL = 20;

function clientIp(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headerList.get("x-real-ip")?.trim() || "unknown";
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const headerList = await headers();
  const ip = clientIp(headerList);

  const ipLimit = checkRateLimit(`contact:ip:${ip}`, MAX_PER_IP, WINDOW_MS);
  if (!ipLimit.ok) {
    return {
      error:
        "Too many messages from this network. Please wait a bit and try again.",
    };
  }

  const validated = validateContactForm(formData);
  if (!validated.ok) {
    return { error: validated.error, fieldErrors: validated.fieldErrors };
  }

  const emailKey = validated.data.email.toLowerCase();
  const emailLimit = checkRateLimit(
    `contact:email:${emailKey}`,
    MAX_PER_EMAIL,
    WINDOW_MS,
  );
  if (!emailLimit.ok) {
    return {
      error:
        "Too many messages from this email. Please wait a bit and try again.",
    };
  }

  const sent = await sendContactEmail(validated.data);
  if (!sent.ok) {
    return { error: sent.error };
  }

  return { ok: true };
}
