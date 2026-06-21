export type LandingPage = {
  slug: string;
  /** Whether search engines may index this page (some are outreach-only). */
  index: boolean;
  kind: "sector" | "skill";
  eyebrow: string;
  title: string;
  intro: string;
  pains: string[];
  offer: string;
  outcomes: string[];
  faqs: { q: string; a: string }[];
};

/**
 * "Almost-hidden" outreach + AEO landing pages. Unlinked from the main nav,
 * each one names the exact outcome a buyer wants. Data-driven so new pages
 * are cheap to add. Per-page `index` flag controls search visibility.
 */
export const landingPages: LandingPage[] = [
  {
    slug: "crypto",
    index: true,
    kind: "sector",
    eyebrow: "For crypto & web3 teams",
    title: "Crypto products people actually trust — designed and shipped.",
    intro:
      "Web3 moves fast and mostly looks the same. I help crypto teams stand out with credible, beautiful product design and AI-native builds — from whitepaper to shipped.",
    pains: [
      "Your product looks like every other protocol.",
      "Great tech, but onboarding loses people.",
      "You need to ship fast without cutting craft.",
      "Design talent that genuinely gets crypto is scarce.",
    ],
    offer:
      "I partner with founders to design and build crypto products — brand, UX and front-end — with the speed of an AI-native operator and the craft of an AKQA-trained designer.",
    outcomes: [
      "A distinctive brand & product identity",
      "Onboarding that converts the curious",
      "Shipped front-end, not just Figma",
      "A partner fluent in both design and protocol",
    ],
    faqs: [
      {
        q: "Do you understand crypto, or just design?",
        a: "Both. I’ve shipped web3 products and speak the language of protocols, wallets and tokenomics — while bringing world-class design judgement most crypto teams can’t access.",
      },
      {
        q: "How fast can we ship?",
        a: "AI-native delivery means weeks, not quarters. We align on goals first, then move in fast, transparent sprints.",
      },
    ],
  },
  {
    slug: "ecommerce",
    index: true,
    kind: "sector",
    eyebrow: "For e-commerce brands",
    title: "AI-native commerce experiences that convert and feel premium.",
    intro:
      "I help e-commerce brands design and build the experiences that grow revenue — blending luxury-grade craft with AI to personalise, accelerate and convert.",
    pains: [
      "Your store converts, but doesn’t feel like the brand.",
      "You want AI working for you, not as a gimmick.",
      "Roadmap is full; senior design capacity isn’t.",
      "You need craft and speed — not a trade-off.",
    ],
    offer:
      "From storefront and product experience to AI-powered personalisation and content, I design and ship the things that move conversion and AOV — fast.",
    outcomes: [
      "Higher-converting, on-brand storefronts",
      "AI personalisation that lifts AOV",
      "Faster launch of campaigns & features",
      "Luxury-grade craft, founder-grade speed",
    ],
    faqs: [
      {
        q: "Which platforms do you work with?",
        a: "I’m platform-agnostic and AI-native — Shopify, headless, or custom. The right tool is whatever ships the outcome fastest without compromising craft.",
      },
      {
        q: "Can you prove impact?",
        a: "Yes — we define measurable success up front (conversion, AOV, retention) and track it. I optimise for the metrics that move the business.",
      },
    ],
  },
  {
    slug: "ai-mvp",
    index: true,
    kind: "skill",
    eyebrow: "For founders with an idea",
    title: "Ship your AI MVP in 90 days — beautiful, and built to learn.",
    intro:
      "I take AI ideas from zero to a real, shippable product — fast. Strategy, design and an AI-native build under one roof, so you’re in market and learning in weeks.",
    pains: [
      "You have the idea, not the team to build it.",
      "Agencies are slow; freelancers are fragmented.",
      "You need something real to raise or validate.",
      "It has to be fast — but it can’t look cheap.",
    ],
    offer:
      "As a single, senior partner I design and build your MVP end-to-end — aligning on the smallest thing worth shipping, then shipping it with craft.",
    outcomes: [
      "A live MVP in ~90 days",
      "Design that earns trust from day one",
      "An AI-native build you can grow on",
      "Clear metrics to validate and raise",
    ],
    faqs: [
      {
        q: "What does ‘AI MVP in 90 days’ actually include?",
        a: "Product strategy, end-to-end design, and a working AI-native build of the core experience — scoped to the smallest thing that proves the idea.",
      },
      {
        q: "What happens after launch?",
        a: "We keep iterating against real user data, or I help you stand up the team to take it forward. Either way you’re not left with a prototype and no path.",
      },
    ],
  },
  {
    slug: "fractional-cpo",
    index: true,
    kind: "skill",
    eyebrow: "For teams building AI products",
    title: "Fractional Chief Product Officer for the AI era.",
    intro:
      "Embedded, director-level product and design leadership for teams building AI products — without the cost or wait of a full-time hire.",
    pains: [
      "You need senior product judgement, now.",
      "Your team is strong but missing direction.",
      "AI is reshaping the roadmap and the bar.",
      "A full-time CPO is premature or out of reach.",
    ],
    offer:
      "I plug in as your fractional CPO/CDO — setting product strategy, raising the design bar, and helping your team ship AI products that move the metrics that matter.",
    outcomes: [
      "A sharp, AI-native product strategy",
      "A visibly higher craft bar",
      "Faster, more confident shipping",
      "A team that levels up around you",
    ],
    faqs: [
      {
        q: "How much time do you commit?",
        a: "Flexible — typically a focused day or two a week, embedded in your team’s rhythm. Enough to set direction and keep the bar high.",
      },
      {
        q: "How is this different from advising?",
        a: "I’m hands-on. I build and operate AI products myself — so I lead from inside the work, not from the sidelines.",
      },
    ],
  },
];

export function getLanding(slug: string) {
  return landingPages.find((l) => l.slug === slug);
}
