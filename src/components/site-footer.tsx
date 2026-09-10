import Link from "next/link";
import {
  Briefcase,
  CircleUser,
  FolderKanban,
  LayoutGrid,
  Monitor,
  Shield,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import {
  calicapContact,
  calicapFooterLinks,
} from "@/lib/calicap-contact";

const footerIcons: Record<string, LucideIcon> = {
  "/about": CircleUser,
  "/services": Briefcase,
  "/services/web-app-development": Monitor,
  "/services/mobile-app-development": Smartphone,
  "/work": FolderKanban,
  "/privacy": Shield,
};

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-muted)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-xl text-slate-900">
              <LayoutGrid
                className="h-5 w-5 text-[var(--color-accent)]"
                strokeWidth={2}
                aria-hidden
              />
              {calicapContact.brand}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">
              {calicapContact.footerBlurb}
            </p>
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
        <p className="mt-10 text-xs text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} {calicapContact.brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
