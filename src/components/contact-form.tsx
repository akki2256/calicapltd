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

const initial: ContactState = {};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);

  if ("ok" in state && state.ok) {
    return (
      <div className="surface-card rounded-2xl p-8 md:p-10">
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="h-8 w-8 shrink-0 text-gold-600"
            strokeWidth={2}
            aria-hidden
          />
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl text-slate-900">
              Thanks — we have your note.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              You will hear back shortly. If your project is urgent, reply to the
              confirmation email once connected.
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
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600"
          >
            <User className="h-3.5 w-3.5 text-gold-600" strokeWidth={2} aria-hidden />
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-[var(--color-border-subtle)] bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-gold-500/0 transition placeholder:text-slate-400 shadow-inner shadow-slate-200/50 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-400/25"
            placeholder="Alex Morgan"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600"
          >
            <Mail className="h-3.5 w-3.5 text-gold-600" strokeWidth={2} aria-hidden />
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-[var(--color-border-subtle)] bg-white px-4 py-3 text-sm text-slate-900 outline-none shadow-inner shadow-slate-200/50 placeholder:text-slate-400 transition focus:border-gold-500/50 focus:ring-2 focus:ring-gold-400/25"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600"
          >
            <Building2 className="h-3.5 w-3.5 text-gold-600" strokeWidth={2} aria-hidden />
            Company (optional)
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className="mt-2 w-full rounded-xl border border-[var(--color-border-subtle)] bg-white px-4 py-3 text-sm text-slate-900 outline-none shadow-inner shadow-slate-200/50 placeholder:text-slate-400 transition focus:border-gold-500/50 focus:ring-2 focus:ring-gold-400/25"
            placeholder="Northwind"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="budget"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600"
          >
            <Coins className="h-3.5 w-3.5 text-gold-600" strokeWidth={2} aria-hidden />
            Rough budget (optional)
          </label>
          <select
            id="budget"
            name="budget"
            className="mt-2 w-full rounded-xl border border-[var(--color-border-subtle)] bg-white px-4 py-3 text-sm text-slate-900 outline-none shadow-inner shadow-slate-200/50 transition focus:border-gold-500/50 focus:ring-2 focus:ring-gold-400/25"
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
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600"
          >
            <MessageSquareText className="h-3.5 w-3.5 text-gold-600" strokeWidth={2} aria-hidden />
            Project & goals
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-2 w-full resize-y rounded-xl border border-[var(--color-border-subtle)] bg-white px-4 py-3 text-sm text-slate-900 outline-none shadow-inner shadow-slate-200/50 placeholder:text-slate-400 transition focus:border-gold-500/50 focus:ring-2 focus:ring-gold-400/25"
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
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
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
