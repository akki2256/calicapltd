import { BarChart3, Scale, Target, type LucideIcon } from "lucide-react";
import { siteImages } from "@/lib/site-images";

export type CalicapTextBlock =
  | { type: "text"; value: string }
  | { type: "em"; value: string };

export type CalicapAboutParagraph = {
  icon: LucideIcon;
  blocks: CalicapTextBlock[];
};

export const calicapAbout = {
  eyebrow: "About",
  title: "Small team by design.",
  image: siteImages.teamCollaboration,
  primaryCta: "Start a conversation",
  secondaryCta: "Read case studies",
  metaTitle: "About",
  metaDescription:
    "Senior-led web and mobile practice—React, Node.js, Spring, AI integrations, native iOS and Android, React Native, AWS and Azure.",
  paragraphs: [
    {
      icon: Target,
      blocks: [
        {
          type: "text",
          value:
            "Calicon sits at the intersection of engineering taste and commercial reality. We work in the stacks clients actually hire for—",
        },
        {
          type: "em",
          value:
            "React for product UIs, Node.js and Spring for services and APIs, thoughtful AI integrations, and native iOS, Android, or React Native on mobile",
        },
        {
          type: "text",
          value: ". Cloud defaults lean toward ",
        },
        { type: "em", value: "AWS" },
        { type: "text", value: " and " },
        { type: "em", value: "Azure" },
        {
          type: "text",
          value:
            ", aligned to your residency and compliance story—because fragile marketing stacks waste attention and budget.",
        },
      ],
    },
    {
      icon: Scale,
      blocks: [
        {
          type: "text",
          value:
            "Engagements are lead-senior: you work with the people shipping the work, not a revolving cast. We are comfortable saying no when the timing, offer, or tracking is not ready for scale.",
        },
      ],
    },
    {
      icon: BarChart3,
      blocks: [
        {
          type: "text",
          value:
            "If you are comparing agencies, ask how they measure success in the first ninety days. If the answer is only traffic, keep looking.",
        },
      ],
    },
  ] satisfies CalicapAboutParagraph[],
} as const;
