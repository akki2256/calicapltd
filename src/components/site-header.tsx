import Link from "next/link";
import { CircleUser, Sparkles } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { ServicesMenuDesktop } from "@/components/services-menu-desktop";
import { calicapServicePillars } from "@/lib/calicap-services";

const serviceLinks = calicapServicePillars.map(({ href, title }) => ({
  href,
  label: title,
}));

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[60] overflow-x-clip border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl min-w-0 items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex min-w-0 shrink items-center gap-2 font-[family-name:var(--font-display)] text-base font-medium tracking-tight text-slate-800 transition hover:text-slate-950 sm:text-lg"
        >
          <Sparkles
            className="h-5 w-5 shrink-0 text-gold-600"
            strokeWidth={2}
            aria-hidden
          />
          <span className="truncate">Calicon</span>
        </Link>
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 transition hover:text-slate-900"
          >
            <CircleUser className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            About
          </Link>
          <ServicesMenuDesktop serviceLinks={serviceLinks} />
        </nav>
        <MobileNav serviceLinks={serviceLinks} />
      </div>
    </header>
  );
}
