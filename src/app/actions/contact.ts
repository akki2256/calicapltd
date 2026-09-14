"use server";

import { validateContactForm, type ContactFieldErrors } from "@/lib/contact-form-validation";
import { sendContactEmail } from "@/lib/send-contact-email";

export type ContactState =
  | { ok?: undefined; error?: undefined; fieldErrors?: undefined }
  | { ok: true }
  | { error: string; fieldErrors?: ContactFieldErrors };

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const validated = validateContactForm(formData);
  if (!validated.ok) {
    return { error: validated.error, fieldErrors: validated.fieldErrors };
  }

  const sent = await sendContactEmail(validated.data);
  if (!sent.ok) {
    return { error: sent.error };
  }

  return { ok: true };
}
