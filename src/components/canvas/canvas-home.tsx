"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";
import { CanvasSignal } from "@/components/canvas/canvas-signal";
import {
  CanvasTextReveal,
  canvasDur,
  canvasEase,
  canvasStagger,
  useCanvasPointer,
} from "@/components/canvas/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { calicapHomeHero } from "@/lib/calicap-home";

/**
 * Cinematic Canvas hero — layered entrance + scroll-driven spatial exit.
 */
export function CanvasHome() {
  const hero = calicapHomeHero;
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { pointer, active: pointerActive } = useCanvasPointer(!reduced);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const rotRaw = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const copyYRaw = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyXRaw = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const clipRaw = useTransform(
    scrollYProgress,
    [0, 0.35, 0.85],
    ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 55% 0%)"],
  );

  const visualScale = useSpring(scaleRaw, { stiffness: 70, damping: 26 });
  const visualY = useSpring(yRaw, { stiffness: 70, damping: 26 });
  const visualRot = useSpring(rotRaw, { stiffness: 70, damping: 26 });
  const copyY = useSpring(copyYRaw, { stiffness: 80, damping: 28 });
  const copyX = useSpring(copyXRaw, { stiffness: 80, damping: 28 });
  const copyOpacity = useTransform(scrollYProgress, [0, 0.45, 0.75], [1, 0.7, 0]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  const pointerX = pointerActive ? pointer.x * 36 : 0;
  const pointerY = pointerActive ? pointer.y * 22 : 0;

  return (
    <section
      ref={sectionRef}
      className="canvas-home relative min-h-[100svh] w-full overflow-hidden md:min-h-[110dvh]"
      aria-label="Home"
      data-canvas-section="hero"
    >
      <div className="absolute inset-0 bg-[var(--color-surface)]" aria-hidden />

      {/* Ambient full-bleed field behind copy */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40 max-md:opacity-25"
        style={reduced ? undefined : { opacity: visualOpacity }}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: reduced ? 0.25 : 0.4 }}
        transition={{ duration: 1.2, ease: canvasEase }}
      >
        <CanvasSignal
          scrollProgress={scrollYProgress}
          pointer={pointerActive ? pointer : undefined}
          intensity={0.7}
        />
      </motion.div>

      <motion.div
        className="canvas-home-signal pointer-events-none absolute inset-y-[8%] right-0 w-[min(62%,760px)] max-md:inset-x-0 max-md:top-[4%] max-md:h-[28%] max-md:w-full max-md:opacity-50"
        style={
          reduced
            ? undefined
            : {
                scale: visualScale,
                y: visualY,
                rotate: visualRot,
                opacity: visualOpacity,
                x: pointerX,
                clipPath: clipRaw,
              }
        }
        initial={reduced ? false : { opacity: 0, scale: 0.9, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: canvasDur.hero, ease: canvasEase, delay: 0.08 }}
      >
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { y: pointerY, x: pointerX * 0.4 }}
        >
          <CanvasSignal
            scrollProgress={scrollYProgress}
            pointer={pointerActive ? pointer : undefined}
            intensity={1}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="canvas-home-copy-wrap relative z-10 flex min-h-[100svh] items-end md:min-h-[100dvh] md:items-center"
        style={
          reduced
            ? undefined
            : { y: copyY, x: copyX, opacity: copyOpacity, clipPath: clipRaw }
        }
      >
        <div className="canvas-home-copy w-full max-w-[min(100%,42rem)] pb-6 md:pb-0">
          <motion.div
            className="flex items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: canvasDur.base, ease: canvasEase, delay: 0.12 }}
          >
            <span className="h-px w-8 bg-[var(--color-accent)]" aria-hidden />
            <p className="canvas-micro text-[var(--color-accent)]">Technology company</p>
          </motion.div>

          <motion.div
            className="mt-7"
            style={reduced ? undefined : { y: headlineY, scale: headlineScale }}
          >
            <CanvasTextReveal
              as="h1"
              lines={["Build", "what's next."]}
              className="font-[family-name:var(--font-display)] text-[clamp(2.35rem,8.5vw,5.75rem)] font-medium leading-[0.95] tracking-[-0.04em] text-[var(--color-text-strong)] text-balance"
              delay={0.32}
            />
          </motion.div>

          <motion.p
            className="mt-6 max-w-xl text-[15px] font-light leading-[1.7] text-[var(--color-text-muted)] sm:mt-8 sm:text-base"
            initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: canvasDur.base,
              ease: canvasEase,
              delay: 0.32 + canvasStagger.loose * 2 + 0.15,
            }}
          >
            {hero.body}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3 max-[380px]:flex-col max-[380px]:items-stretch sm:mt-10"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: canvasDur.base,
              ease: canvasEase,
              delay: 0.32 + canvasStagger.loose * 2 + 0.35,
            }}
          >
            <ProblemCtaButton>{hero.primaryCta}</ProblemCtaButton>
            <ButtonLink href={hero.secondaryHref} variant="ghost" magnetic>
              {hero.secondaryCta}
            </ButtonLink>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
