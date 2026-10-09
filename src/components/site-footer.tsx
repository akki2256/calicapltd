import Link from "next/link";
import type { ReactNode } from "react";
import {
  CircleHelp,
  CircleUser,
  FileText,
  FolderKanban,
  LayoutGrid,
  LayoutTemplate,
  Mail,
  MessageCircle,
  Cpu,
  RefreshCw,
  Shield,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { PILLAR_PATHS } from "@/lib/brand-architecture";
import {
  calicapContact,
  calicapFooterLinks,
  calicapQuickLinks,
} from "@/lib/calicap-contact";

const pillarHrefs = new Set<string>(PILLAR_PATHS);
const practiceLinks = calicapFooterLinks.filter((l) => pillarHrefs.has(l.href));
const companyLinks = calicapFooterLinks.filter(
  (l) =>
    l.href === "/work" ||
    l.href === "/services" ||
    l.href === "/about" ||
    l.href === "/contact",
);

const footerIcons: Record<string, LucideIcon> = {
  "/build": LayoutTemplate,
  "/transform": Workflow,
  "/automate": Cpu,
  "/evolve": RefreshCw,
  "/work": FolderKanban,
  "/services": LayoutGrid,
  "/about": CircleUser,
  "/contact": Mail,
  "/faqs": CircleHelp,
  "/privacy-policy": Shield,
  "/terms": FileText,
  "/online-safety": ShieldCheck,
};

const footerLabels = new Map<string, string>([
  ...calicapFooterLinks.map((l) => [l.href, l.label] as const),
  ...calicapQuickLinks.map((l) => [l.href, l.label] as const),
]);

export function SiteFooter() {
  return (
    <footer className="site-footer-shell border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)]">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-0 sm:px-6 lg:px-8 lg:pt-20">
        <div className="min-w-0">
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
          {calicapContact.email ? (
            <a
              href={`mailto:${calicapContact.email}`}
              className="mt-5 block text-sm text-[var(--color-text-muted)] transition hover:text-slate-900"
            >
              {calicapContact.email}
            </a>
          ) : null}
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">
            {calicapContact.footerCtaPrompt} {calicapContact.footerCtaBody}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <ProblemCtaButton>
            <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            {calicapContact.footerCtaLabel}
          </ProblemCtaButton>
          <ul className="flex flex-wrap items-center gap-3" aria-label="Social media">
            {calicapContact.social.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] transition hover:border-gold-500/40 hover:text-slate-900"
                  aria-label={item.label}
                >
                  <CaliconSocialIcon id={item.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-10 border-t border-[var(--color-border-subtle)] pt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <FooterColumn title="Practice">
            {practiceLinks.map((l) => (
              <FooterNavLink key={l.href} href={l.href} icon={footerIcons[l.href]} />
            ))}
          </FooterColumn>
          <FooterColumn title="Company">
            {companyLinks.map((l) => (
              <FooterNavLink key={l.href} href={l.href} icon={footerIcons[l.href]} />
            ))}
          </FooterColumn>
          <FooterColumn title="Quick Links">
            {calicapQuickLinks.map((l) => (
              <FooterNavLink key={l.href} href={l.href} icon={footerIcons[l.href]} />
            ))}
          </FooterColumn>
        </div>

        <div className="footer-legal-bar mt-12 border-t border-[var(--color-border-subtle)] pt-8">
          <p className="text-sm text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {calicapContact.brand}. All rights reserved.
          </p>
          <Link
            href="/privacy"
            className="text-sm text-[var(--color-text-muted)] transition hover:text-slate-900"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

function CaliconSocialIcon({ id }: { id: string }) {
  const className = "h-4 w-4";
  if (id === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    );
  }
  if (id === "x") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.71-8.835L2.25 2.25h6.093l4.261 5.685L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
      </svg>
    );
  }
  if (id === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    );
  }
  return null;
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700/90">
        {title}
      </p>
      <ul className="mt-5 flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterNavLink({
  href,
  icon: Icon,
}: {
  href: string;
  icon?: LucideIcon;
}) {
  const label = footerLabels.get(href) ?? href.slice(1);
  return (
    <li>
      <Link
        href={href}
        className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-[var(--color-text-muted)] transition hover:text-slate-900"
      >
        {Icon ? (
          <Icon
            className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]"
            strokeWidth={2}
            aria-hidden
          />
        ) : null}
        {label}
      </Link>
    </li>
  );
}
