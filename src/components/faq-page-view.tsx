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
import { ThemeSplit } from "@/components/theme-split";
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  calicapFaqs,
  filterFaqItems,
  type FaqCategoryId,
  type FaqItem,
} from "@/lib/calicap-faqs";

type CategoryFilter = FaqCategoryId | "all";
type Variant = "canvas" | "calicon";

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
  variant,
  query,
  onQueryChange,
  onClear,
  inputId,
}: {
  variant: Variant;
  query: string;
  onQueryChange: (value: string) => void;
  onClear: () => void;
  inputId: string;
}) {
  const copy = calicapFaqs.search;
  const isCanvas = variant === "canvas";

  return (
    <div className={isCanvas ? "canvas-faq__search" : "calicon-faq__search"}>
      <label htmlFor={inputId} className="sr-only">
        {copy.label}
      </label>
      <Search
        className={isCanvas ? "canvas-faq__search-icon" : "calicon-faq__search-icon"}
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
        className={isCanvas ? "canvas-faq__search-input" : "calicon-faq__search-input"}
      />
      {query ? (
        <button
          type="button"
          onClick={onClear}
          className={isCanvas ? "canvas-faq__search-clear" : "calicon-faq__search-clear"}
        >
          <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          <span>{copy.clearLabel}</span>
        </button>
      ) : null}
    </div>
  );
}

function FaqCategoryNav({
  variant,
  category,
  onSelect,
}: {
  variant: Variant;
  category: CategoryFilter;
  onSelect: (next: CategoryFilter) => void;
}) {
  const isCanvas = variant === "canvas";
  const options: { id: CategoryFilter; label: string }[] = [
    { id: "all", label: calicapFaqs.categories.allLabel },
    ...FAQ_CATEGORIES.map((item) => ({ id: item.id, label: item.label })),
  ];

  return (
    <div
      className={isCanvas ? "canvas-faq__cats" : "calicon-faq__cats"}
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
            className={
              isCanvas
                ? `canvas-faq__cat${selected ? " canvas-faq__cat--active" : ""}`
                : `calicon-faq__cat${selected ? " calicon-faq__cat--active" : ""}`
            }
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
  variant,
  item,
  open,
  onToggle,
  panelId,
}: {
  variant: Variant;
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
  panelId: string;
}) {
  const isCanvas = variant === "canvas";
  const Icon = open ? Minus : Plus;

  return (
    <div
      className={
        isCanvas
          ? `canvas-faq__item${open ? " canvas-faq__item--open" : ""}`
          : `calicon-faq__item${open ? " calicon-faq__item--open" : ""}`
      }
    >
      <h3 className={isCanvas ? "canvas-faq__question" : "calicon-faq__question"}>
        <button
          type="button"
          id={`${item.id}-button`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className={isCanvas ? "canvas-faq__trigger" : "calicon-faq__trigger"}
        >
          <span>{item.question}</span>
          <Icon
            className={isCanvas ? "canvas-faq__icon" : "calicon-faq__icon"}
            strokeWidth={1.75}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={`${item.id}-button`}
        inert={open ? undefined : true}
        className={isCanvas ? "canvas-faq__panel" : "calicon-faq__panel"}
      >
        <div className={isCanvas ? "canvas-faq__panel-inner" : "calicon-faq__panel-inner"}>
          <div className={isCanvas ? "canvas-faq__answer" : "calicon-faq__answer"}>
            <FaqAnswerBody item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqEmptyState({
  variant,
  onClear,
  hasQuery,
}: {
  variant: Variant;
  onClear: () => void;
  hasQuery: boolean;
}) {
  const copy = calicapFaqs.results;
  const isCanvas = variant === "canvas";

  return (
    <div className={isCanvas ? "canvas-faq__empty" : "calicon-faq__empty"} role="status">
      <p className={isCanvas ? "canvas-faq__empty-title" : "calicon-faq__empty-title"}>
        {copy.emptyTitle}
      </p>
      <p className={isCanvas ? "canvas-faq__empty-body" : "calicon-faq__empty-body"}>
        {copy.emptyBody}
      </p>
      {hasQuery ? (
        <button
          type="button"
          onClick={onClear}
          className={isCanvas ? "canvas-faq__empty-clear" : "calicon-faq__empty-clear"}
        >
          {calicapFaqs.search.clearLabel}
        </button>
      ) : null}
    </div>
  );
}

function FaqRelatedLinks({ variant }: { variant: Variant }) {
  const related = calicapFaqs.related;
  const isCanvas = variant === "canvas";

  return (
    <section
      className={isCanvas ? "canvas-faq__related" : "calicon-faq__related"}
      aria-labelledby="faq-related-title"
    >
      <h2
        id="faq-related-title"
        className={isCanvas ? "canvas-faq__related-title" : "calicon-faq__related-title"}
      >
        {related.title}
      </h2>
      <p className={isCanvas ? "canvas-faq__related-body" : "calicon-faq__related-body"}>
        {related.body}
      </p>
      <ul className={isCanvas ? "canvas-faq__related-links" : "calicon-faq__related-links"}>
        {related.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FaqExplorer({ variant }: { variant: Variant }) {
  const explorer = useFaqExplorer();
  const searchId = useId();
  const isCanvas = variant === "canvas";
  const matchLabel =
    explorer.filtered.length === 1
      ? calicapFaqs.results.matchOne
      : calicapFaqs.results.matchMany(explorer.filtered.length);

  return (
    <section
      className={isCanvas ? "canvas-faq__explorer" : "calicon-faq__explorer"}
      aria-label="Frequently asked questions"
    >
      <div className={isCanvas ? "canvas-faq__toolbar" : "calicon-faq__toolbar"}>
        <FaqSearchField
          variant={variant}
          query={explorer.query}
          onQueryChange={explorer.updateQuery}
          onClear={explorer.clearSearch}
          inputId={searchId}
        />
        <FaqCategoryNav
          variant={variant}
          category={explorer.category}
          onSelect={explorer.selectCategory}
        />
        <p className={isCanvas ? "canvas-faq__count" : "calicon-faq__count"} aria-live="polite">
          {matchLabel}
        </p>
      </div>

      {explorer.filtered.length === 0 ? (
        <FaqEmptyState
          variant={variant}
          onClear={explorer.clearSearch}
          hasQuery={Boolean(explorer.query.trim())}
        />
      ) : isCanvas ? (
        <CanvasStagger className="canvas-faq__list" as="div" stagger={0.04}>
          {explorer.filtered.map((item) => (
            <CanvasStaggerItem key={item.id}>
              <FaqAccordionItem
                variant="canvas"
                item={item}
                open={explorer.openId === item.id}
                onToggle={() => explorer.toggleItem(item.id)}
                panelId={`${item.id}-panel`}
              />
            </CanvasStaggerItem>
          ))}
        </CanvasStagger>
      ) : (
        <div className="calicon-faq__list">
          {explorer.filtered.map((item) => (
            <FaqAccordionItem
              key={item.id}
              variant="calicon"
              item={item}
              open={explorer.openId === item.id}
              onToggle={() => explorer.toggleItem(item.id)}
              panelId={`${item.id}-panel`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function CanvasFaqs() {
  const hero = calicapFaqs.hero;

  return (
    <article className="canvas-faq w-full min-w-0 pt-4 pb-0" data-canvas-authored="">
      <div className="canvas-faq__backdrop" aria-hidden>
        <div className="canvas-faq__mesh">
          <CanvasNodeMesh tone="dark" intensity={0.55} />
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
          <FaqExplorer variant="canvas" />
        </div>

        <CanvasReveal variant="riseSoft" className="mt-4">
          <FaqRelatedLinks variant="canvas" />
        </CanvasReveal>
      </div>
    </article>
  );
}

function CaliconFaqs() {
  const hero = calicapFaqs.hero;

  return (
    <div className="calicon-faq mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700/95">
          {hero.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">{hero.intro}</p>
        <div className="mt-8">
          <ButtonLink href={hero.ctaHref}>{hero.ctaLabel}</ButtonLink>
        </div>
      </header>

      <div className="mt-14 border-t border-[var(--color-border-subtle)] pt-10">
        <FaqExplorer variant="calicon" />
      </div>

      <FaqRelatedLinks variant="calicon" />
    </div>
  );
}

export function FaqPageView() {
  return <ThemeSplit canvas={<CanvasFaqs />} calicon={<CaliconFaqs />} />;
}
