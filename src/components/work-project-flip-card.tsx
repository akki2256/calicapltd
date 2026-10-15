"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export type WorkProjectFlipCardProps = {
  href: string;
  title: string;
  label?: string;
  description?: string;
  result?: string;
  image: { src: string; alt: string };
  featured?: boolean;
  aspectClassName?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  ctaLabel?: string;
};

type SlideSide = "top" | "right" | "bottom" | "left";

const SLIDE_SIDES: readonly SlideSide[] = ["top", "right", "bottom", "left"];

function pickSlideSide(exclude?: SlideSide): SlideSide {
  const pool = exclude ? SLIDE_SIDES.filter((s) => s !== exclude) : SLIDE_SIDES;
  return pool[Math.floor(Math.random() * pool.length)] ?? "left";
}

function useCanHoverReveal() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return canHover;
}

/**
 * Project card — large image with a grey shade that slides in from a random side.
 */
export function WorkProjectFlipCard({
  href,
  title,
  label,
  description,
  result,
  image,
  featured = false,
  aspectClassName = "",
  sizes = "100vw",
  priority = false,
  className = "",
  ctaLabel = "View project",
}: WorkProjectFlipCardProps) {
  const reduced = usePrefersReducedMotion();
  const canHover = useCanHoverReveal();
  const [open, setOpen] = useState(false);
  const [slideFrom, setSlideFrom] = useState<SlideSide>("left");
  const rootRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const openWithSlide = useCallback(() => {
    const el = rootRef.current;
    const next = reduced ? slideFrom : pickSlideSide(slideFrom);

    // Snap shade off-stage on the new side (no tween), then slide in.
    if (el && !reduced) {
      el.classList.add("is-arming");
      el.classList.remove("is-open");
      el.setAttribute("data-slide", next);
      void el.offsetWidth;
      el.classList.remove("is-arming");
    }

    setSlideFrom(next);
    setOpen(true);
  }, [reduced, slideFrom]);

  useEffect(() => {
    if (!open || canHover) return;

    const onPointerDown = (event: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (event.target instanceof Node && !root.contains(event.target)) {
        close();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, canHover, close]);

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduced || canHover) return;
    if (!open) {
      event.preventDefault();
      openWithSlide();
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      close();
      return;
    }
    if (reduced || canHover) return;
    if (event.key === " " && !open) {
      event.preventDefault();
      openWithSlide();
    }
  };

  const onBlur = (event: FocusEvent<HTMLAnchorElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    close();
  };

  const accessibleName = [
    title,
    label,
    result,
    description,
    canHover || reduced || open ? ctaLabel : `Reveal details, then ${ctaLabel.toLowerCase()}`,
  ]
    .filter(Boolean)
    .join(". ");

  return (
    <Link
      ref={rootRef}
      href={href}
      aria-label={accessibleName}
      data-canvas-authored=""
      data-canvas-media=""
      data-slide={slideFrom}
      className={[
        "work-flip",
        canHover ? "work-flip--hoverable" : "",
        open ? "is-open" : "",
        reduced ? "work-flip--reduced" : "",
        featured ? "work-flip--featured" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={() => openWithSlide()}
      onBlur={onBlur}
      onMouseEnter={() => {
        if (canHover) openWithSlide();
      }}
      onMouseLeave={() => {
        if (canHover) close();
      }}
    >
      <div className={`work-flip__scene ${aspectClassName}`.trim()}>
        <div className="work-flip__media-wrap" aria-hidden="true">
          <Image
            src={image.src}
            alt=""
            fill
            priority={priority}
            sizes={sizes}
            className="work-flip__media object-cover"
          />
        </div>

        <div className="work-flip__shade" aria-hidden="true">
          <div className="work-flip__shade-inner">
            <p className="work-flip__title">{title}</p>
            {result ? <p className="work-flip__result">{result}</p> : null}
            <span className="work-flip__cta">
              <span className="work-flip__cta-text">{ctaLabel}</span>
              <span className="work-flip__cta-arrow" aria-hidden="true">
                <span className="work-flip__cta-line" />
                <span className="work-flip__cta-head" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
