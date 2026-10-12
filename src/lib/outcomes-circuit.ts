/** Home outcomes circuit — shared deep-link + cross-component open API */

export const OUTCOMES_SECTION_ID = "outcomes";
export const OUTCOME_QUERY_KEY = "outcome";
export const OPEN_OUTCOME_EVENT = "calicon:open-outcome";

export type OpenOutcomeDetail = { id: string };

export function outcomeDeepLink(id: string) {
  return `/?${OUTCOME_QUERY_KEY}=${encodeURIComponent(id)}#${OUTCOMES_SECTION_ID}`;
}

export function dispatchOpenOutcome(id: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<OpenOutcomeDetail>(OPEN_OUTCOME_EVENT, { detail: { id } }),
  );
}

export function scrollToOutcomesCircuit() {
  if (typeof document === "undefined") return;
  document
    .getElementById(OUTCOMES_SECTION_ID)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
