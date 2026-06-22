/**
 * Central site configuration — copy, nav, contact and ventures.
 * Placeholder values are marked TODO and can be swapped without touching components.
 */
export const site = {
  name: "Jonny Stuart",
  role: "Fractional CAO/CPO",
  url: "https://www.jonnystuart.com",
  email: "jonny@userise.co",
  location: "Lisbon, Portugal",
  tagline: "I design and ship beautiful, revenue-generating AI products.",
  description:
    "AI Product & Design Partner to founders and CEOs. I fuse world-class design (AKQA: Rolls-Royce, Nike, Hermès) with founder-grade speed to design and ship AI products that move the metrics that matter.",
  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Work with me", href: "/work-with-me" },
    { label: "Contact", href: "/contact" },
  ],
  socials: [
    { label: "LinkedIn", href: "#" }, // TODO
    { label: "X", href: "#" }, // TODO
  ],
} as const;

/** The venture ecosystem Jonny builds & operates — cross-linked, kept distinct. */
export const ventures = [
  {
    name: "Rise",
    role: "AI-native product & design studio",
    href: "https://risewithus.co", // TODO confirm
  },
  {
    name: "AgencyFlo",
    role: "AI operating system for agencies",
    href: "#", // TODO
  },
  {
    name: "Signal",
    role: "Community for AI-era builders",
    href: "#", // TODO
  },
  {
    name: "Resonate",
    role: "Brand & resonance studio",
    href: "#", // TODO
  },
] as const;
