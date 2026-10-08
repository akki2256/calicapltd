"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { CANVAS_NAV_LINKS } from "@/lib/themes";
import { useCanvasMenu } from "@/components/canvas/canvas-menu-context";
import { CanvasBurger } from "@/components/canvas/canvas-burger";

export function CanvasNav() {
  const pathname = usePathname();
  const { open, toggleMenu, closeMenu } = useCanvasMenu();

  const navLinks = CANVAS_NAV_LINKS;

  return (
    <nav className="canvas-nav" aria-label="Primary">
      <button
        type="button"
        className="canvas-nav-trigger canvas-nav-trigger-float group fixed z-[760] flex shrink-0 items-center justify-center"
        aria-expanded={open}
        aria-controls="canvas-menubar"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={toggleMenu}
      >
        <CanvasBurger open={open} />
      </button>

      <div
        id="canvas-menubar"
        className={`canvas-menubar fixed inset-0 z-[745] overflow-y-auto overscroll-contain bg-[var(--color-surface)]/98 backdrop-blur-md transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="mx-auto flex min-h-full max-w-6xl flex-col px-6 pb-16 pt-[calc(var(--fab-size)+1.75rem)] sm:px-10 lg:px-14">
          <div className="flex shrink-0 items-start pr-[calc(var(--fab-size)+0.75rem)]">
            <Link
              href="/"
              onClick={closeMenu}
              className="brand-logo-link canvas-menu-brand group inline-flex items-center"
              aria-label="Calicon home"
            >
              <BrandLogo
                size="lg"
                variant="on-dark"
                layout="lockup"
                priority
                label=""
              />
            </Link>
          </div>

          <ul className="my-auto flex flex-col gap-1 py-8">
            {navLinks.map((item, index) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li
                  key={item.href}
                  className="canvas-menu-item border-b border-[var(--color-border-subtle)]"
                  style={{
                    transitionDelay: open ? `${120 + index * 45}ms` : "0ms",
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`group block py-4 transition-colors duration-500 sm:py-5 ${
                      active
                        ? "text-[var(--color-text-strong)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-link-hover)]"
                    }`}
                  >
                    <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,4.5vw,2.75rem)] font-medium tracking-[-0.03em]">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
