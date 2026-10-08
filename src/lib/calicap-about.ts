import {
  Compass,
  ListChecks,
  Rocket,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { siteImages } from "@/lib/site-images";

export const ABOUT_APPROACH_ID = "approach";

export const calicapAbout = {
  missionEyebrow: "Our Mission",
  missionTitle: "Convert Ideas Into Technology.",
  missionEmphasize: ["Ideas", "Technology"] as const,
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
  approachEyebrow: "Approach",
  approachBody:
    "Goals, workflows, and direction come first — then the approach that fits",
  approachPrinciples: [
    {
      label: "Understand",
      value: "Goals, problems, workflows, and future direction — before deciding what to build.",
      icon: Compass,
    },
    {
      label: "Find the right approach",
      value: "Use existing technology where it makes sense. Build custom where it creates real value.",
      icon: ListChecks,
    },
    {
      label: "Build around the real need",
      value: "Technology should fit the way things actually work.",
      icon: Workflow,
    },
    {
      label: "Move & evolve",
      value: "Start with what matters, move efficiently, and adapt as needs change.",
      icon: Rocket,
    },
  ] as const satisfies readonly {
    label: string;
    value: string;
    icon: LucideIcon;
  }[],
} as const;
