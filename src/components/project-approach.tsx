type Props = {
  title: string;
  body: string;
};

/** Short delivery note. Token-styled so both themes inherit chrome. */
export function ProjectApproach({ title, body }: Props) {
  return (
    <section className="mt-12 border-t border-[var(--color-border-subtle)] pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]">
        Approach
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-start sm:gap-8">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-[var(--color-text-strong)] sm:text-2xl">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{body}</p>
      </div>
    </section>
  );
}
