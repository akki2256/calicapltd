import { BarChart3, Compass, Scale, Target, type LucideIcon } from "lucide-react";
import { siteImages } from "@/lib/site-images";
import { calicapHomeProcess } from "@/lib/calicap-home";

export type CalicapTextBlock =
  | { type: "text"; value: string }
  | { type: "em"; value: string };

export type CalicapAboutParagraph = {
  icon: LucideIcon;
  blocks: CalicapTextBlock[];
};

export const calicapAbout = {
  eyebrow: "About",
  title: "We understand before we build.",
  image: siteImages.teamCollaboration,
  primaryCta: "Talk to us",
  primaryHref: "/contact?mode=know",
  secondaryCta: "Selected work",
  aboutCloseTitle: "Have something you're trying to solve?",
  aboutCloseCta: "Tell us your problem",
  aboutCloseHref: "/contact",
  metaTitle: "About",
  metaDescription:
    "Calicon — technology that starts with understanding. Digital products, custom software, and practical automation.",
  visionTitle: "Vision",
  visionBody:
    "Technology should solve real problems, support real goals, and evolve as needs change. The ambition is to grow from delivering digital solutions into a broader global technology company with its own products and platforms — ambitious, grounded, and useful.",
  philosophyTitle: "How we think",
  philosophyBody:
    "Good technology starts with understanding: what needs to change, why it matters, how things work today, and where they need to go. No rigid packages. Use what's right. Build what's necessary.",
  howWeWorkTitle: "How we work",
  howWeWorkIntro: "Problem → Strategy → Solution → Launch → Growth.",
  howWeWorkSteps: calicapHomeProcess.steps,
  whereTitle: "Where we're going",
  whereBody:
    "Grow from a successful technology services company into a broader global technology company — still delivery-led, still outcome-focused, eventually with proprietary products and platforms. The work comes first; the ambition follows from shipping real things.",
  beliefsTitle: "What we believe",
  beliefs: [
    "Understand before building",
    "Solve the real problem",
    "Use what's right",
    "Build what's necessary",
    "Keep complexity under control",
    "Connect technology to real value",
    "Build relationships, not just projects",
    "Keep evolving",
  ],
  teamTitle: "How we engage",
  paragraphs: [
    {
      icon: Target,
      blocks: [
        {
          type: "text",
          value:
            "Engagements stay lead-senior: you work with the people shipping the work. Stacks businesses actually ship on — ",
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
          value: ", aligned to residency and compliance needs.",
        },
      ],
    },
    {
      icon: Scale,
      blocks: [
        {
          type: "text",
          value:
            "No revolving cast. No unnecessary process. The approach adapts to the project — and we say when something isn't ready to build yet.",
        },
      ],
    },
    {
      icon: BarChart3,
      blocks: [
        {
          type: "text",
          value:
            "The aim is simple: technology that makes work move better — products that ship, systems that fit, and support that continues as priorities change.",
        },
      ],
    },
    {
      icon: Compass,
      blocks: [
        {
          type: "text",
          value:
            "Team information stays minimal on purpose. The work, the philosophy, and how projects actually run should do most of the proving.",
        },
      ],
    },
  ] satisfies CalicapAboutParagraph[],
} as const;
