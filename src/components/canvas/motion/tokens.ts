/** Canvas motion scale — keep timings intentional and shared */

export const canvasEase = [0.22, 1, 0.36, 1] as const;
export const canvasEaseOut = [0.16, 1, 0.3, 1] as const;
export const canvasEaseIn = [0.4, 0, 1, 1] as const;

export const canvasDur = {
  micro: 0.22,
  fast: 0.45,
  base: 0.75,
  slow: 1.05,
  hero: 1.35,
} as const;

export const canvasStagger = {
  tight: 0.07,
  base: 0.1,
  loose: 0.14,
} as const;

export const viewportOnce = {
  once: true,
  amount: 0.22,
  margin: "0px 0px -8% 0px",
} as const;

export const viewportReplay = {
  once: false,
  amount: 0.35,
  margin: "0px 0px -10% 0px",
} as const;
