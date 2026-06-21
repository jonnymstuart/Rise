import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { AmbientVideo } from "@/components/media/ambient-video";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "Designer-founder with AKQA luxury pedigree and 20+ products shipped 0→1. Now building and operating an AI-native venture ecosystem from Lisbon.",
};

const chapters = [
  {
    period: "Central Saint Martins",
    title: "A foundation in craft",
    body: "I studied design at Central Saint Martins — where taste, rigour and concept come before tools. It set a bar I’ve carried into everything since.",
  },
  {
    period: "AKQA",
    title: "World-class, for the world’s best brands",
    body: "At AKQA — the world’s leading creative agency — I led design across London, Paris, Berlin and Amsterdam, for Rolls-Royce, Nike, Hermès Paris and Montblanc. I learned what ‘exceptional’ actually costs, and how to deliver it.",
  },
  {
    period: "Adelong · Station F",
    title: "From agency to founder",
    body: "I moved into startups — leading product in fintech and healthtech, and launching ventures from zero, including building at Station F, the world’s largest startup campus.",
  },
  {
    period: "20+ MVPs",
    title: "Shipping at startup speed",
    body: "Over the last few years I’ve designed and shipped 20+ products 0→1 for founders across Silicon Valley and Europe — learning to move fast without losing the craft.",
  },
  {
    period: "Rise & the ecosystem",
    title: "AI-native, end to end",
    body: "Today I build and operate an AI-native venture ecosystem — Rise (studio), AgencyFlo, Signal and Resonate — from Lisbon. I don’t advise on AI from the outside. I live in it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Designer-founder. AI-native operator."
        intro="I fuse world-class design (AKQA: Rolls-Royce, Nike, Hermès) with founder-grade speed — and I use AI as an operating system for how I think, build and ship. Based in Lisbon, working with founders and CEOs worldwide."
      />

      <section className="mt-14 md:mt-20">
        <Container>
          <Reveal>
            <AmbientVideo
              className="aspect-[16/10] w-full rounded-card md:aspect-[21/9]"
              overlay
            />
          </Reveal>
        </Container>
      </section>

      <section className="mt-24 md:mt-32">
        <Container>
          <div className="grid gap-x-12 gap-y-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="eyebrow">The path</p>
                <h2 className="mt-4 max-w-[14ch] text-h2">
                  Craft, then speed, then both.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <ol className="space-y-12">
                {chapters.map((c, i) => (
                  <Reveal key={c.period} delay={(i % 2) * 0.05}>
                    <li className="border-t border-line pt-6">
                      <p className="eyebrow">{c.period}</p>
                      <h3 className="mt-3 text-h3">{c.title}</h3>
                      <p className="mt-4 max-w-[52ch] text-body text-ink-2">
                        {c.body}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-24 md:mt-32">
        <Container>
          <Reveal>
            <div className="border-t border-line pt-12">
              <h2 className="max-w-[22ch] text-h2 text-balance">
                If you care about the work as much as I do, we’ll get on.
              </h2>
              <div className="mt-8">
                <Button href="/work-with-me" size="lg" withArrow>
                  Work with me
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
