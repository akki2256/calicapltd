type Props = {
  open: boolean;
  className?: string;
};

export function CanvasBurger({ open, className = "" }: Props) {
  return (
    <span className={`canvas-burger relative block ${className}`} aria-hidden>
      <span
        className={`canvas-burger-line absolute left-1/2 top-1/2 block h-[1.5px] -translate-x-1/2 bg-[var(--color-text-strong)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${open ? "-translate-y-[5px] rotate-45" : "-translate-y-[7px]"}`}
      />
      <span
        className={`canvas-burger-line absolute left-1/2 top-1/2 block h-[1.5px] -translate-x-1/2 bg-[var(--color-text-strong)] transition-all duration-300 ${open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`}
      />
      <span
        className={`canvas-burger-line canvas-burger-bottom absolute left-1/2 top-1/2 block h-[1.5px] -translate-x-1/2 bg-[var(--color-text-strong)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${open ? "translate-y-[5px] -rotate-45" : "translate-y-[7px]"}`}
      />
    </span>
  );
}
