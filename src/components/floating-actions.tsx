"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const IDLE_MS = 5000;

export function FloatingActions() {
  const [callVisible, setCallVisible] = useState(true);
  const hoveringRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const scheduleHide = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (!hoveringRef.current) setCallVisible(false);
    }, IDLE_MS);
  }, []);

  const showCall = useCallback(() => {
    setCallVisible(true);
    scheduleHide();
  }, [scheduleHide]);

  useEffect(() => {
    showCall();
    const opts: AddEventListenerOptions = { passive: true };
    const events = ["pointermove", "pointerdown", "scroll", "keydown", "touchstart", "wheel"] as const;
    events.forEach((event) => window.addEventListener(event, showCall, opts));
    return () => {
      events.forEach((event) => window.removeEventListener(event, showCall));
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [showCall]);

  return (
    <div className="floating-actions pointer-events-none fixed z-[550] flex flex-col items-end gap-2">
      <div className="pointer-events-auto">
        <ThemeToggle />
      </div>
      <Link
        href="/contact"
        className={`floating-actions-btn floating-actions-btn-primary pointer-events-auto transition-all duration-300 ease-out ${
          callVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
        aria-label="Book a call"
        title="Book a call"
        onPointerEnter={() => {
          hoveringRef.current = true;
          setCallVisible(true);
          if (timerRef.current) window.clearTimeout(timerRef.current);
        }}
        onPointerLeave={() => {
          hoveringRef.current = false;
          scheduleHide();
        }}
      >
        <Phone className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </Link>
    </div>
  );
}
