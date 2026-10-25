"use client";

import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  User,
} from "lucide-react";
import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import type { CountryCode } from "libphonenumber-js";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { ContactPhoneInput } from "@/components/contact-phone-input";
import { track } from "@/lib/analytics";
import { readStoredAttribution } from "@/lib/attribution";
import {
  calicapDiscovery,
  calicapDiscoveryQuestions,
  parseContactMode,
  type ContactMode,
} from "@/lib/calicap-discovery";
import {
  validateContactField,
  validateContactFields,
  type ContactFieldErrors,
  type ContactFieldKey,
} from "@/lib/contact-form-validation";
import { FALLBACK_PHONE_COUNTRY } from "@/lib/phone-countries";

const initial: ContactState = {};

const fieldClassName =
  "mt-2 w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-4 py-3 text-sm text-[var(--color-text-strong)] outline-none shadow-inner shadow-[var(--color-card-shadow)] placeholder:text-[var(--color-text-muted)] transition focus:border-[var(--color-accent)]/50 focus:ring-2 focus:ring-[var(--color-accent)]/25";

const fieldErrorClassName =
  "mt-2 w-full rounded-xl border border-red-500/60 bg-[var(--color-surface-elevated)] px-4 py-3 text-sm text-[var(--color-text-strong)] outline-none shadow-inner shadow-[var(--color-card-shadow)] placeholder:text-[var(--color-text-muted)] transition focus:border-red-500 focus:ring-2 focus:ring-red-500/25";

type Props = {
  initialMode?: ContactMode;
  /** ISO country from server-side IP geolocation — sets dialing-code default only */
  initialCountry?: CountryCode;
  onSuccess?: () => void;
};

type FormValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  achieve: string;
  problem: string;
  built: string;
  message: string;
};

const emptyValues: FormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  achieve: "",
  problem: "",
  built: "",
  message: "",
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-500" role="alert">
      {message}
    </p>
  );
}

export function ContactForm({
  initialMode = "know",
  initialCountry = FALLBACK_PHONE_COUNTRY,
  onSuccess,
}: Props) {
  const searchParams = useSearchParams();
  const modeFromUrl = parseContactMode(searchParams.get("mode"));
  const [mode, setMode] = useState<ContactMode>(
    searchParams.has("mode") ? modeFromUrl : initialMode,
  );
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactFieldKey, boolean>>>(
    {},
  );
  const [attribution, setAttribution] = useState({
    source: "",
    medium: "",
    campaign: "",
    landingPath: "",
  });
  const startedRef = useRef(false);
  const submittedRef = useRef(false);
  const [state, formAction, pending] = useActionState(submitContact, initial);
  const copy = calicapDiscovery;
  const pill = "rounded-none";
  const card = "bg-transparent p-0 sm:p-0";

  useEffect(() => {
    const next = searchParams.has("mode") ? modeFromUrl : initialMode;
    setMode(next);
    setStep(0);
    setFieldErrors({});
    setTouched({});
  }, [modeFromUrl, searchParams, initialMode]);

  useEffect(() => {
    const stored = readStoredAttribution();
    setAttribution({
      source: stored.source ?? "",
      medium: stored.medium ?? "",
      campaign: stored.campaign ?? "",
      landingPath: stored.landingPath ?? "",
    });
  }, []);

  useEffect(() => {
    if (!("ok" in state && state.ok)) return;
    if (submittedRef.current) return;
    submittedRef.current = true;
    track("contact_form_submitted", {
      contact_path: mode,
      source: attribution.source || undefined,
      medium: attribution.medium || undefined,
      campaign: attribution.campaign || undefined,
    });
    onSuccess?.();
  }, [state, mode, attribution.source, attribution.medium, attribution.campaign, onSuccess]);

  useEffect(() => {
    if (!("error" in state && state.fieldErrors)) return;
    setFieldErrors(state.fieldErrors);
    setTouched((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(state.fieldErrors!) as ContactFieldKey[]) {
        next[key] = true;
      }
      return next;
    });
  }, [state]);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("contact_form_started", { contact_path: mode });
  };

  const setFieldValue = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateContactField(field, value, mode);
      setFieldErrors((prev) => {
        const next = { ...prev };
        if (error) next[field] = error;
        else delete next[field];
        return next;
      });
    }
  };

  const blurField = (field: ContactFieldKey) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = field === "discovery" ? "" : (values[field as keyof FormValues] ?? "");
    const error = validateContactField(field, value, mode);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  };

  const blurPhone = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    const error = validateContactField("phone", values.phone, mode);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (error) next.phone = error;
      else delete next.phone;
      return next;
    });
  };

  const questions = calicapDiscoveryQuestions;
  const totalSteps = questions.length;
  const onDiscoverySteps = mode === "unsure" && step < totalSteps;
  const currentQuestion = questions[step];

  const discoveryJson = useMemo(() => JSON.stringify(answers), [answers]);
  const submitted = "ok" in state && state.ok;

  const canAdvanceDiscovery = () => {
    if (!currentQuestion) return false;
    if (!currentQuestion.required) return true;
    return Boolean(answers[currentQuestion.id]?.trim());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const errors = validateContactFields(values, mode, answers);
    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      setFieldErrors(errors);
      setTouched({
        name: true,
        email: true,
        company: true,
        phone: true,
        achieve: true,
      });
      const firstInvalid = (
        ["name", "email", "company", "phone", "achieve"] as const
      ).find((key) => errors[key]);
      if (firstInvalid) {
        document.getElementById(firstInvalid)?.focus();
      }
    }
  };

  const inputClass = (field: ContactFieldKey) =>
    fieldErrors[field] ? fieldErrorClassName : fieldClassName;

  const formError =
    "error" in state && state.error && !state.fieldErrors ? state.error : null;

  return (
    <div className={`${card} space-y-6`}>
      {/* <p className="font-[family-name:var(--font-display)] text-xl text-[var(--color-text-strong)]">
        {mode === "know" ? copy.knowCtaLabel : copy.unsureCtaLabel}
      </p> */}

      {onDiscoverySteps && currentQuestion ? (
        <div className="space-y-5">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
            Question {step + 1} of {totalSteps}
          </p>
          <label className="block text-sm font-medium text-[var(--color-text-strong)]">
            {currentQuestion.label}
          </label>
          {currentQuestion.type === "select" ? (
            <select
              className={fieldClassName}
              value={answers[currentQuestion.id] ?? ""}
              onFocus={markStarted}
              onChange={(e) =>
                setAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.id]: e.target.value,
                }))
              }
            >
              <option value="">Select an option</option>
              {currentQuestion.options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : currentQuestion.type === "textarea" ? (
            <textarea
              rows={4}
              className={`${fieldClassName} resize-y`}
              placeholder={currentQuestion.placeholder}
              value={answers[currentQuestion.id] ?? ""}
              onFocus={markStarted}
              onChange={(e) =>
                setAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.id]: e.target.value,
                }))
              }
            />
          ) : (
            <input
              className={fieldClassName}
              placeholder={currentQuestion.placeholder}
              value={answers[currentQuestion.id] ?? ""}
              onFocus={markStarted}
              onChange={(e) =>
                setAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.id]: e.target.value,
                }))
              }
            />
          )}
          <div className="flex flex-wrap gap-3">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className={`inline-flex min-h-11 items-center gap-1.5 ${pill} border border-[var(--color-border-subtle)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-muted)] transition hover:text-[var(--color-text-strong)]`}
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
                Back
              </button>
            ) : null}
            <button
              type="button"
              disabled={!canAdvanceDiscovery()}
              onClick={() => setStep((s) => s + 1)}
              className={`inline-flex min-h-11 items-center gap-1.5 ${pill} bg-[var(--color-btn-primary-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--color-btn-primary-text)] transition hover:bg-[var(--color-btn-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60`}
            >
              Continue
              <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>
      ) : (
        <form action={formAction} noValidate onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="mode" value={mode} />
          <input type="hidden" name="discovery" value={discoveryJson} />
          <input type="hidden" name="source" value={attribution.source} />
          <input type="hidden" name="medium" value={attribution.medium} />
          <input type="hidden" name="campaign" value={attribution.campaign} />
          <input type="hidden" name="landingPath" value={attribution.landingPath} />

          {mode === "unsure" ? (
            <button
              type="button"
              onClick={() => setStep(Math.max(0, totalSteps - 1))}
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-700"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
              Back to questions
            </button>
          ) : null}

          {fieldErrors.discovery ? (
            <p className="text-sm text-red-500" role="alert">
              {fieldErrors.discovery}
            </p>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]"
              >
                <User className="h-3.5 w-3.5 text-[var(--color-accent)]" strokeWidth={2} aria-hidden />
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                value={values.name}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
                className={inputClass("name")}
                onFocus={markStarted}
                onChange={(e) => setFieldValue("name", e.target.value)}
                onBlur={() => blurField("name")}
              />
              <FieldError id="name-error" message={fieldErrors.name} />
            </div>
            <div>
              <label
                htmlFor="email"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]"
              >
                <Mail className="h-3.5 w-3.5 text-[var(--color-accent)]" strokeWidth={2} aria-hidden />
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={values.email}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                className={inputClass("email")}
                onChange={(e) => setFieldValue("email", e.target.value)}
                onBlur={() => blurField("email")}
              />
              <FieldError id="email-error" message={fieldErrors.email} />
            </div>
            <div>
              <label
                htmlFor="company"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]"
              >
                <Building2 className="h-3.5 w-3.5 text-[var(--color-accent)]" strokeWidth={2} aria-hidden />
                Company / business
              </label>
              <input
                id="company"
                name="company"
                required
                autoComplete="organization"
                value={values.company}
                aria-invalid={Boolean(fieldErrors.company)}
                aria-describedby={fieldErrors.company ? "company-error" : undefined}
                className={inputClass("company")}
                onChange={(e) => setFieldValue("company", e.target.value)}
                onBlur={() => blurField("company")}
              />
              <FieldError id="company-error" message={fieldErrors.company} />
            </div>
            <div className="relative z-[1] sm:col-span-2">
              <label
                htmlFor="phone"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]"
              >
                <Phone className="h-3.5 w-3.5 text-[var(--color-accent)]" strokeWidth={2} aria-hidden />
                Phone / WhatsApp (optional)
              </label>
              <ContactPhoneInput
                id="phone"
                name="phone"
                initialCountry={initialCountry}
                value={values.phone}
                invalid={Boolean(fieldErrors.phone)}
                describedBy={fieldErrors.phone ? "phone-error" : undefined}
                onFocus={markStarted}
                onChange={(e164) => setFieldValue("phone", e164)}
                onBlur={blurPhone}
              />
              <FieldError id="phone-error" message={fieldErrors.phone} />
            </div>

            {mode === "know" ? (
              <>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="achieve"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]"
                  >
                    <MessageSquareText
                      className="h-3.5 w-3.5 text-[var(--color-accent)]"
                      strokeWidth={2}
                      aria-hidden
                    />
                    What are you trying to achieve?
                  </label>
                  <textarea
                    id="achieve"
                    name="achieve"
                    required
                    rows={3}
                    value={values.achieve}
                    aria-invalid={Boolean(fieldErrors.achieve)}
                    aria-describedby={fieldErrors.achieve ? "achieve-error" : undefined}
                    className={`${inputClass("achieve")} resize-y`}
                    placeholder="The outcome that would make this worthwhile…"
                    onChange={(e) => setFieldValue("achieve", e.target.value)}
                    onBlur={() => blurField("achieve")}
                  />
                  <FieldError id="achieve-error" message={fieldErrors.achieve} />
                </div>
                {/* <div className="sm:col-span-2">
                  <label
                    htmlFor="problem"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]"
                  >
                    What problem are you facing?
                  </label>
                  <textarea
                    id="problem"
                    name="problem"
                    required
                    rows={3}
                    value={values.problem}
                    aria-invalid={Boolean(fieldErrors.problem)}
                    aria-describedby={fieldErrors.problem ? "problem-error" : undefined}
                    className={`${inputClass("problem")} resize-y`}
                    placeholder="What's not working, or what's missing today?"
                    onChange={(e) => setFieldValue("problem", e.target.value)}
                    onBlur={() => blurField("problem")}
                  />
                  <FieldError id="problem-error" message={fieldErrors.problem} />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="built"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]"
                  >
                    What do you need built or improved?
                  </label>
                  <textarea
                    id="built"
                    name="built"
                    required
                    rows={3}
                    value={values.built}
                    aria-invalid={Boolean(fieldErrors.built)}
                    aria-describedby={fieldErrors.built ? "built-error" : undefined}
                    className={`${inputClass("built")} resize-y`}
                    placeholder="A product, system, site, workflow, or something else…"
                    onChange={(e) => setFieldValue("built", e.target.value)}
                    onBlur={() => blurField("built")}
                  />
                  <FieldError id="built-error" message={fieldErrors.built} />
                </div> */}
              </>
            ) : (
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]"
                >
                  <MessageSquareText
                    className="h-3.5 w-3.5 text-[var(--color-accent)]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  Anything to add? (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={values.message}
                  className={`${fieldClassName} resize-y`}
                  placeholder="Optional note — your previous answers are already included."
                  onChange={(e) => setFieldValue("message", e.target.value)}
                />
              </div>
            )}
          </div>

          {formError ? (
            <p className="text-sm text-red-500" role="alert">
              {formError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending || submitted}
            className={`inline-flex min-h-11 w-full items-center justify-center gap-2 ${pill} bg-[var(--color-btn-primary-bg)] py-3 text-sm font-semibold text-[var(--color-btn-primary-text)] transition hover:bg-[var(--color-btn-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10`}
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
                Sending…
              </>
            ) : submitted ? (
              <>
                <Send className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                Sent
              </>
            ) : (
              <>
                <Send className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                {copy.submitLabel}
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
