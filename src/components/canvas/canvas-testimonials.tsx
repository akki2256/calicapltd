"use client";

import {
  CanvasReveal,
  CanvasSectionTransition,
  CanvasTextScrub,
} from "@/components/canvas/motion";
import {
  HOME_TESTIMONIALS_ID,
  calicapTestimonialsSection,
  getHomeTestimonials,
} from "@/lib/calicap-testimonials";

/**
 * Home testimonials — editorial quote stack below impact metrics.
 * Uses placeholder quotes until clients approve real copy.
 */
export function CanvasTestimonials() {
  const section = calicapTestimonialsSection;
  const items = getHomeTestimonials();

  return (
    <section
      id={HOME_TESTIMONIALS_ID}
      className="canvas-testimonials"
      aria-labelledby="canvas-testimonials-heading"
      data-canvas-section="testimonials"
    >
      <div className="canvas-testimonials__frame canvas-content-frame">
        <CanvasSectionTransition variant="wipeRight">
          <p className="canvas-micro text-[var(--color-accent)]">{section.eyebrow}</p>
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

        <ul className="canvas-testimonials__list">
          {items.map((item, i) => (
            <li key={item.id} className="canvas-testimonials__item">
              <CanvasReveal variant="riseSoft" delay={0.04 + i * 0.06}>
                <blockquote className="canvas-testimonials__quote">
                  <p>{item.quote}</p>
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
                </blockquote>
              </CanvasReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
