/**
 * PLACEHOLDER TESTIMONIALS — replace quote/name/role/company with real approved text.
 * Do not treat these as published client endorsements until swapped.
 */
export type CalicapTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Optional link to related case study */
  projectSlug?: string;
  theme: "understanding" | "delivery" | "problem-solving" | "business-impact";
};

export const calicapTestimonialsSection = {
  title: "What clients say",
  intro: "Feedback from people we've built with.",
} as const;

export const calicapTestimonials: CalicapTestimonial[] = [
  {
    id: "t1",
    quote:
      "They took time to understand how our operations actually ran before proposing anything. The CRM felt built around our process, not the other way around.",
    name: "Placeholder Name",
    role: "Operations lead",
    company: "Calicap India",
    projectSlug: "calicap-india",
    theme: "understanding",
  },
  {
    id: "t2",
    quote:
      "Clear scope, steady communication, and delivery we could put in front of the team. They solved the messy parts without making the project larger than it needed to be.",
    name: "Placeholder Name",
    role: "Founder",
    company: "Yog Mantram",
    projectSlug: "yog-mantram",
    theme: "delivery",
  },
  {
    id: "t3",
    quote:
      "We didn't arrive with a perfect brief. They helped us define the problem, built what mattered, and left us with something the business could keep improving.",
    name: "Placeholder Name",
    role: "Director",
    company: "Confidential client",
    theme: "problem-solving",
  },
] as const;
