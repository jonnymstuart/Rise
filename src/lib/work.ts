export type WorkSize = "lg" | "md" | "sm";

export type WorkItem = {
  slug: string;
  client: string;
  title: string;
  category: string;
  metric?: string;
  year?: string;
  size: WorkSize;
  /** Optional video/poster for the tile (drop real footage in later). */
  video?: string;
  poster?: string;
};

/**
 * Selected work — a mix of AKQA luxury craft, founder/operator proof, and
 * recent AI builds. Placeholder facts marked for swap as Jonny confirms NDAs,
 * dates and metrics.
 */
export const work: WorkItem[] = [
  {
    slug: "giantos-onboarding",
    client: "GiantOS",
    title: "Reimagining fintech onboarding for a Swiss VC community",
    category: "AI Product · Design & Build",
    metric: "+23% onboarding completion",
    year: "2024",
    size: "lg",
  },
  {
    slug: "rolls-royce-akqa",
    client: "Rolls-Royce — AKQA",
    title: "Luxury digital craft for the world’s most exacting brand",
    category: "Design Leadership",
    year: "2019",
    size: "md",
  },
  {
    slug: "adelong-station-f",
    client: "Adelong",
    title: "A 0→1 venture, built and launched at Station F",
    category: "Founder · Product",
    metric: "Backed & launched",
    year: "2021",
    size: "md",
  },
  {
    slug: "crypto-mvp",
    client: "Web3 / Crypto",
    title: "From whitepaper to a shipped product in weeks",
    category: "AI MVP · 0→1",
    metric: "Shipped in 6 weeks",
    year: "2023",
    size: "md",
  },
  {
    slug: "nike-akqa",
    client: "Nike — AKQA",
    title: "Story-driven brand experiences at global scale",
    category: "Design",
    year: "2018",
    size: "sm",
  },
  {
    slug: "hermes-paris-akqa",
    client: "Hermès Paris — AKQA",
    title: "Considered, tactile digital for a maison",
    category: "Design",
    year: "2017",
    size: "sm",
  },
];

export const featuredWork = work.slice(0, 4);

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug);
}
