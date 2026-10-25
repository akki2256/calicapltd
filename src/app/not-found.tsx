import { ButtonLink } from "@/components/button-link";
import { ProblemCtaButton } from "@/components/contact-path-chooser";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-24">
      <p className="canvas-micro text-[var(--color-accent)]">404</p>
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-[-0.035em] text-[var(--color-text-strong)]">
        This page is not here.
      </h1>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--color-text-muted)]">
        The link may be outdated. Start from home, or tell us what you were trying to find.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href="/">Home</ButtonLink>
        <ProblemCtaButton variant="ghost">Tell us your problem</ProblemCtaButton>
      </div>
    </div>
  );
}
