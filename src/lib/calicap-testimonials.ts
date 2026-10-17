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
  /** Short label for the voice selector (Canvas) */
  voiceLabel: string;
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
  intro: "Feedback from people we've built with.",
  /** Canvas-only framing */
  canvasEyebrow: "From the work",
  titleLines: ["What clients say", "about the build."] as const,
  titleEmphasize: ["clients", "build"] as const,
  canvasIntro:
    "Each voice is tied to a shipped engagement — not a generic review strip.",
} as const;

export const calicapTestimonials: CalicapTestimonial[] = [
  {
    id: "t1",
    quote:
      "They mapped our loan stages before writing a line of product. The CRM follows how we already close deals — pipeline, handoffs, and settlement in one place — instead of forcing us into someone else's template.",
    name: "Mr. Varun Goyal",
    role: "Chairman",
    company: "Calicap India Pvt. Ltd.",
    voiceLabel: "Calicap",
    projectSlug: "calicap-india",
    theme: "understanding",
    published: false,
  },
  {
    id: "t2",
    quote:
      "We needed a studio site that could convert seekers in Bareilly — not a brochure. Clear scope, 25+ program pages, WhatsApp enquire, and a launch we could put in front of students without a six-month delay.",
    name: "Mr. Shantanu Aggarwal",
    role: "Founder",
    company: "Yog Mantram",
    voiceLabel: "Yog Mantram",
    projectSlug: "yog-mantram",
    theme: "delivery",
    published: false,
  },
  {
    id: "t3",
    quote:
      "The site finally reads like the practice. Portfolio, process, and enquiry path feel like Amazing Art — not a theme with our logo dropped in. Enquiries come warmer because the work is visible.",
    name: "Ar. Khyati Chaubey",
    role: "Project Manager",
    company: "Amazing Art Architects",
    voiceLabel: "Amazing Art",
    projectSlug: "amazing-art-architects",
    theme: "business-impact",
    published: false,
  },
  {
    id: "t4",
    quote:
      "Three weeks: a live front door with Nexi for visitor questions, and a customized inventory and sales system for the floor. Presence and ops shipped together — the brief stayed a brief.",
    name: "Mr. Krishna Shrivastav",
    role: "Founder",
    company: "Chaitanya Computers",
    voiceLabel: "Chaitanya",
    projectSlug: "chaitanya-computers",
    theme: "delivery",
    published: false,
  },
  {
    id: "t5",
    quote:
      "Enrollment, follow-ups, and guidance history used to live in notebooks and chat. The MIS put patient care operations in one record — and the navigators actually run the day from it.",
    name: "Mr. Ratan",
    role: "Project Manager",
    company: "LungConnect India Foundation",
    voiceLabel: "LungConnect",
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
