"use client";

import Link from "next/link";
import {
  Briefcase,
  CircleUser,
  LayoutGrid,
  Menu,
  Phone,
} from "lucide-react";
import { useRef } from "react";
import { serviceHrefIcon } from "@/lib/service-link-icon";
import { ThemeSelector } from "@/components/theme-selector";

export type MobileNavLink = { href: string; label: string };

type Props = {
  serviceLinks: readonly MobileNavLink[];
};

export function MobileNav({ serviceLinks }: Props) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const closeMenu = () => {
    const el = detailsRef.current;
    if (el) {
      el.open = false;
    }
  };

  return (
    <details ref={detailsRef} className="relative md:hidden">
      <summary className="list-none cursor-pointer rounded-lg border border-[var(--color-border-subtle)] bg-white/70 px-3 py-2 text-sm text-slate-700 shadow-sm [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          <Menu className="h-4 w-4 shrink-0 text-slate-600" strokeWidth={2} aria-hidden />
          Menu
        </span>
      </summary>
      <div className="absolute right-0 mt-2 w-60 surface-card rounded-xl p-2 shadow-xl">
        <Link
          href="/about"
          onClick={closeMenu}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-200/80 hover:text-slate-900"
        >
          <CircleUser className="h-4 w-4 shrink-0 text-gold-600" strokeWidth={2} aria-hidden />
          About
        </Link>
        <p className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          <Briefcase className="h-3 w-3" strokeWidth={2} aria-hidden />
          Services
        </p>
        {serviceLinks.map((s) => {
          const Icon = serviceHrefIcon(s.href);
          return (
            <Link
              key={s.href}
              href={s.href}
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-lg px-3 py-2 pl-5 text-sm text-slate-700 hover:bg-slate-200/80 hover:text-slate-900"
            >
              <Icon
                className="h-4 w-4 shrink-0 text-gold-600"
                strokeWidth={2}
                aria-hidden
              />
              {s.label}
            </Link>
          );
        })}
        <Link
          href="/services"
          onClick={closeMenu}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-500 hover:bg-slate-200/60 hover:text-slate-800"
        >
          <LayoutGrid className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
          Services overview
        </Link>
        <Link
          href="/contact"
          onClick={closeMenu}
          className="mt-1 flex items-center gap-2 rounded-lg bg-[var(--color-accent-soft)] px-3 py-2 text-sm font-medium text-gold-700"
        >
          <Phone className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Book a call
        </Link>
        <div className="mt-2 border-t border-[var(--color-border-subtle)] pt-2">
          <ThemeSelector className="w-full justify-between" />
        </div>
      </div>
    </details>
  );
}
