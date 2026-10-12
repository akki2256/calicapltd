"use client";

import {
  createContext,
  useContext,
  type RefObject,
} from "react";

/** Scroll root for nested surfaces (e.g. outcomes detail panel). */
export const CanvasScrollContainerContext =
  createContext<RefObject<HTMLElement | null> | null>(null);

export function useCanvasScrollContainer() {
  return useContext(CanvasScrollContainerContext);
}
