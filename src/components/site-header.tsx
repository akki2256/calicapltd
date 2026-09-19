"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { useContactPathChooser } from "@/components/contact-path-chooser";
import { CALICON_DESKTOP_NAV_LINKS } from "@/lib/primary-nav";

/** Nav without Contact — CTA covers that path on desktop */
const desktopLinks = CALICON_DESKTOP_NAV_LINKS.filter((l) => l.href !== "/contact");

export function SiteHeader() {
  const { openChooser } = useContactPathChooser();

  return (
    <header className="calicon-header sticky top-0 z-[60] overflow-x-clip border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]/92 backdrop-blur-md">
      <div className="calicon-header-accent" aria-hidden />
      <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl min-w-0 items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex min-w-0 shrink items-center gap-2.5 font-[family-name:var(--font-display)] text-lg font-medium tracking-tight text-slate-900 transition"
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-gold-600/15 transition group-hover:bg-gold-600/25" />
            <span className="relative h-2 w-2 rounded-full bg-gold-600" aria-hidden />
          </span>
          <span className="truncate">Calicon</span>
        </Link>
        <nav
          className="hidden min-w-0 items-center gap-1 lg:gap-1.5 md:flex"
          aria-label="Primary"
        >
          {desktopLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="calicon-nav-link shrink-0 px-2.5 py-2 text-sm text-slate-600 transition hover:text-slate-900 lg:px-3"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={openChooser}
            className="btn-calicon btn-calicon-primary ml-2 inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold lg:px-5 lg:text-sm"
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
