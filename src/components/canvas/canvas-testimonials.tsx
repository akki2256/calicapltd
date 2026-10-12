"use client";

import { useCallback, useId, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
const ATTRIB_DELAY = 0.14;

/**
 * Home testimonials — floating platform scene (Canvas theme only).
 * Preserves shared testimonial content; Calicon branch is untouched.
 */
export function CanvasTestimonials() {
  const section = calicapTestimonialsSection;
  const items = getHomeTestimonials();
  const reduced = usePrefersReducedMotion();
  const labelId = useId();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

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

        <div
          className="canvas-testimonials__voices"
          role="region"
          aria-roledescription="carousel"
          aria-labelledby="canvas-testimonials-heading"
          aria-describedby={labelId}
          onKeyDown={onKeyNav}
        >
          <p id={labelId} className="sr-only">
            Client testimonials. Use previous and next to change the active
            quote.
          </p>

          <div className="canvas-testimonials__stage">
            {/* Stable height: all quotes occupy the same grid cell invisibly */}
            <div className="canvas-testimonials__sizer" aria-hidden>
              {items.map((item) => (
                <TestimonialBody key={item.id} item={item} />
              ))}
            </div>

            <div
              className="canvas-testimonials__active"
              aria-live="polite"
              aria-atomic="true"
            >
              {reduced ? (
                current ? <TestimonialBody item={current} /> : null
              ) : (
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  {current ? (
                    <motion.div
                      key={current.id}
                      className="canvas-testimonials__motion"
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({
                          opacity: 0,
                          y: d >= 0 ? 18 : -18,
                        }),
                        center: { opacity: 1, y: 0 },
                        exit: (d: number) => ({
                          opacity: 0,
                          y: d >= 0 ? -14 : 14,
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
                        attribDelay={ATTRIB_DELAY}
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              )}
            </div>
          </div>

          <div className="canvas-testimonials__controls">
            <button
              type="button"
              className="canvas-testimonials__nav"
              onClick={goPrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </button>

            <div
              className="canvas-testimonials__dots"
              role="tablist"
              aria-label="Select testimonial"
            >
              {items.map((item, i) => {
                const selected = i === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-label={`Show testimonial from ${item.name}, ${item.company}`}
                    tabIndex={selected ? 0 : -1}
                    className={`canvas-testimonials__dot${selected ? " is-active" : ""}`}
                    onClick={() => goTo(i, i > active ? 1 : -1)}
                  />
                );
              })}
            </div>

            <button
              type="button"
              className="canvas-testimonials__nav"
              onClick={goNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </button>

            <span className="canvas-testimonials__count" aria-hidden>
              {String(active + 1).padStart(2, "0")}
              <span className="canvas-testimonials__count-sep">/</span>
              {String(count).padStart(2, "0")}
            </span>
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
