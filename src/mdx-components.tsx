import type { MDXComponents } from "mdx/types";
import { Check, ExternalLink, Quote } from "lucide-react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="font-[family-name:var(--font-display)] mt-12 text-2xl font-medium tracking-tight text-slate-900"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mt-4 text-base leading-relaxed text-slate-600" {...props} />
    ),
    ul: (props) => <ul className="mt-4 space-y-2 text-slate-600" {...props} />,
    li: (props) => (
      <li className="flex gap-2 leading-relaxed">
        <Check
          className="mt-1 h-4 w-4 shrink-0 text-gold-600"
          strokeWidth={2}
          aria-hidden
        />
        <span className="flex-1">{props.children}</span>
      </li>
    ),
    a: ({ href, children, ...rest }) => {
      const external = typeof href === "string" && /^https?:\/\//.test(href);
      return (
        <a
          className="inline-flex items-center gap-0.5 text-gold-600 underline decoration-gold-500/40 underline-offset-4 transition hover:text-gold-700"
          href={href}
          {...rest}
        >
          {children}
          {external ? (
            <ExternalLink
              className="inline h-3 w-3 shrink-0 opacity-70"
              strokeWidth={2}
              aria-hidden
            />
          ) : null}
        </a>
      );
    },
    blockquote: (props) => (
      <blockquote className="mt-6 flex gap-3 border-l-2 border-gold-400 pl-4 text-slate-600 italic">
        <Quote
          className="mt-1 h-5 w-5 shrink-0 text-gold-600"
          strokeWidth={2}
          aria-hidden
        />
        <div className="flex-1">{props.children}</div>
      </blockquote>
    ),
    ...components,
  };
}
