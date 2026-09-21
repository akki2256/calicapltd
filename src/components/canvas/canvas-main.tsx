"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCanvasMenu } from "@/components/canvas/canvas-menu-context";
import { CanvasHome } from "@/components/canvas/canvas-home";
import { CanvasHomeChapter } from "@/components/canvas/canvas-home-chapter";
import { CanvasScrollEnhancer } from "@/components/canvas/canvas-scroll-enhancer";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { canvasDur, canvasEase } from "@/components/canvas/motion/tokens";

type Props = {
  children: React.ReactNode;
};

export function CanvasMain({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { open, closeMenu } = useCanvasMenu();
  const mainRef = useRef<HTMLElement>(null);
  const isHome = pathname === "/";
  const reduced = usePrefersReducedMotion();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    closeMenu();
    setLeaving(false);
    document.documentElement.classList.remove("canvas-out");
  }, [pathname, closeMenu]);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || !main.contains(anchor)) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }
      if (anchor.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === pathname && url.search === window.location.search) return;

      event.preventDefault();
      if (reduced) {
        router.push(url.pathname + url.search + url.hash);
        return;
      }

      setLeaving(true);
      document.documentElement.classList.add("canvas-out");
      window.setTimeout(() => {
        router.push(url.pathname + url.search + url.hash);
      }, 480);
    };

    main.addEventListener("click", handleClick);
    return () => main.removeEventListener("click", handleClick);
  }, [pathname, router, reduced]);

  return (
    <main
      ref={mainRef}
      id="canvas-main"
      className={`canvas-main site-main ${isHome ? "canvas-main-home" : "canvas-main-inner"} ${open ? "canvas-main-menu-open" : ""}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className="canvas-page relative"
          initial={
            reduced
              ? false
              : { opacity: 0, y: 24, clipPath: "inset(0 0 12% 0)" }
          }
          animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
          exit={
            reduced
              ? undefined
              : { opacity: 0, y: -16, clipPath: "inset(0 0 40% 0)", filter: "blur(4px)" }
          }
          transition={{ duration: canvasDur.base, ease: canvasEase }}
        >
          {/* System wipe line during leave */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-[var(--color-accent)]"
            initial={false}
            animate={leaving ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.45, ease: canvasEase }}
            aria-hidden
          />

          {isHome ? (
            <>
              <CanvasHome />
              <div className="canvas-home-chapter">
                <CanvasHomeChapter />
              </div>
              <div className="hidden" aria-hidden>
                {children}
              </div>
            </>
          ) : (
            <div className="canvas-inner-content">
              <CanvasScrollEnhancer>{children}</CanvasScrollEnhancer>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
