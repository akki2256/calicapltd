import {
  Boxes,
  Clock,
  EyeOff,
  FastForward,
  Gauge,
  LightbulbOff,
  RefreshCw,
  UserMinus,
  type LucideIcon,
} from "lucide-react";
import { siteImages } from "@/lib/site-images";

export const ABOUT_THE_APPROACH_ID = "the-approach";
export const ABOUT_OBSERVATION_ID = "observation";
export const ABOUT_RESPONSE_ID = "response";

export const calicapAbout = {
  missionEyebrow: "Our Mission",
  missionTitle: "Convert Ideas Into Technology.",
  missionEmphasize: ["Ideas", "Technology"] as const,
  observation: {
    eyebrow: "The Observation",
    emphasize: [
      "unnoticed",
      "gaps",
      "go",
      "opportunity",
      "outdated",
      "expected",
      "to",
      "software",
      "itself",
      "could",
      "become",
      "smaller",
      "adapt",
    ] as const,
    paragraphs: [
      "Business owners were often focused on the decisions that mattered most — growth, customers, people, finances, and the next stage of the business. As a result, smaller gaps in day-to-day processes could easily go unnoticed. Individually, these problems may not have seemed significant. Over time, however, they could affect how a business operated, served its customers, managed resources, and made decisions.",
    ] as const,
    listIntro: "We saw businesses dealing with things like:",
    gaps: [
      { label: "Low customer retention", icon: UserMinus },
      { label: "Underused or poorly managed resources", icon: Boxes },
      { label: "Inefficient operations", icon: Gauge },
      { label: "Excessive manual and repetitive work", icon: RefreshCw },
      { label: "Poor inventory and information visibility", icon: EyeOff },
      { label: "Delayed decision-making", icon: Clock },
      { label: "Ideas too complex or costly to implement", icon: LightbulbOff },
      { label: "Systems lagging behind technology", icon: FastForward },
    ] as const satisfies readonly {
      label: string;
      icon: LucideIcon;
    }[],
    secondaryIntro: "And there was another problem we kept seeing:",
    secondaryParagraphs: [
      "Businesses were expected to adapt their processes around the software, while the software itself could become outdated as the business changed.",
    ] as const,
    close: "That's where we saw an opportunity.",
  },
  response: {
    eyebrow: "The Response",
    emphasize: [
      "understanding",
      "differently",
      "meaningful",
      "difference",
      "ideas",
      "multiple",
      "grows",
      "long-term",
      "create",
      "solutions",
      "close",
      "gaps",
      "technology",
      "partner",
      "evolves",
    ] as const,
    paragraphs: [
      "Every business works differently. So before thinking about technology, we start by understanding how the business actually works. We look at the problems that occur most often, the gaps that have been overlooked, and the ideas that could make a meaningful difference — even when they don't fit neatly into a conventional software solution.",
      "The goal isn't simply to add another system or automate a single task. It's to create solutions that close multiple gaps, make better use of existing resources, reduce unnecessary work, and continue to provide value as the business grows.",
      "We strive to be a long-term technology partner as your business evolves.",
    ] as const,
  },
  theApproach: {
    eyebrow: "The Approach",
    emphasize: ["three","phases"] as const,
    lead:
      "Rather than following a conventional IT Solutions delivery process, we work through three phases so that we understand the problem properly, challenge conventional approaches, and build solutions around the way the business actually operates.",
  },
  eyebrow: "About",
  title: "We understand before we create.",
  titleEmphasize: ["understand", "create"] as const,
  lead:
    "Good technology starts with understanding: what needs to change, why it matters, how things work today, and where they need to go. With 10+ years of experience across consulting, development, automation, and integrations, the team at Calicon brings practical experience to every project. Whether it's a major business challenge or a smaller problem that could have a bigger impact when solved. Our solutions are tailored to the specifics of your business, with a focus on getting things done efficiently and getting them right.",
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
} as const;
