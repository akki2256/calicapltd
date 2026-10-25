"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ChevronDown, Search } from "lucide-react";
import type { CountryCode } from "libphonenumber-js";
import {
  filterPhoneCountries,
  formatNationalAsYouType,
  getPhoneCountryOption,
  getPhoneCountryOptions,
  toE164Phone,
} from "@/lib/phone-countries";

type Props = {
  id: string;
  name?: string;
  initialCountry: CountryCode;
  /** E.164 when valid; empty string when cleared */
  value: string;
  onChange: (e164: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  invalid?: boolean;
  describedBy?: string;
  disabled?: boolean;
};

function nationalFromE164(e164: string, country: CountryCode): string {
  if (!e164.trim()) return "";
  const option = getPhoneCountryOption(country);
  if (!option) return e164;
  const prefix = `+${option.callingCode}`;
  if (e164.startsWith(prefix)) {
    return formatNationalAsYouType(e164.slice(prefix.length), country);
  }
  return e164;
}

export function ContactPhoneInput({
  id,
  name = "phone",
  initialCountry,
  value,
  onChange,
  onFocus,
  onBlur,
  invalid = false,
  describedBy,
  disabled = false,
}: Props) {
  const listId = useId();
  const searchId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Country is initialized once from IP detection — never overwritten by re-renders
  const [country, setCountry] = useState<CountryCode>(initialCountry);
  const [national, setNational] = useState(() =>
    nationalFromE164(value, initialCountry),
  );
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const countries = useMemo(() => getPhoneCountryOptions(), []);
  const filtered = useMemo(
    () => filterPhoneCountries(query, countries),
    [query, countries],
  );
  const selected = getPhoneCountryOption(country) ?? countries[0];

  const shellClass = invalid
    ? "mt-2 flex w-full overflow-visible rounded-xl border border-red-500/60 bg-[var(--color-surface-elevated)] shadow-inner shadow-[var(--color-card-shadow)] transition focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/25"
    : "mt-2 flex w-full overflow-visible rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] shadow-inner shadow-[var(--color-card-shadow)] transition focus-within:border-[var(--color-accent)]/50 focus-within:ring-2 focus-within:ring-[var(--color-accent)]/25";

  const commitE164 = useCallback(
    (nextNational: string, nextCountry: CountryCode) => {
      const e164 = toE164Phone(nextNational, nextCountry);
      // While typing incomplete numbers, keep the raw national text in the
      // hidden field so optional empty stays empty and partial isn't lost.
      if (e164 === "") {
        onChange("");
        return;
      }
      if (e164 === null) {
        onChange(nextNational.trim());
        return;
      }
      onChange(e164);
    },
    [onChange],
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    setActiveIndex(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-phone-country-index="${activeIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open, filtered]);

  const selectCountry = (code: CountryCode) => {
    setCountry(code);
    const reformatted = formatNationalAsYouType(
      national.replace(/\D/g, ""),
      code,
    );
    setNational(reformatted);
    commitE164(reformatted, code);
    close();
    document.getElementById(id)?.focus();
  };

  const onCountryKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  };

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const option = filtered[activeIndex];
      if (option) selectCountry(option.code);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  };

  const onNationalChange = (raw: string) => {
    const formatted = formatNationalAsYouType(raw, country);
    setNational(formatted);
    commitE164(formatted, country);
  };

  const handleBlurField = () => {
    // Defer so country-option click can register before close/blur validation
    window.setTimeout(() => {
      if (rootRef.current?.contains(document.activeElement)) return;
      const e164 = toE164Phone(national, country);
      if (e164 && e164 !== "") onChange(e164);
      onBlur?.();
    }, 0);
  };

  if (!selected) return null;

  return (
    <div ref={rootRef} className="contact-phone-input relative">
      <input type="hidden" name={name} value={value} />
      <div className={shellClass}>
        <button
          type="button"
          disabled={disabled}
          aria-label={`Country calling code, ${selected.name}, +${selected.callingCode}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => {
            if (disabled) return;
            setOpen((v) => !v);
          }}
          onKeyDown={onCountryKeyDown}
          onFocus={onFocus}
          className="inline-flex shrink-0 items-center gap-1.5 border-r border-[var(--color-border-subtle)] px-3 py-3 text-sm text-[var(--color-text-strong)] transition hover:bg-[var(--color-surface-muted)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="text-base leading-none" aria-hidden>
            {selected.flag}
          </span>
          <span className="tabular-nums text-[var(--color-text-muted)]">
            +{selected.callingCode}
          </span>
          <ChevronDown
            className={`h-3.5 w-3.5 text-[var(--color-text-muted)] transition ${open ? "rotate-180" : ""}`}
            strokeWidth={2}
            aria-hidden
          />
        </button>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          disabled={disabled}
          value={national}
          placeholder="Phone number"
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onFocus={onFocus}
          onBlur={handleBlurField}
          onChange={(e) => onNationalChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-[var(--color-text-strong)] outline-none placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {open ? (
        <div
          className="absolute left-0 z-[120] mt-2 w-[min(100%,20rem)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] shadow-[var(--color-card-shadow)]"
          role="presentation"
        >
          <div className="flex items-center gap-2 border-b border-[var(--color-border-subtle)] px-3 py-2">
            <Search
              className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-muted)]"
              strokeWidth={2}
              aria-hidden
            />
            <label htmlFor={searchId} className="sr-only">
              Search countries
            </label>
            <input
              ref={searchRef}
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onSearchKeyDown}
              placeholder="Search country or code"
              className="w-full bg-transparent py-1.5 text-sm text-[var(--color-text-strong)] outline-none placeholder:text-[var(--color-text-muted)]"
            />
          </div>
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label="Country calling codes"
            className="max-h-56 overflow-y-auto overscroll-contain py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-sm text-[var(--color-text-muted)]">
                No countries match
              </li>
            ) : (
              filtered.map((option, index) => {
                const isActive = index === activeIndex;
                const isSelected = option.code === country;
                return (
                  <li key={option.code} role="none">
                    <button
                      type="button"
                      role="option"
                      data-phone-country-index={index}
                      aria-selected={isSelected}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => selectCountry(option.code)}
                      className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition ${
                        isActive
                          ? "bg-[var(--color-surface-muted)] text-[var(--color-text-strong)]"
                          : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-strong)]"
                      } ${isSelected ? "text-[var(--color-text-strong)]" : ""}`}
                    >
                      <span className="text-base leading-none" aria-hidden>
                        {option.flag}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{option.name}</span>
                      <span className="shrink-0 tabular-nums text-[var(--color-text-muted)]">
                        +{option.callingCode}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
