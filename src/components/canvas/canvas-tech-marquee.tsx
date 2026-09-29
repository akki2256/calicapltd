"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Tech = {
  name: string;
  /** Omit for plain-text wordmarks (JavaScript / Java) */
  src?: string;
  variant: "icon" | "lockup" | "text";
  /** Black-on-transparent marks that need invert on Canvas dark */
  invert?: boolean;
};

const TECHS: readonly Tech[] = [
  { name: "React", src: "/tech/react.svg", variant: "icon" },
  { name: "Next.js", src: "/tech/nextjs.svg", variant: "icon" },
  { name: "Node.js", src: "/tech/nodejs.png", variant: "lockup" },
  { name: "TypeScript", src: "/tech/typescript.png", variant: "lockup" },
  { name: "JavaScript", variant: "text" },
  { name: "Java", variant: "text" },
  { name: "Python", src: "/tech/python.png", variant: "icon" },
  { name: "PHP", src: "/tech/php.png", variant: "lockup", invert: true },
  { name: "HTML5", src: "/tech/html5.png", variant: "lockup", invert: true },
  { name: "CSS", src: "/tech/css.webp", variant: "lockup" },
  { name: "Flutter", src: "/tech/flutter.png", variant: "lockup" },
  { name: "Spring", src: "/tech/spring.png", variant: "lockup" },
  { name: "MySQL", src: "/tech/mysql.png", variant: "lockup" },
  { name: "PostgreSQL", src: "/tech/postgresql.png", variant: "icon" },
  { name: "OpenAI", variant: "text" },
  { name: "WordPress", variant: "text" },
  { name: "WooCommerce", src: "/tech/woocommerce.png", variant: "lockup" },
  { name: "Shopify", src: "/tech/shopify.png", variant: "lockup", invert: true },
];

/** One full set per track; two tracks = seamless loop. */
const TRACK = [...TECHS];

/** px / second — keep pace independent of refresh rate */
const SPEED_PX_PER_SEC = 48;

function MarqueeTrack({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="canvas-tech-marquee__track"
      aria-hidden={ariaHidden || undefined}
    >
      {TRACK.map((tech) => (
        <li
          key={tech.name}
          className={`canvas-tech-marquee__item canvas-tech-marquee__item--${tech.variant}${tech.invert ? " canvas-tech-marquee__item--invert" : ""}`}
          data-tech={tech.name}
        >
          {tech.variant === "text" || !tech.src ? (
            <span className="canvas-tech-marquee__wordmark">{tech.name}</span>
          ) : (
            <>
                <Image
                  src={tech.src}
                  alt=""
                  width={tech.variant === "lockup" ? 180 : 56}
                  height={tech.variant === "lockup" ? 56 : 56}
                  className="canvas-tech-marquee__logo"
                  unoptimized
                />
              {tech.variant === "icon" ? (
                <span className="canvas-tech-marquee__label">{tech.name}</span>
              ) : (
                <span className="sr-only">{tech.name}</span>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * Infinite tech strip — Canvas home only, sits just below the hero.
 */
export function CanvasTechMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || reduced) return;

    let raf = 0;
    let offset = 0;
    let lastTs = 0;
    let trackWidth = 0;

    const measure = () => {
      const first = viewport.querySelector<HTMLElement>(".canvas-tech-marquee__track");
      trackWidth = first?.offsetWidth ?? 0;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);

    const tick = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.064);
      lastTs = ts;

      if (trackWidth > 0) {
        offset = (offset + SPEED_PX_PER_SEC * dt) % trackWidth;
        viewport.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      viewport.style.transform = "";
    };
  }, [reduced]);

  return (
    <section
      className={`canvas-tech-marquee${reduced ? " canvas-tech-marquee--static" : ""}`}
      aria-label="Technologies we use"
      data-canvas-section="tech-marquee"
    >
      <div className="canvas-tech-marquee__fade" aria-hidden />
      <div className="canvas-tech-marquee__rail">
        <div ref={viewportRef} className="canvas-tech-marquee__viewport">
          <MarqueeTrack />
          <MarqueeTrack ariaHidden />
        </div>
      </div>
    </section>
  );
}
