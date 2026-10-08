/**
 * Canvas dual-color appearance — accent words against text-strong headlines.
 * Resting accent: --color-accent · Interactive hover: --color-link-hover (.canvas-em).
 */

const STOP = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "to",
  "of",
  "in",
  "on",
  "for",
  "with",
  "we",
  "you",
  "your",
  "our",
  "us",
  "is",
  "are",
  "be",
  "as",
  "at",
  "by",
  "from",
  "into",
  "what",
  "when",
  "where",
  "who",
  "how",
  "that",
  "this",
  "these",
  "those",
  "it",
  "its",
  "can",
  "ve",
  "re",
  "ll",
  "before",
  "after",
  "about",
  "across",
  "not",
  "no",
  "do",
  "does",
  "did",
  "will",
  "would",
  "should",
  "could",
  "have",
  "has",
  "had",
  "been",
  "was",
  "were",
  "am",
  "i",
  "me",
  "my",
  "they",
  "them",
  "their",
  "than",
  "then",
  "so",
  "if",
  "up",
  "out",
  "all",
  "any",
  "more",
  "most",
  "some",
  "such",
  "only",
  "own",
  "same",
  "too",
  "very",
  "just",
  "also",
  "into",
  "over",
  "under",
  "again",
  "further",
  "once",
  "here",
  "there",
  "why",
  "which",
  "whom",
  "whose",
  "while",
  "during",
  "through",
  "between",
  "against",
  "without",
  "within",
  "along",
  "among",
  "via",
  "per",
  "vs",
]);

/** Normalize a token for emphasize matching (keeps apostrophes). */
export function canvasWordKey(word: string): string {
  return word.replace(/[^\w']/g, "").toLowerCase();
}

function contentKeys(words: string[]): string[] {
  return words
    .map(canvasWordKey)
    .filter((w) => w.length > 1 && !STOP.has(w));
}

/**
 * Pick accent words when call sites omit `emphasize`.
 * Short lines → last content word; longer → last two.
 */
export function autoCanvasEmphasize(words: string[]): string[] {
  const content = contentKeys(words);
  if (content.length === 0) return [];
  if (content.length <= 3) return [content[content.length - 1]!];
  return content.slice(-2);
}

/**
 * Resolve emphasize list for a headline.
 * - `undefined` → auto dual-color
 * - `[]` / empty → no accent words
 * - non-empty → curated words (case-insensitive match)
 */
export function resolveCanvasEmphasize(
  words: string[],
  emphasize?: string[],
): Set<string> {
  if (emphasize !== undefined) {
    return new Set(emphasize.map((w) => w.toLowerCase()));
  }
  return new Set(autoCanvasEmphasize(words));
}

export function isCanvasEmphasized(word: string, emp: Set<string>): boolean {
  return emp.has(canvasWordKey(word));
}
