import Link from "next/link";
import {
  CircleUser,
  FolderKanban,
  LayoutGrid,
  LayoutTemplate,
  Mail,
  MessageCircle,
  Cpu,
  RefreshCw,
  Shield,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import {
  calicapContact,
  calicapFooterLinks,
} from "@/lib/calicap-contact";

const footerIcons: Record<string, LucideIcon> = {
  "/build": LayoutTemplate,
  "/transform": Workflow,
  "/automate": Cpu,
  "/evolve": RefreshCw,
  "/work": FolderKanban,
  "/about": CircleUser,
  "/contact": Mail,
  "/privacy": Shield,
};

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <Link
              href="/"
              className="brand-logo-link calicon-footer-brand inline-flex w-fit"
              rel="home"
              aria-label={`${calicapContact.brand} home`}
            >
              <BrandLogo
                size="footer"
                variant="calicon"
                palette="official"
                layout="lockup"
                label=""
              />
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">
              {calicapContact.footerBlurb}
            </p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-lg font-medium tracking-tight text-slate-900">
              {calicapContact.footerTagline}
            </p>
            <div className="mt-6 max-w-md">
              <p className="text-sm font-medium text-slate-800">
                {calicapContact.footerCtaPrompt}
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                {calicapContact.footerCtaBody}
              </p>
              <ProblemCtaButton variant="link" className="mt-4">
                <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                {calicapContact.footerCtaLabel}
              </ProblemCtaButton>
            </div>
          </div>
          <nav className="flex max-w-xl flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
            {calicapFooterLinks.map((l) => {
              const Icon = footerIcons[l.href] ?? LayoutGrid;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text-strong)]"
                >
                  <Icon
                    className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <p className="mt-10 text-sm text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} {calicapContact.brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
