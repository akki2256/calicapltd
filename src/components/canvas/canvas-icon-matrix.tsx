import type { LucideIcon } from "lucide-react";

export type CanvasIconMatrixItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  href?: string;
};

type Props = {
  items: readonly CanvasIconMatrixItem[];
  className?: string;
  /** Accessible name when used as a nav/list region */
  "aria-label"?: string;
};

const cellClass =
  "group flex h-full items-start gap-2.5 bg-[var(--color-surface)] px-3 py-3 text-left transition-colors duration-300 hover:bg-[var(--color-surface-elevated)]";

/**
 * Bordered 2-column icon matrix used across Canvas (About gaps, legal TOCs, etc.).
 * Outer border + 1px gap lines via background bleed.
 */
export function CanvasIconMatrix({
  items,
  className = "",
  "aria-label": ariaLabel,
}: Props) {
  return (
    <ul
      className={`m-0 grid list-none grid-cols-2 gap-px border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] p-0${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
    >
      {items.map(({ key, label, icon: Icon, href }) => {
        const body = (
          <>
            <Icon
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]"
              strokeWidth={1.6}
              aria-hidden
            />
            <span className="font-[family-name:var(--font-display)] text-[12px] font-medium leading-snug tracking-[-0.015em] text-[var(--color-text-strong)] sm:text-[13px]">
              {label}
            </span>
          </>
        );

        return (
          <li key={key} className="min-w-0">
            {href ? (
              <a href={href} className={`${cellClass} no-underline`}>
                {body}
              </a>
            ) : (
              <div className={cellClass}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
