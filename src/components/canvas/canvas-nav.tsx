"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CANVAS_NAV_LINKS } from "@/lib/themes";
import { useCanvasMenu } from "@/components/canvas/canvas-menu-context";
import { CanvasBurger } from "@/components/canvas/canvas-burger";
import { useContactPathChooser } from "@/components/contact-path-chooser";

function CanvasCloseIcon({ visible }: { visible: boolean }) {
  return (
    <span className="relative block h-5 w-5" aria-hidden>
      <span
        className={`absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-text-strong)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? "rotate-45 scale-100" : "rotate-0 scale-0"}`}
      />
      <span
        className={`absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-text-strong)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? "-rotate-45 scale-100" : "rotate-0 scale-0"}`}
      />
    </span>
  );
}

export function CanvasNav() {
  const pathname = usePathname();
  const { open, toggleMenu, closeMenu } = useCanvasMenu();
  const { openChooser } = useContactPathChooser();

  const navLinks = CANVAS_NAV_LINKS.filter((l) => l.href !== "/contact");

  return (
    <nav className="canvas-nav fixed inset-y-0 right-0 z-[740]" aria-label="Primary">
      <div className="canvas-nav-rail fixed inset-y-0 right-0 z-[750] border-l border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <button
          type="button"
          className="canvas-nav-trigger group flex items-center justify-center"
          aria-expanded={open}
          aria-controls="canvas-menubar"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          <CanvasBurger open={open} />
        </button>
      </div>

      <div
        id="canvas-menubar"
        className={`canvas-menubar fixed inset-0 z-[745] overflow-y-auto overscroll-contain bg-[var(--color-surface)]/98 backdrop-blur-md transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"}`}
        aria-hidden={!open}
        style={{ paddingRight: "var(--canvas-rail)" }}
      >
        <div className="mx-auto flex min-h-full max-w-6xl flex-col px-6 pb-16 pt-[calc(var(--canvas-rail)+1.5rem)] sm:px-10 lg:px-14">
          <div className="flex shrink-0 items-start justify-between gap-6">
            <p className="canvas-micro text-[var(--color-accent)]">Navigate</p>
            <button
              type="button"
              className="flex h-12 w-12 shrink-0 items-center justify-center text-[var(--color-text-strong)] transition hover:opacity-60"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <CanvasCloseIcon visible={open} />
            </button>
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
                    className={`group flex items-baseline justify-between gap-6 py-4 transition-colors duration-500 sm:py-5 ${
                      active
                        ? "text-[var(--color-text-strong)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text-strong)]"
                    }`}
                  >
                    <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,4.5vw,2.75rem)] font-medium tracking-[-0.03em]">
                      {item.label}
                    </span>
                    <span
                      className={`font-mono text-[10px] tracking-[0.16em] ${
                        active ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex shrink-0 flex-wrap items-center gap-6 border-t border-[var(--color-border-subtle)] pt-8">
            <button
              type="button"
              onClick={() => {
                closeMenu();
                openChooser();
              }}
              className="btn-canvas btn-canvas-primary inline-flex items-center justify-center px-7 py-3 text-[11px] font-medium uppercase tracking-[0.2em]"
            >
              Tell us your problem
            </button>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text-strong)]"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
