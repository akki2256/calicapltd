"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Minus, Plus, Search, X } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CanvasNodeMesh } from "@/components/canvas/canvas-node-mesh";
import {
  CanvasReveal,
  CanvasStagger,
  CanvasStaggerItem,
  CanvasTextRevealInView,
} from "@/components/canvas/motion";
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  calicapFaqs,
  filterFaqItems,
  type FaqCategoryId,
  type FaqItem,
} from "@/lib/calicap-faqs";

type CategoryFilter = FaqCategoryId | "all";

function useFaqExplorer() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () => filterFaqItems(FAQ_ITEMS, category, query),
    [category, query],
  );

  const updateQuery = (value: string) => {
    setQuery(value);
    setOpenId(null);
  };

  const clearSearch = () => {
    setQuery("");
    setOpenId(null);
  };

  const selectCategory = (next: CategoryFilter) => {
    setCategory(next);
    setOpenId(null);
  };

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return {
    category,
    query,
    updateQuery,
    openId,
    filtered,
    clearSearch,
    selectCategory,
    toggleItem,
  };
}

function FaqSearchField({
  query,
  onQueryChange,
  onClear,
  inputId,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  onClear: () => void;
  inputId: string;
}) {
  const copy = calicapFaqs.search;

  return (
    <div className="canvas-faq__search">
      <label htmlFor={inputId} className="sr-only">
        {copy.label}
      </label>
      <Search
        className="canvas-faq__search-icon"
        strokeWidth={1.75}
        aria-hidden
      />
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={copy.placeholder}
        autoComplete="off"
        className="canvas-faq__search-input"
      />
      {query ? (
        <button type="button" onClick={onClear} className="canvas-faq__search-clear">
          <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          <span>{copy.clearLabel}</span>
        </button>
      ) : null}
    </div>
  );
}

function FaqCategoryNav({
  category,
  onSelect,
}: {
  category: CategoryFilter;
  onSelect: (next: CategoryFilter) => void;
}) {
  const options: { id: CategoryFilter; label: string }[] = [
    { id: "all", label: calicapFaqs.categories.allLabel },
    ...FAQ_CATEGORIES.map((item) => ({ id: item.id, label: item.label })),
  ];

  return (
    <div
      className="canvas-faq__cats"
      role="tablist"
      aria-label={calicapFaqs.categories.navLabel}
    >
      {options.map((option) => {
        const selected = category === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={selected}
            id={`faq-tab-${option.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(option.id)}
            className={`canvas-faq__cat${selected ? " canvas-faq__cat--active" : ""}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function FaqAnswerBody({ item }: { item: FaqItem }) {
  return <p>{item.answer}</p>;
}

function FaqAccordionItem({
  item,
  open,
  onToggle,
  panelId,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
  panelId: string;
}) {
  const Icon = open ? Minus : Plus;

  return (
    <div className={`canvas-faq__item${open ? " canvas-faq__item--open" : ""}`}>
      <h3 className="canvas-faq__question">
        <button
          type="button"
          id={`${item.id}-button`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="canvas-faq__trigger"
        >
          <span>{item.question}</span>
          <Icon className="canvas-faq__icon" strokeWidth={1.75} aria-hidden />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={`${item.id}-button`}
        inert={open ? undefined : true}
        className="canvas-faq__panel"
      >
        <div className="canvas-faq__panel-inner">
          <div className="canvas-faq__answer">
            <FaqAnswerBody item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqEmptyState({
  onClear,
  hasQuery,
}: {
  onClear: () => void;
  hasQuery: boolean;
}) {
  const copy = calicapFaqs.results;

  return (
    <div className="canvas-faq__empty" role="status">
      <p className="canvas-faq__empty-title">{copy.emptyTitle}</p>
      <p className="canvas-faq__empty-body">{copy.emptyBody}</p>
      {hasQuery ? (
        <button type="button" onClick={onClear} className="canvas-faq__empty-clear">
          {calicapFaqs.search.clearLabel}
        </button>
      ) : null}
    </div>
  );
}

function FaqRelatedLinks() {
  const related = calicapFaqs.related;

  return (
    <section className="canvas-faq__related" aria-labelledby="faq-related-title">
      <h2 id="faq-related-title" className="canvas-faq__related-title">
        {related.title}
      </h2>
      <p className="canvas-faq__related-body">{related.body}</p>
      <ul className="canvas-faq__related-links">
        {related.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FaqExplorer() {
  const explorer = useFaqExplorer();
  const searchId = useId();
  const matchLabel =
    explorer.filtered.length === 1
      ? calicapFaqs.results.matchOne
      : calicapFaqs.results.matchMany(explorer.filtered.length);

  return (
    <section className="canvas-faq__explorer" aria-label="Frequently asked questions">
      <div className="canvas-faq__toolbar">
        <FaqSearchField
          query={explorer.query}
          onQueryChange={explorer.updateQuery}
          onClear={explorer.clearSearch}
          inputId={searchId}
        />
        <FaqCategoryNav
          category={explorer.category}
          onSelect={explorer.selectCategory}
        />
        <p className="canvas-faq__count" aria-live="polite">
          {matchLabel}
        </p>
      </div>

      {explorer.filtered.length === 0 ? (
        <FaqEmptyState
          onClear={explorer.clearSearch}
          hasQuery={Boolean(explorer.query.trim())}
        />
      ) : (
        <CanvasStagger className="canvas-faq__list" as="div" stagger={0.04}>
          {explorer.filtered.map((item) => (
            <CanvasStaggerItem key={item.id}>
              <FaqAccordionItem
                item={item}
                open={explorer.openId === item.id}
                onToggle={() => explorer.toggleItem(item.id)}
                panelId={`${item.id}-panel`}
              />
            </CanvasStaggerItem>
          ))}
        </CanvasStagger>
      )}
    </section>
  );
}

export function FaqPageView() {
  const hero = calicapFaqs.hero;

  return (
    <article className="canvas-faq w-full min-w-0 pt-4 pb-0" data-canvas-authored="">
      <div className="canvas-faq__backdrop" aria-hidden>
        <div className="canvas-faq__mesh">
          <CanvasNodeMesh intensity={0.55} />
        </div>
      </div>

      <div className="canvas-faq__content">
        <section className="canvas-faq__hero">
          <CanvasReveal variant="riseSoft" immediate>
            <p className="canvas-micro text-[var(--color-accent)]">{hero.eyebrow}</p>
          </CanvasReveal>
          <div className="mt-6">
            <CanvasTextRevealInView
              as="h1"
              lines={["Questions?", "Let's clear things up."]}
              className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[1.05] tracking-[-0.04em] text-[var(--color-text-strong)]"
            />
          </div>
          <CanvasReveal variant="blurIn" delay={0.1} className="mt-6 max-w-xl">
            <p className="text-[15px] leading-[1.75] text-[var(--color-text-muted)]">
              {hero.intro}
            </p>
          </CanvasReveal>
          <CanvasReveal variant="riseSoft" delay={0.14} className="mt-8">
            <ButtonLink href={hero.ctaHref}>{hero.ctaLabel}</ButtonLink>
          </CanvasReveal>
        </section>

        <div className="border-t border-[var(--color-border-subtle)] pt-10">
          <FaqExplorer />
        </div>

        <CanvasReveal variant="riseSoft" className="mt-4">
          <FaqRelatedLinks />
        </CanvasReveal>
      </div>
    </article>
  );
}
