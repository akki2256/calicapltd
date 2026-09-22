/**
 * Photography from Unsplash (https://unsplash.com/license).
 * Attribution to photographers is welcome; replace with your own assets anytime.
 */
export const siteImages = {
  heroWorkspace: {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85",
    alt: "Laptop on desk with programming workspace",
  },
  analyticsDashboard: {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
    alt: "Analytics dashboard and charts on a laptop screen",
  },
  mobileHands: {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=85",
    alt: "Hands holding a smartphone",
  },
  teamCollaboration: {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
    alt: "Team collaborating around a table with laptops",
  },
  cloudNetwork: {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85",
    alt: "Abstract technology and network visualization",
  },
  modernOffice: {
    src: "https://images.unsplash.com/photo-1497366216548-375260702997?auto=format&fit=crop&w=1200&q=85",
    alt: "Bright open-plan office with large windows",
  },
  retailStore: {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85",
    alt: "Retail clothing store interior with warm lighting",
  },
  productLaunch: {
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    alt: "Team collaborating at laptops in a bright modern workspace",
  },
  strategySession: {
    src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=85",
    alt: "Planning session with notes and sticky walls",
  },
  calicapIndiaCrm: {
    src: "/images/case-studies/crm-dashboard.png",
    alt: "Calicap India CRM dashboard with sensitive details redacted",
  },
  yogMantramStudio: {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=85",
    alt: "Yoga practice in a calm studio interior — placeholder until Yog Mantram site captures are added",
  },
  amazingArtHero: {
    src: "/images/case-studies/amazing-art-hero.jpg",
    alt: "Amazing Art Architects homepage — brand wordmark over an architectural line drawing",
  },
  amazingArtPortfolio: {
    src: "/images/case-studies/amazing-art-portfolio.jpg",
    alt: "Amazing Art Architects portfolio grid — day and night residential architecture renders",
  },
} as const;

export type SiteImageKey = keyof typeof siteImages;
