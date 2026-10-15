"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  CanvasReveal,
  CanvasSectionTransition,
  CanvasTextScrub,
  canvasEase,
} from "@/components/canvas/motion";
import { CanvasTestimonialPlatform } from "@/components/canvas/canvas-testimonial-platform";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  HOME_TESTIMONIALS_ID,
  calicapTestimonialsSection,
  getHomeTestimonials,
  type CalicapTestimonial,
} from "@/lib/calicap-testimonials";

const QUOTE_MS = 0.55;
const AUTO_MS = 5200;

/**
 * Home testimonials — transitional card carousel over the platform scene.
 * Canvas theme only. Background left as restored from git.
 */
export function CanvasTestimonials() {
  const section = calicapTestimonialsSection;
  const items = getHomeTestimonials();
  const reduced = usePrefersReducedMotion();
  const labelId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const count = items.length;
  const current = items[Math.min(active, Math.max(0, count - 1))] ?? items[0];

  const goTo = useCallback(
    (index: number, dir?: number) => {
      if (count < 1) return;
      const next = ((index % count) + count) % count;
      setDirection(dir ?? (next > active ? 1 : next < active ? -1 : 1));
      setActive(next);
    },
    [active, count],
  );

  const goPrev = useCallback(() => goTo(active - 1, -1), [active, goTo]);
  const goNext = useCallback(() => goTo(active + 1, 1), [active, goTo]);

  useEffect(() => {
    if (reduced || paused || !inView || count < 2) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % count);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, inView, count]);

  const onKeyNav = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0, -1);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(count - 1, 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      id={HOME_TESTIMONIALS_ID}
      className="canvas-testimonials"
      aria-labelledby="canvas-testimonials-heading"
      data-canvas-section="testimonials"
    >
      <div className="canvas-testimonials__scene" aria-hidden>
        <CanvasTestimonialPlatform />
      </div>
      <div className="canvas-testimonials__scrim" aria-hidden />

      <div className="canvas-testimonials__frame canvas-content-frame">
        <div className="canvas-testimonials__layout">
          <div className="canvas-testimonials__copy">
            <CanvasSectionTransition variant="wipeRight">
              <p className="canvas-micro text-[var(--color-accent)]">
                {section.eyebrow}
              </p>
            </CanvasSectionTransition>

            <div className="mt-5">
              <CanvasTextScrub
                as="h2"
                id="canvas-testimonials-heading"
                lines={[...section.titleLines]}
                className="canvas-testimonials__headline"
                lineClassName="canvas-testimonials__headline-line"
                emphasize={[...section.titleEmphasize]}
              />
            </div>

            <CanvasReveal variant="blurIn" delay={0.06}>
              <p className="canvas-testimonials__intro">{section.intro}</p>
            </CanvasReveal>
          </div>

          <div
            className="canvas-testimonials__voices"
            role="region"
            aria-roledescription="carousel"
            aria-labelledby="canvas-testimonials-heading"
            aria-describedby={labelId}
            onKeyDown={onKeyNav}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setPaused(false);
              }
            }}
          >
          <p id={labelId} className="sr-only">
            Client testimonials. Advances automatically. Use left and right
            arrow keys to change the active quote.
          </p>

          <div className="canvas-testimonials__stage">
            <div className="canvas-testimonials__sizer" aria-hidden>
              {items.map((item) => (
                <article key={item.id} className="canvas-testimonials__card">
                  <TestimonialBody item={item} />
                </article>
              ))}
            </div>

            <div
              className="canvas-testimonials__active"
              aria-live="polite"
              aria-atomic="true"
            >
              {reduced ? (
                current ? (
                  <article className="canvas-testimonials__card">
                    <TestimonialBody item={current} />
                  </article>
                ) : null
              ) : (
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  {current ? (
                    <motion.article
                      key={current.id}
                      className="canvas-testimonials__card canvas-testimonials__motion"
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({
                          opacity: 0,
                          x: d >= 0 ? 28 : -28,
                          y: 8,
                          scale: 0.985,
                        }),
                        center: { opacity: 1, x: 0, y: 0, scale: 1 },
                        exit: (d: number) => ({
                          opacity: 0,
                          x: d >= 0 ? -22 : 22,
                          y: -6,
                          scale: 0.985,
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: QUOTE_MS,
                        ease: canvasEase,
                      }}
                    >
                      <TestimonialBody
                        item={current}
                        animateAttribution
                        attribDelay={0.12}
                      />
                    </motion.article>
                  ) : null}
                </AnimatePresence>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialBody({
  item,
  animateAttribution = false,
  attribDelay = 0.14,
}: {
  item: CalicapTestimonial;
  animateAttribution?: boolean;
  attribDelay?: number;
}) {
  const cite = (
    <footer className="canvas-testimonials__cite">
      <cite className="not-italic">
        <span className="canvas-testimonials__name">{item.name}</span>
        <span className="canvas-testimonials__meta">
          {item.role}
          <span aria-hidden>{" / "}</span>
          {item.company}
        </span>
      </cite>
    </footer>
  );

  return (
    <blockquote className="canvas-testimonials__quote">
      <p>{item.quote}</p>
      {animateAttribution ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: attribDelay,
            ease: canvasEase,
          }}
        >
          {cite}
        </motion.div>
      ) : (
        cite
      )}
    </blockquote>
  );
}
