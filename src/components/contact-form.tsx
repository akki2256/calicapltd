"use client";

import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useActionState, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { useTheme } from "@/components/theme-provider";
import { calicapContact } from "@/lib/calicap-contact";
import {
  calicapDiscovery,
  calicapDiscoveryQuestions,
  parseContactMode,
  type ContactMode,
} from "@/lib/calicap-discovery";

const initial: ContactState = {};

const fieldClassName =
  "mt-2 w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-4 py-3 text-sm text-[var(--color-text-strong)] outline-none shadow-inner shadow-[var(--color-card-shadow)] placeholder:text-[var(--color-text-muted)] transition focus:border-[var(--color-accent)]/50 focus:ring-2 focus:ring-[var(--color-accent)]/25";

type Props = {
  initialMode?: ContactMode;
};

export function ContactForm({ initialMode = "know" }: Props) {
  const { theme } = useTheme();
  const isCanvas = theme === "canvas";
  const searchParams = useSearchParams();
  const modeFromUrl = parseContactMode(searchParams.get("mode"));
  const [mode, setMode] = useState<ContactMode>(
    searchParams.has("mode") ? modeFromUrl : initialMode,
  );
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [state, formAction, pending] = useActionState(submitContact, initial);
  const success = calicapContact.formSuccess;
  const copy = calicapDiscovery;
  const pill = isCanvas ? "rounded-none" : "rounded-full";
  const card = isCanvas
    ? "border border-[var(--color-border-subtle)] bg-transparent p-0 sm:p-0"
    : "surface-card rounded-2xl p-8 md:p-10";

  useEffect(() => {
    if (searchParams.has("mode")) {
      setMode(modeFromUrl);
      setStep(0);
    }
  }, [modeFromUrl, searchParams]);

  const questions = calicapDiscoveryQuestions;
  const totalSteps = questions.length;
  const onDiscoverySteps = mode === "unsure" && step < totalSteps;
  const currentQuestion = questions[step];

  const discoveryJson = useMemo(() => JSON.stringify(answers), [answers]);

  if ("ok" in state && state.ok) {
    return (
      <div className={card}>
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="h-8 w-8 shrink-0 text-[var(--color-accent)]"
            strokeWidth={2}
            aria-hidden
          />
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl text-[var(--color-text-strong)]">
              {success.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {success.body}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const switchMode = (next: ContactMode) => {
    setMode(next);
    setStep(0);
  };

  const canAdvanceDiscovery = () => {
    if (!currentQuestion) return false;
    if (!currentQuestion.required) return true;
    return Boolean(answers[currentQuestion.id]?.trim());
  };

  return (
    <div className={`${card} space-y-6`}>
      {!isCanvas ? (
        <>
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl text-[var(--color-text-strong)]">
              {copy.formIntroTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {copy.formIntroBody}
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Contact path">
            <Link
              href="/contact?mode=know"
              scroll={false}
              onClick={() => switchMode("know")}
              className={`${pill} px-4 py-2 text-sm font-semibold transition ${
                mode === "know"
                  ? "bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)]"
                  : "border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-strong)]"
              }`}
            >
              {copy.modeKnowLabel}
            </Link>
            <Link
              href="/contact?mode=unsure"
              scroll={false}
              onClick={() => switchMode("unsure")}
              className={`${pill} px-4 py-2 text-sm font-semibold transition ${
                mode === "unsure"
                  ? "bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)]"
                  : "border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-strong)]"
              }`}
            >
              {copy.modeUnsureLabel}
            </Link>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--color-text-strong)]">
              {mode === "know" ? copy.knowCtaLabel : copy.unsureCtaLabel}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {mode === "know" ? copy.knowIntro : copy.unsureIntro}
            </p>
          </div>
        </>
      ) : (
        <div>
          <p className="canvas-micro text-[var(--color-accent)]">
            {mode === "know" ? "01 · Clear brief" : "02 · Guided path"}
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-xl text-[var(--color-text-strong)]">
            {mode === "know" ? copy.knowCtaLabel : copy.unsureCtaLabel}
          </p>
        </div>
      )}

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
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="mode" value={mode} />
          <input type="hidden" name="discovery" value={discoveryJson} />

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
                className={fieldClassName}
                placeholder="Alex Morgan"
              />
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
                className={fieldClassName}
              />
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
                className={fieldClassName}
                placeholder="Northwind"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]"
              >
                <Phone className="h-3.5 w-3.5 text-[var(--color-accent)]" strokeWidth={2} aria-hidden />
                Phone / WhatsApp (optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={fieldClassName}
                placeholder="+91 …"
              />
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
                    className={`${fieldClassName} resize-y`}
                    placeholder="The outcome that would make this worthwhile…"
                  />
                </div>
                <div className="sm:col-span-2">
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
                    className={`${fieldClassName} resize-y`}
                    placeholder="What's not working, or what's missing today?"
                  />
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
                    className={`${fieldClassName} resize-y`}
                    placeholder="A product, system, site, workflow, or something else…"
                  />
                </div>
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
                  className={`${fieldClassName} resize-y`}
                  placeholder="Optional note — your discovery answers are already included."
                  defaultValue=""
                />
              </div>
            )}
          </div>

          {"error" in state && state.error ? (
            <p className="text-sm text-red-600" role="alert">
              {state.error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className={`inline-flex min-h-11 w-full items-center justify-center gap-2 ${pill} bg-[var(--color-btn-primary-bg)] py-3 text-sm font-semibold text-[var(--color-btn-primary-text)] transition hover:bg-[var(--color-btn-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10`}
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
                Sending…
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
