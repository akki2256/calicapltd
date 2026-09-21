type Props = {
  title: string;
  body: string;
};

/** Short delivery note. Token-styled so both themes inherit chrome. */
export function ProjectApproach({ title, body }: Props) {
  return (
    <section className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]">
        Approach
      </p>
      <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-[var(--color-text-strong)] sm:text-2xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">
        {body}
      </p>
    </section>
  );
}
