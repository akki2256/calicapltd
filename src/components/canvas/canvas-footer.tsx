"use client";

import Link from "next/link";
import { calicapContact, calicapFooterLinks } from "@/lib/calicap-contact";
import { ProblemCtaButton } from "@/components/contact-path-chooser";

const links = calicapFooterLinks.filter((l) => l.href !== "/privacy");

/** Real Canvas footer — editorial close, not an empty gradient slab */
export function CanvasFooter() {
  return (
    <footer className="canvas-site-footer border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
        <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-medium leading-snug tracking-[-0.03em] text-[var(--color-text-strong)]">
          {calicapContact.footerTagline}
        </p>
        <div className="mt-10">
          <ProblemCtaButton>{calicapContact.footerCtaLabel}</ProblemCtaButton>
        </div>
        <nav
          className="mt-14 flex flex-wrap gap-x-6 gap-y-3"
          aria-label="Footer"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text-strong)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="mt-10 text-xs text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} {calicapContact.brand}
          {" · "}
          <Link href="/privacy" className="hover:text-[var(--color-text-strong)]">
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  );
}
