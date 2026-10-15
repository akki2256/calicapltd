/**
 * PLACEHOLDER TESTIMONIALS — replace quote/name/role/company with real approved text.
 * Do not treat these as published client endorsements until swapped.
 * Company names pulled from the work section for dummy cards.
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
  /** Keep false until the quote is approved by the client */
  published: boolean;
};

export const HOME_TESTIMONIALS_ID = "testimonials";

export const calicapTestimonialsSection = {
  eyebrow: "Testimonials",
  title: "Trusted by the businesses we work with.",
  /** Canvas stacked headline */
  titleLines: ["Trusted by the", "businesses we work with."] as const,
  titleEmphasize: ["Trusted", "businesses"] as const,
  intro: "Feedback from people we've built with.",
} as const;

export const calicapTestimonials: CalicapTestimonial[] = [
  {
    id: "t1",
    quote:
      "They took time to understand how our operations actually ran before proposing anything. The CRM felt built around our process, not the other way around.",
    name: "Mr. Varun Goyal",
    role: "Chairman",
    company: "Calicap India Pvt. Ltd.",
    projectSlug: "calicap-india",
    theme: "understanding",
    published: false,
  },
  {
    id: "t2",
    quote:
      "Clear scope, steady communication, and delivery we could put in front of the team. They solved the messy parts without making the project larger than it needed to be.",
    name: "Mr. Shantanu Aggarwal",
    role: "Founder",
    company: "Yog Mantram",
    projectSlug: "yog-mantram",
    theme: "delivery",
    published: false,
  },
  {
    id: "t3",
    quote:
      "The site finally matches the quality of our built work. Enquiries feel warmer, and the portfolio reads like the practice — not a template.",
    name: "Ar. Khyati Chaubey",
    role: "Project Manager",
    company: "Amazing Art Architects",
    projectSlug: "amazing-art-architects",
    theme: "business-impact",
    published: false,
  },
  {
    id: "t4",
    quote:
      "We needed a credible digital front door and tighter grip on inventory. They shipped both without turning a three-week brief into a six-month programme.",
    name: "Mr. Krishna Shrivastav",
    role: "Founder",
    company: "Chaitanya Computers",
    projectSlug: "chaitanya-computers",
    theme: "delivery",
    published: false,
  },
  {
    id: "t5",
    quote:
      "Patient follow-ups used to live in notebooks and chat threads. The MIS gave us one place from enrollment to guidance — and the team actually uses it.",
    name: "Mr. Ratan",
    role: "Project Manager",
    company: "LungConnect India Foundation",
    projectSlug: "lungconnect-india",
    theme: "problem-solving",
    published: false,
  },
];

export function getPublishedTestimonials() {
  return calicapTestimonials.filter((item) => item.published);
}

/** Home: show approved quotes when available; otherwise placeholder set. */
export function getHomeTestimonials() {
  const published = getPublishedTestimonials();
  return published.length > 0 ? published : calicapTestimonials;
}
