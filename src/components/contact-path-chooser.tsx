"use client";

import Link from "next/link";
import { MessageCircle, PhoneForwarded, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import { useTheme } from "@/components/theme-provider";
import { useMagnetic } from "@/hooks/use-magnetic";

type ContactPathChooserContextValue = {
  openChooser: () => void;
};

const ContactPathChooserContext =
  createContext<ContactPathChooserContextValue | null>(null);

export function useContactPathChooser() {
  const ctx = useContext(ContactPathChooserContext);
  if (!ctx) {
    throw new Error("useContactPathChooser must be used within ContactPathChooserProvider");
  }
  return ctx;
}

export function ContactPathChooserProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const { theme } = useTheme();

  const openChooser = useCallback(() => setOpen(true), []);
  const closeChooser = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeChooser();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeChooser]);

  const dialogClass =
    theme === "canvas"
      ? "chooser-dialog chooser-dialog-canvas w-full max-w-lg border border-white/15 bg-[#141414] p-6 shadow-2xl sm:p-8"
      : "chooser-dialog chooser-dialog-calicon surface-card w-full max-w-lg rounded-2xl p-6 shadow-2xl sm:p-8";

  const pathClass =
    theme === "canvas"
      ? "group border border-white/12 p-5 transition hover:border-white/35 hover:bg-white/[0.04]"
      : "group rounded-2xl border border-[var(--color-border-subtle)] p-5 transition hover:border-gold-500/40 hover:bg-[var(--color-accent-soft)]/40";

  return (
    <ContactPathChooserContext.Provider value={{ openChooser }}>
      {children}
      {open ? (
        <div
          className="fixed inset-0 z-[700] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
          role="presentation"
          onClick={closeChooser}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={dialogClass}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id={titleId}
                  className={`font-[family-name:var(--font-display)] tracking-tight text-[var(--color-text-strong)] ${
                    theme === "canvas"
                      ? "text-2xl font-light uppercase tracking-[0.08em]"
                      : "text-2xl font-medium"
                  }`}
                >
                  Tell us your problem
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  Pick the path that fits. Both are fine — a technical brief is not required to start.
                </p>
              </div>
              <button
                type="button"
                onClick={closeChooser}
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center text-[var(--color-text-muted)] transition hover:text-[var(--color-text-strong)] ${
                  theme === "canvas"
                    ? "border border-white/20"
                    : "rounded-full border border-[var(--color-border-subtle)]"
                }`}
                aria-label="Close"
              >
                <X className="h-4 w-4" strokeWidth={2} aria-hidden />
              </button>
            </div>

            <div className="mt-8 grid gap-3">
              <Link href="/contact?mode=know" onClick={closeChooser} className={pathClass}>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-strong)]">
                  <PhoneForwarded className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
                  I know what I need
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  Have a clear requirement? Tell us what needs to be built or improved.
                </p>
              </Link>
              <Link href="/contact?mode=unsure" onClick={closeChooser} className={pathClass}>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-strong)]">
                  <MessageCircle className="h-4 w-4 text-gold-600" strokeWidth={2} aria-hidden />
                  I&apos;m not sure what I need
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  Have an idea, a challenge, or a goal but aren&apos;t sure what technology makes sense?
                </p>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </ContactPathChooserContext.Provider>
  );
}

type ProblemCtaProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "link";
};

/** Opens the two-path contact chooser instead of dumping into a form */
export function ProblemCtaButton({
  children,
  className = "",
  variant = "primary",
}: ProblemCtaProps) {
  const { openChooser } = useContactPathChooser();
  const { theme } = useTheme();
  const isCanvas = theme === "canvas";
  const mag = useMagnetic({
    enabled: isCanvas && variant !== "link",
    strength: 16,
  });

  const variants = isCanvas
    ? {
        primary:
          "btn-canvas btn-canvas-primary rounded-none px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em]",
        ghost:
          "btn-canvas btn-canvas-ghost rounded-none border px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em]",
        link: "gap-1.5 p-0 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80 hover:text-white",
      }
    : {
        primary:
          "btn-calicon btn-calicon-primary rounded-full px-6 py-2.5 text-sm font-semibold",
        ghost:
          "btn-calicon btn-calicon-ghost rounded-full border px-6 py-2.5 text-sm font-semibold",
        link: "gap-1.5 p-0 text-sm font-semibold text-gold-600 hover:text-gold-700",
      };

  return (
    <button
      type="button"
      ref={mag.ref as never}
      style={mag.style}
      onPointerMove={mag.onPointerMove as never}
      onPointerLeave={mag.onPointerLeave}
      onClick={openChooser}
      className={`inline-flex items-center justify-center gap-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
