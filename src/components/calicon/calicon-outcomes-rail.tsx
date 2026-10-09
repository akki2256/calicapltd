"use client";

import { OutcomesCircuitBoard } from "@/components/outcomes-circuit-board";

/** Home discovery outcomes — Calicon shell */
export function CaliconOutcomesRail() {
  return (
    <div className="mt-12 border-t border-[var(--color-border-subtle)] pt-10">
      <OutcomesCircuitBoard showTitle />
    </div>
  );
}
