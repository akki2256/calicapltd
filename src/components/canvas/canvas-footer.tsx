"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { PILLAR_PATHS } from "@/lib/brand-architecture";
import { calicapContact, calicapFooterLinks } from "@/lib/calicap-contact";
import { ProblemCtaButton } from "@/components/contact-path-chooser";

const pillarHrefs = new Set<string>(PILLAR_PATHS);
const practiceLinks = calicapFooterLinks.filter((l) => pillarHrefs.has(l.href));
const companyLinks = calicapFooterLinks.filter((l) =>
  l.href === "/work" || l.href === "/about" || l.href === "/contact",
);

/** Canvas footer — structured editorial close */
export function CanvasFooter() {
  return (
    <footer className="canvas-site-footer border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
        {/* Brand + close */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <Link
            href="/"
            className="brand-logo-link canvas-footer-brand inline-flex w-fit"
            aria-label={`${calicapContact.brand} home`}
          >
            <BrandLogo size="footer" variant="on-dark" layout="lockup" label="" />
          </Link>

          <div className="min-w-0 max-w-xl lg:justify-self-end lg:text-right">
            <p className="font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.8vw,2rem)] font-medium leading-snug tracking-[-0.03em] text-[var(--color-text-strong)]">
              {calicapContact.footerTagline}
            </p>
            <div className="mt-7 lg:flex lg:justify-end">
              <ProblemCtaButton>{calicapContact.footerCtaLabel}</ProblemCtaButton>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-16 grid gap-10 border-t border-[var(--color-border-subtle)] pt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div>
            <p className="canvas-micro text-[var(--color-accent)]">Practice</p>
            <ul className="mt-5 flex flex-col gap-3">
              {practiceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text-strong)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="canvas-micro text-[var(--color-accent)]">Company</p>
            <ul className="mt-5 flex flex-col gap-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text-strong)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="canvas-micro text-[var(--color-accent)]">Note</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--color-text-muted)]">
              {calicapContact.footerBlurb}
            </p>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-[var(--color-border-subtle)] pt-8">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {calicapContact.brand}
          </p>
          <Link
            href="/privacy"
            className="text-xs text-[var(--color-text-muted)] transition hover:text-[var(--color-text-strong)]"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
