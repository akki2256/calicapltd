"use client";

import type { LucideIcon } from "lucide-react";
import {
  AtSign,
  Headphones,
  Inbox,
  Mail,
  MessageCircle,
  MessagesSquare,
  Phone,
  Radio,
  Send,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useCanvasPointer } from "@/components/canvas/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type FloatIcon = {
  Icon: LucideIcon;
  /** Horizontal placement (% of field) */
  x: string;
  /** Vertical placement (% of field) */
  y: string;
  /** CSS width */
  size: string;
  /** Parallax depth — higher = stronger pointer follow (like hero signal layers) */
  depth: number;
  /** Ambient drift variant */
  drift: "a" | "b" | "c";
  rot: number;
  /** Base opacity 0–1 */
  opacity: number;
};

/**
 * Sparse messaging marks — hairline, near-white, Canvas-signal language.
 * Drift freely; pointer response mirrors the home hero field.
 */
const ICONS: FloatIcon[] = [
  { Icon: MessageCircle, x: "4%", y: "6%", size: "clamp(4.5rem, 11vw, 8.5rem)", depth: 0.55, drift: "a", rot: -14, opacity: 0.04 },
  { Icon: Mail, x: "78%", y: "10%", size: "clamp(3.75rem, 9vw, 7rem)", depth: 0.9, drift: "b", rot: 12, opacity: 0.035 },
  { Icon: Send, x: "38%", y: "16%", size: "clamp(3.25rem, 8vw, 6.25rem)", depth: 0.4, drift: "c", rot: -28, opacity: 0.03 },
  { Icon: Phone, x: "88%", y: "28%", size: "clamp(4rem, 10vw, 7.75rem)", depth: 1.05, drift: "a", rot: 18, opacity: 0.038 },
  { Icon: MessagesSquare, x: "6%", y: "36%", size: "clamp(4.25rem, 11vw, 8.25rem)", depth: 0.7, drift: "b", rot: 6, opacity: 0.04 },
  { Icon: Headphones, x: "52%", y: "44%", size: "clamp(3.5rem, 9vw, 6.75rem)", depth: 0.35, drift: "c", rot: -10, opacity: 0.028 },
  { Icon: Radio, x: "90%", y: "52%", size: "clamp(3.75rem, 9vw, 7.25rem)", depth: 0.85, drift: "a", rot: -16, opacity: 0.035 },
  { Icon: AtSign, x: "16%", y: "58%", size: "clamp(3rem, 7.5vw, 5.75rem)", depth: 0.5, drift: "b", rot: 8, opacity: 0.032 },
  { Icon: Video, x: "68%", y: "66%", size: "clamp(3.5rem, 9vw, 6.5rem)", depth: 0.75, drift: "c", rot: 14, opacity: 0.03 },
  { Icon: Inbox, x: "8%", y: "78%", size: "clamp(3.75rem, 9vw, 7rem)", depth: 0.6, drift: "a", rot: -8, opacity: 0.035 },
  { Icon: Send, x: "44%", y: "86%", size: "clamp(3rem, 7vw, 5.5rem)", depth: 0.45, drift: "b", rot: 22, opacity: 0.028 },
  { Icon: MessageCircle, x: "82%", y: "88%", size: "clamp(3.5rem, 8.5vw, 6.5rem)", depth: 0.95, drift: "c", rot: -20, opacity: 0.032 },
];

export function ContactFloatingIcons() {
  const reduced = usePrefersReducedMotion();
  const { pointer, active } = useCanvasPointer(!reduced);

  return (
    <div className="contact-float-field" aria-hidden="true">
      {ICONS.map(({ Icon, x, y, size, depth, drift, rot, opacity }, index) => (
        <motion.span
          key={`${drift}-${index}`}
          className="contact-float-icon"
          style={{
            left: x,
            top: y,
            width: size,
            opacity,
            // Same pointer field response as canvas-home signal layers
            x: active ? pointer.x * (36 + depth * 48) : 0,
            y: active ? pointer.y * (22 + depth * 32) : 0,
          }}
        >
          <span
            className={`contact-float-icon__drift contact-float-icon__drift--${drift}`}
            style={{ rotate: `${rot}deg` }}
          >
            <Icon strokeWidth={1} />
          </span>
        </motion.span>
      ))}
    </div>
  );
}
