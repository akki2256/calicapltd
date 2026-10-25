"use client";

import { CanvasOutcomeView } from "@/components/canvas/canvas-outcome-view";

type Props = {
  outcomeId: string;
  embedded?: boolean;
};

/** Outcome body for the circuit detail panel (e.g. Integrations). */
export function OutcomeEmbeddedView({ outcomeId, embedded = true }: Props) {
  return <CanvasOutcomeView outcomeId={outcomeId} embedded={embedded} />;
}
