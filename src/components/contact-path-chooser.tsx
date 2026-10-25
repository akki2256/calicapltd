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
import { useMagnetic } from "@/hooks/use-magnetic";
import { track } from "@/lib/analytics";

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

const dialogClass =
  "chooser-dialog w-full max-w-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-6 sm:p-8";

const pathClass =
  "group border border-[var(--color-border-subtle)] p-5 transition hover:border-[var(--color-accent)]/50";

export function ContactPathChooserProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const openChooser = useCallback(() => {
    track("contact_cta_clicked", {
      cta_location:
        typeof window === "undefined" ? undefined : window.location.pathname,
    });
    setOpen(true);
  }, []);
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

  return (
    <ContactPathChooserContext.Provider value={{ openChooser }}>
      {children}
      {open ? (
        <div
          className="fixed inset-0 z-[780] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
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
                  className="font-[family-name:var(--font-display)] text-2xl font-light uppercase tracking-[0.08em] text-[var(--color-text-strong)]"
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
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-[var(--color-text-muted)] transition hover:text-[var(--color-text-strong)]"
                aria-label="Close"
              >
                <X className="h-4 w-4" strokeWidth={2} aria-hidden />
              </button>
            </div>

            <div className="mt-8 grid gap-3">
              <Link href="/contact?mode=know" onClick={() => {
                track("contact_path_selected", { contact_path: "know" });
                closeChooser();
              }} className={pathClass}>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-strong)]">
                  <PhoneForwarded
                    className="h-4 w-4 text-[var(--color-accent)]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  I know what I need
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  Have a clear requirement? Tell us what needs to be built or improved.
                </p>
              </Link>
              <Link href="/contact?mode=unsure" onClick={() => {
                track("contact_path_selected", { contact_path: "unsure" });
                closeChooser();
              }} className={pathClass}>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-strong)]">
                  <MessageCircle
                    className="h-4 w-4 text-[var(--color-accent)]"
                    strokeWidth={2}
                    aria-hidden
                  />
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

const problemCtaVariants = {
  primary:
    "btn-canvas btn-canvas-primary rounded-none px-7 py-3 text-[11px] font-medium uppercase tracking-[0.18em]",
  ghost:
    "btn-canvas btn-canvas-ghost rounded-none border px-7 py-3 text-[11px] font-medium uppercase tracking-[0.18em]",
  link: "gap-1.5 p-0 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-accent)] hover:text-[var(--color-link-hover)]",
} as const;

/** Opens the two-path contact chooser instead of dumping into a form */
export function ProblemCtaButton({
  children,
  className = "",
  variant = "primary",
}: ProblemCtaProps) {
  const { openChooser } = useContactPathChooser();
  const mag = useMagnetic({
    enabled: true,
    strength: 10,
  });

  return (
    <button
      type="button"
      ref={mag.ref as never}
      style={mag.style}
      onPointerMove={mag.onPointerMove as never}
      onPointerLeave={mag.onPointerLeave}
      onClick={openChooser}
      className={`inline-flex items-center justify-center gap-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${problemCtaVariants[variant]} ${className}`}
    >
      {children}
      {variant !== "link" ? (
        <span className="btn-canvas-arrow" aria-hidden>
          →
        </span>
      ) : null}
    </button>
  );
}
