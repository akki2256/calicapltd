import Link from "next/link";
import { CircleUser, Phone, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { MobileNav } from "@/components/mobile-nav";
import { ServicesMenuDesktop } from "@/components/services-menu-desktop";
<<<<<<< HEAD
=======
import { ThemeSelector } from "@/components/theme-selector";
>>>>>>> 4c896421623002b20fad236becc872417032659e

const serviceLinks = [
  {
    href: "/services/web-app-development",
    label: "Web app development",
  },
  {
    href: "/services/mobile-app-development",
    label: "Mobile app development",
  },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[60] border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-medium tracking-tight text-slate-800 transition hover:text-slate-950"
        >
          <Sparkles
            className="h-5 w-5 shrink-0 text-gold-600"
            strokeWidth={2}
            aria-hidden
          />
          Calicon
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
        <div className="flex items-center gap-3">
<<<<<<< HEAD
=======
          <ThemeSelector className="hidden sm:inline-flex" compact />
>>>>>>> 4c896421623002b20fad236becc872417032659e
          <ButtonLink
            href="/contact"
            variant="primary"
            className="hidden sm:inline-flex"
          >
            <Phone className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            Book a call
          </ButtonLink>
          <MobileNav serviceLinks={serviceLinks} />
        </div>
      </div>
    </header>
  );
}
