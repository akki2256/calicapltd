"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CANVAS_NAV_LINKS } from "@/lib/themes";
import { useCanvasMenu } from "@/components/canvas/canvas-menu-context";
import { CanvasBurger } from "@/components/canvas/canvas-burger";
import { ThemeToggle } from "@/components/theme-toggle";

function CanvasCloseIcon({ visible }: { visible: boolean }) {
  return (
    <span className="relative block h-5 w-5" aria-hidden>
      <span
        className={`absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-white transition-all duration-300 ${visible ? "rotate-45 scale-100" : "rotate-0 scale-0"}`}
      />
      <span
        className={`absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-white transition-all duration-300 ${visible ? "-rotate-45 scale-100" : "rotate-0 scale-0"}`}
      />
    </span>
  );
}

export function CanvasNav() {
  const pathname = usePathname();
  const { open, toggleMenu, closeMenu } = useCanvasMenu();

  return (
    <nav className="canvas-nav fixed inset-y-0 right-0 z-[600]" aria-label="Primary">
      <div className="canvas-nav-rail fixed inset-y-0 right-0 border-l border-white/[0.06] bg-[#141414] shadow-[-10px_0_24px_rgba(0,0,0,0.45)]">
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ThemeToggle variant="rail" />
        </div>
      </div>

      <div
        id="canvas-menubar"
        className={`canvas-menubar fixed inset-0 bg-[#141414]/98 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="canvas-menubar-top absolute left-0 top-0 w-full border-b border-white/[0.04] shadow-[0_10px_24px_rgba(0,0,0,0.35)]" />
        <ul className="canvas-menu-list absolute inset-0 flex flex-col md:flex-row">
          {CANVAS_NAV_LINKS.map((item, index) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li
                key={item.href}
                className="canvas-menu-item relative flex-1 border-b border-white/[0.04] md:w-[118px] md:flex-none md:border-b-0 md:border-r md:border-white/[0.04] md:shadow-[-10px_0_24px_rgba(0,0,0,0.25)]"
                style={{ transitionDelay: open ? `${index * 0.06 + 0.1}s` : "0s" }}
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={`group flex h-full min-h-[72px] w-full flex-col justify-start px-5 py-5 font-[family-name:var(--font-display)] text-[15px] font-extralight tracking-[0.04em] transition-colors duration-300 sm:min-h-[88px] sm:px-[26px] sm:py-[26px] md:min-h-0 md:text-[23px] md:leading-[1.15] ${active ? "text-white" : "text-[#7d7d7d] hover:text-white"}`}
                >
                  <span className="relative inline-block">
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-500 ${active ? "w-full opacity-80" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-50"}`}
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="canvas-nav-close absolute right-0 top-0 flex items-center justify-center text-white transition-opacity duration-300 hover:opacity-60"
          aria-label="Close menu"
          onClick={closeMenu}
        >
          <CanvasCloseIcon visible={open} />
        </button>
      </div>
    </nav>
  );
}
