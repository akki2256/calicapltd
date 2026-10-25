"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CountryCode } from "libphonenumber-js";
import { X } from "lucide-react";
import { ContactFloatingIcons } from "@/components/contact-floating-icons";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/JsonLd";
import {
  CanvasReveal,
  CanvasStagger,
  CanvasStaggerItem,
  CanvasTextRevealInView,
} from "@/components/canvas/motion";
import { track } from "@/lib/analytics";
import { calicapContact } from "@/lib/calicap-contact";
import {
  calicapDiscovery,
  parseContactMode,
  type ContactMode,
} from "@/lib/calicap-discovery";
import { breadcrumbJsonLd } from "@/lib/structured-data";

type Props = {
  initialMode: ContactMode;
  initialCountry: CountryCode;
};

function ContactPathTabs({ activeMode }: { activeMode: ContactMode }) {
  const copy = calicapDiscovery;

  return (
    <CanvasStagger
      className="mt-14 grid items-stretch gap-0 overflow-hidden border border-[var(--color-border-subtle)] sm:grid-cols-2"
      stagger={0.12}
    >
      <CanvasStaggerItem tone="soft" className="h-full min-h-0">
        <Link
          href="/contact?mode=know"
          scroll={false}
          replace
          onClick={() => track("contact_path_selected", { contact_path: "know" })}
          aria-current={activeMode === "know" ? "page" : undefined}
          className={`group flex h-full flex-col px-7 py-5 transition sm:border-r sm:border-[var(--color-border-subtle)] ${
            activeMode === "know"
              ? "bg-[var(--color-surface-elevated)]"
              : "hover:bg-[var(--color-surface-muted)]"
          }`}
        >
          <p className="font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)] transition group-hover:translate-x-1 sm:text-2xl">
            {copy.knowTitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {copy.knowIntro}
          </p>
          <p className="mt-auto pt-5 text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)] opacity-0 transition group-hover:opacity-100">
            Continue →
          </p>
        </Link>
      </CanvasStaggerItem>
      <CanvasStaggerItem tone="soft" className="h-full min-h-0">
        <Link
          href="/contact?mode=unsure"
          scroll={false}
          replace
          onClick={() => track("contact_path_selected", { contact_path: "unsure" })}
          aria-current={activeMode === "unsure" ? "page" : undefined}
          className={`group flex h-full flex-col px-7 py-5 transition ${
            activeMode === "unsure"
              ? "bg-[var(--color-surface-elevated)]"
              : "hover:bg-[var(--color-surface-muted)]"
          }`}
        >
          <p className="font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)] transition group-hover:translate-x-1 sm:text-2xl">
            {copy.unsureTitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {copy.unsureIntro}
          </p>
          <p className="mt-auto pt-5 text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)] opacity-0 transition group-hover:opacity-100">
            Continue →
          </p>
        </Link>
      </CanvasStaggerItem>
    </CanvasStagger>
  );
}

function ContactPathTabsFromUrl({ fallbackMode }: { fallbackMode: ContactMode }) {
  const searchParams = useSearchParams();
  const activeMode = searchParams.has("mode")
    ? parseContactMode(searchParams.get("mode"))
    : fallbackMode;

  return <ContactPathTabs activeMode={activeMode} />;
}

function ContactSuccessDialog({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const success = calicapContact.formSuccess;
  const navButtonClass =
    "inline-flex min-h-11 flex-1 items-center justify-center border border-[var(--color-border-subtle)] px-4 py-2.5 text-sm font-semibold text-[var(--color-text-strong)] transition hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface-muted)]";

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[780] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={`${titleId}-body`}
        className="w-full max-w-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-6 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              id={titleId}
              className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-text-strong)]"
            >
              {success.title}
            </p>
            <p
              id={`${titleId}-body`}
              className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]"
            >
              {success.body}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] transition hover:text-[var(--color-text-strong)]"
            aria-label="Close"
          >
            <X className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={navButtonClass}>
            Home
          </Link>
          <Link href="/services" className={navButtonClass}>
            Services
          </Link>
          <Link href="/work" className={navButtonClass}>
            Work
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ContactPageView({ initialMode, initialCountry }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const openSuccess = useCallback(() => setSubmitted(true), []);
  const closeSuccess = useCallback(() => setSubmitted(false), []);

  return (
    <article className="canvas-contact w-full min-w-0 overflow-visible pt-4 pb-0">
      <ContactFloatingIcons />
      <div className="relative z-10 overflow-visible">
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ])}
        />
        <div className="mt-6">
          <CanvasTextRevealInView
            as="h1"
            lines={["Tell us", "your problem."]}
            className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[var(--color-text-strong)]"
          />
        </div>

        <Suspense fallback={<ContactPathTabs activeMode={initialMode} />}>
          <ContactPathTabsFromUrl fallbackMode={initialMode} />
        </Suspense>

        <CanvasReveal variant="rise" delay={0.1} className="mt-14 overflow-visible pt-4">
          <Suspense
            fallback={
              <div className="min-h-[24rem] animate-pulse bg-[var(--color-surface-elevated)]" />
            }
          >
            <ContactForm
              initialMode={initialMode}
              initialCountry={initialCountry}
              onSuccess={openSuccess}
            />
          </Suspense>
        </CanvasReveal>
      </div>

      {submitted ? <ContactSuccessDialog onClose={closeSuccess} /> : null}
    </article>
  );
}
