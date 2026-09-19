"use client";

import Image from "next/image";
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
 * Art-directed Canvas hero with load choreography + scroll-linked exit.
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

  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const copyYRaw = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const visualScale = useSpring(scaleRaw, { stiffness: 90, damping: 28 });
  const visualY = useSpring(yRaw, { stiffness: 90, damping: 28 });
  const copyY = useSpring(copyYRaw, { stiffness: 90, damping: 28 });
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.35]);

  const pointerX = pointerActive ? pointer.x * 28 : 0;
  const pointerY = pointerActive ? pointer.y * 18 : 0;

  return (
    <section
      ref={sectionRef}
      className="canvas-home relative min-h-[100dvh] w-full overflow-hidden"
      aria-label="Home"
    >
      <div className="absolute inset-0 bg-[var(--color-surface)]" aria-hidden />

      <motion.div
        className="canvas-home-signal absolute inset-y-[12%] right-0 w-[min(58%,720px)] max-md:inset-x-0 max-md:top-[8%] max-md:h-[38%] max-md:w-full"
        style={
          reduced
            ? undefined
            : {
                scale: visualScale,
                y: visualY,
                opacity: visualOpacity,
                x: pointerX,
              }
        }
        initial={reduced ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: canvasDur.hero, ease: canvasEase, delay: 0.05 }}
      >
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { y: pointerY }}
        >
          <CanvasSignal pointer={pointerActive ? pointer : undefined} />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute bottom-[8%] right-[8%] hidden w-[42%] overflow-hidden border border-[var(--color-border-subtle)] md:block"
          initial={reduced ? false : { opacity: 0, y: 24, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: canvasDur.slow, ease: canvasEase, delay: 0.85 }}
        >
          <div className="relative aspect-[16/10]">
            <Image
              src="/images/case-studies/crm-dashboard.png"
              alt=""
              fill
              className="object-cover object-left-top opacity-80"
              sizes="280px"
              priority
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="canvas-home-copy-wrap relative z-10 flex min-h-[100dvh] items-end md:items-center"
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <div className="canvas-home-copy w-full max-w-[min(100%,34rem)] pb-4 md:pb-0">
          <motion.p
            className="canvas-micro text-[var(--color-accent)]"
            initial={reduced ? false : { opacity: 0, y: 12, letterSpacing: "0.32em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.22em" }}
            transition={{ duration: canvasDur.base, ease: canvasEase, delay: 0.15 }}
          >
            Technology company
          </motion.p>

          <div className="mt-7">
            <CanvasTextReveal
              as="h1"
              lines={["Build", "what's next."]}
              className="font-[family-name:var(--font-display)] text-[clamp(3rem,9vw,5.75rem)] font-medium leading-[0.92] tracking-[-0.045em] text-[var(--color-text-strong)]"
              delay={0.28}
            />
          </div>

          <motion.p
            className="mt-8 max-w-md text-[15px] font-light leading-[1.7] text-[var(--color-text-muted)] sm:text-base"
            initial={reduced ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: canvasDur.base,
              ease: canvasEase,
              delay: 0.28 + canvasStagger.loose * 2 + 0.12,
            }}
          >
            {hero.body}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: canvasDur.base,
              ease: canvasEase,
              delay: 0.28 + canvasStagger.loose * 2 + 0.28,
            }}
          >
            <ProblemCtaButton>{hero.primaryCta}</ProblemCtaButton>
            <ButtonLink href={hero.secondaryHref} variant="ghost" magnetic={false}>
              {hero.secondaryCta}
            </ButtonLink>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
