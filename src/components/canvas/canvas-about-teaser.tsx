"use client";

import { ButtonLink } from "@/components/button-link";
import {
  CanvasReveal,
  CanvasTextScrub,
} from "@/components/canvas/motion";
import { CanvasParticlePyramid } from "@/components/canvas/canvas-particle-pyramid";
import { calicapAbout } from "@/lib/calicap-about";
import { calicapHomeHero } from "@/lib/calicap-home";

/**
 * Home teaser for About — Canvas indexing page only, below the tech marquee.
 */
export function CanvasAboutTeaser() {
  const about = calicapAbout;

  return (
    <section
      className="canvas-about-teaser"
      aria-label="About Us"
      data-canvas-section="about-teaser"
    >
      <div className="canvas-about-teaser__frame canvas-content-frame">
        <div className="canvas-about-teaser__layout">
          <div className="canvas-about-teaser__copy">
            <CanvasReveal variant="riseSoft">
              <div className="canvas-about-teaser__eyebrow">
                <span className="h-px w-8 bg-[var(--color-accent)]" aria-hidden />
                <p className="canvas-micro text-[var(--color-accent)]">About Us</p>
              </div>
            </CanvasReveal>

            <CanvasTextScrub
              as="h2"
              lines={["We understand", "before we create."]}
              className="canvas-about-teaser__title"
              emphasize={["understand", "create"]}
            />
            <CanvasReveal variant="blurIn" delay={0.08}>
              <p className="canvas-about-teaser__body">{about.lead}</p>
            </CanvasReveal>
            <CanvasReveal
              variant="riseSoft"
              delay={0.12}
              className="canvas-about-teaser__cta"
            >
              <ButtonLink href="/about" variant="ghost">
                Read More
              </ButtonLink>
              <ButtonLink href={calicapHomeHero.secondaryHref} variant="ghost">
                {calicapHomeHero.secondaryCta}
              </ButtonLink>
            </CanvasReveal>
          </div>

          <div className="canvas-about-teaser__visual" aria-hidden>
            <CanvasParticlePyramid />
          </div>
        </div>
      </div>
    </section>
  );
}
