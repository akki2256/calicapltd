"use client";

import Link from "next/link";
import { Menu, MessageCircle } from "lucide-react";
import { useRef } from "react";
import { useContactPathChooser } from "@/components/contact-path-chooser";
import { PRIMARY_NAV_LINKS } from "@/lib/primary-nav";
import { serviceHrefIcon } from "@/lib/service-link-icon";

export type MobileNavLink = { href: string; label: string };

export function MobileNav() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const { openChooser } = useContactPathChooser();

  const closeMenu = () => {
    const el = detailsRef.current;
    if (el) {
      el.open = false;
    }
  };

  return (
    <details ref={detailsRef} className="relative md:hidden">
      <summary className="list-none flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[var(--color-border-subtle)] bg-white/70 text-sm text-slate-700 shadow-sm [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-center">
          <Menu className="h-4 w-4 shrink-0 text-slate-600" strokeWidth={2} aria-hidden />
          <span className="sr-only">Menu</span>
        </span>
      </summary>
      <div className="absolute right-0 z-50 mt-2 max-h-[min(70vh,28rem)] w-[min(16rem,calc(100vw-2rem))] overflow-y-auto surface-card rounded-xl p-2 shadow-xl">
        {PRIMARY_NAV_LINKS.filter((l) => l.href !== "/contact").map((item) => {
          const Icon = serviceHrefIcon(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-200/80 hover:text-slate-900"
            >
              <Icon
                className="h-4 w-4 shrink-0 text-gold-600"
                strokeWidth={2}
                aria-hidden
              />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => {
            closeMenu();
            openChooser();
          }}
          className="mt-1 flex w-full items-center gap-2 rounded-full btn-calicon btn-calicon-primary px-3 py-2.5 text-sm font-semibold"
        >
          <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Tell us your problem
        </button>
      </div>
    </details>
  );
}
