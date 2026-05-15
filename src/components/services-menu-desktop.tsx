"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { MobileNavLink } from "@/components/mobile-nav";
import { serviceHrefIcon } from "@/lib/service-link-icon";

type Props = {
  serviceLinks: readonly MobileNavLink[];
};

const CLOSE_DELAY_MS = 120;

export function ServicesMenuDesktop({ serviceLinks }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  const cancelClose = () => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setOpen(false);
    }, CLOSE_DELAY_MS);
  };

  useEffect(() => {
    return () => cancelClose();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = rootRef.current;
      if (el && !el.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div
      ref={rootRef}
      className="relative flex items-center gap-0.5"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={() => scheduleClose()}
    >
      <Link
        href="/services"
        onClick={close}
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 transition hover:text-slate-900"
      >
        <Briefcase className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
        Services
      </Link>
      <button
        type="button"
        className="-m-1 inline-flex rounded-md p-1 text-slate-400 transition hover:bg-slate-200/60 hover:text-slate-700"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
      >
        <span className="sr-only">Service options</span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0" aria-hidden strokeWidth={2} />
      </button>
      {/*
        Pull the panel up slightly (top: calc(100% - 8px)) so the pointer never crosses
        a dead zone between the trigger row and the menu—a common cause of flicker/close.
      */}
      <div
        id={menuId}
        className={`absolute left-0 top-[calc(100%-0.5rem)] z-[100] w-60 pt-2 transition-opacity duration-150 ${
          open
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        role="menu"
        aria-hidden={!open}
      >
        <div className="surface-card overflow-hidden rounded-xl py-1 shadow-lg">
          {serviceLinks.map((s) => {
            const Icon = serviceHrefIcon(s.href);
            return (
              <Link
                key={s.href}
                href={s.href}
                onClick={close}
                role="menuitem"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-200/60 hover:text-slate-900"
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
        </div>
      </div>
    </div>
  );
}
