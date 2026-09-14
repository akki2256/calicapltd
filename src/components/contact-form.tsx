"use client";

import {
  Building2,
  CheckCircle2,
  Coins,
  Loader2,
  Mail,
  MessageSquareText,
  Send,
  User,
} from "lucide-react";
import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { calicapContact } from "@/lib/calicap-contact";

const initial: ContactState = {};

const fieldClassName =
  "mt-2 w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-4 py-3 text-sm text-[var(--color-text-strong)] outline-none shadow-inner shadow-[var(--color-card-shadow)] placeholder:text-[var(--color-text-muted)] transition focus:border-[var(--color-accent)]/50 focus:ring-2 focus:ring-[var(--color-accent)]/25";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);
  const success = calicapContact.formSuccess;

  if ("ok" in state && state.ok) {
    return (
      <div className="surface-card rounded-2xl p-8 md:p-10">
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

  return (
    <form
      action={formAction}
      className="surface-card space-y-5 rounded-2xl p-8 md:p-10"
    >
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
            Email
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
            Company (optional)
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={fieldClassName}
            placeholder="Northwind"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="budget"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]"
          >
            <Coins className="h-3.5 w-3.5 text-[var(--color-accent)]" strokeWidth={2} aria-hidden />
            Rough budget (optional)
          </label>
          <select
            id="budget"
            name="budget"
            className={fieldClassName}
          >
            <option value="">Select a range</option>
            <option value="under-15k">Under 15k</option>
            <option value="15k-35k">15k – 35k</option>
            <option value="35k-75k">35k – 75k</option>
            <option value="75k-plus">75k+</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]"
          >
            <MessageSquareText className="h-3.5 w-3.5 text-[var(--color-accent)]" strokeWidth={2} aria-hidden />
            Project & goals
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={`${fieldClassName} resize-y`}
            placeholder="What are you launching, what does success look like in 90 days, and what is the timeline?"
          />
        </div>
      </div>

      {"error" in state && state.error ? (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-btn-primary-bg)] py-3 text-sm font-semibold text-[var(--color-btn-primary-text)] transition hover:bg-[var(--color-btn-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            Send enquiry
          </>
        )}
      </button>
    </form>
  );
}
