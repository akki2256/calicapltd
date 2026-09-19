"use client";

import Link from "next/link";
import { MessageCircle, Sparkles } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { useContactPathChooser } from "@/components/contact-path-chooser";
import { CALICON_DESKTOP_NAV_LINKS } from "@/lib/primary-nav";

/** Nav without Contact — CTA covers that path on desktop */
const desktopLinks = CALICON_DESKTOP_NAV_LINKS.filter((l) => l.href !== "/contact");

export function SiteHeader() {
  const { openChooser } = useContactPathChooser();

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
          className="hidden min-w-0 items-center gap-3 lg:gap-5 xl:gap-6 md:flex"
          aria-label="Primary"
        >
          {desktopLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 text-sm text-slate-600 transition hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={openChooser}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-btn-primary-bg)] px-3.5 py-2 text-xs font-semibold text-[var(--color-btn-primary-text)] transition hover:bg-[var(--color-btn-primary-hover)] lg:px-4 lg:text-sm"
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            <span className="hidden lg:inline">Tell us your problem</span>
            <span className="lg:hidden">Tell us</span>
          </button>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
