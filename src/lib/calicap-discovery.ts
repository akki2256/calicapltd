export type ContactMode = "know" | "unsure";

export function parseContactMode(value: string | null | undefined): ContactMode {
  return value === "unsure" ? "unsure" : "know";
}

export const calicapDiscovery = {
  formIntroTitle: "Tell us what's happening.",
  formIntroBody:
    "Whether the requirement is clear or still taking shape, a little context is enough to start.",
  knowTitle: "I know what I need",
  knowIntro: "Have a clear requirement? Tell us what needs to be built or improved.",
  knowCtaLabel: "Tell us about your project",
  unsureTitle: "I'm not sure what I need",
  unsureIntro:
    "Have an idea, a challenge, or a goal but aren't sure what technology makes sense? A short guided path helps define the approach.",
  unsureCtaLabel: "Help me figure it out",
  modeKnowLabel: "I know what I need",
  modeUnsureLabel: "I'm not sure what I need",
  submitLabel: "Start the conversation",
} as const;

export type DiscoveryQuestion = {
  id: string;
  label: string;
  placeholder?: string;
  type: "text" | "textarea" | "select";
  required?: boolean;
  options?: readonly { value: string; label: string }[];
};

/** Business-language discovery — no budget, timeline, or tech-stack questions */
export const calicapDiscoveryQuestions: readonly DiscoveryQuestion[] = [
  {
    id: "business",
    label: "What does your organization do?",
    placeholder: "e.g. retail, education, professional services…",
    type: "text",
    required: true,
  },
  {
    id: "problem",
    label: "What's not working as well as it should?",
    placeholder: "What's slowing things down or creating friction?",
    type: "textarea",
    required: true,
  },
  {
    id: "improve",
    label: "What are you trying to improve, build, or change?",
    placeholder: "A new product, a better process, a replacement system…",
    type: "textarea",
    required: true,
  },
  {
    id: "outcome",
    label: "What would success look like?",
    placeholder: "Time saved, clearer operations, a shipped product…",
    type: "textarea",
    required: true,
  },
  {
    id: "existing",
    label: "Do you already use software or systems for this?",
    type: "select",
    required: true,
    options: [
      { value: "yes", label: "Yes — systems in use today" },
      { value: "partial", label: "Some tools, but they're fragmented" },
      { value: "no", label: "Not really — starting fresh" },
      { value: "unsure", label: "Not sure how to describe it" },
    ],
  },
  {
    id: "context",
    label: "Anything else we should know? (optional)",
    placeholder: "Explain the situation in your own words…",
    type: "textarea",
    required: false,
  },
] as const;
