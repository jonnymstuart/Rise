import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ApplicationForm } from "@/components/site/application-form";

export const metadata: Metadata = {
  title: "Work with me",
  description:
    "Partner with an AI Product & Design Partner — fractional CPO/CDO or 0→1 build. Apply to work together.",
};

const included = [
  "Senior, director-led product & design — no junior hand-offs",
  "AI-native build: shipped product, not just decks",
  "Strategy, design and delivery under one roof",
  "Founder-grade speed with world-class craft",
];

const how = [
  { n: "01", t: "Apply", d: "Tell me what you’re building. I read every enquiry personally." },
  { n: "02", t: "Fit call", d: "A short call to see if we’re right for each other." },
  { n: "03", t: "Plan", d: "A sharp first-sprint plan before we kick off." },
  { n: "04", t: "Ship", d: "We build in fast, transparent cycles — like part of your team." },
];

export default function WorkWithMePage() {
  return (
    <>
      <PageHeader
        eyebrow="Work with me"
        title="For founders & CEOs building the exceptional."
        intro="I partner with a small number of teams at a time — as an AI product & design partner, a fractional CPO/CDO, or to take an idea from 0→1. If you care about craft and speed in equal measure, let’s talk."
      />

      <section className="mt-16 md:mt-24">
        <Container>
          <div className="grid gap-x-12 gap-y-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <p className="eyebrow">What you get</p>
                <ul className="mt-6 space-y-4">
                  {included.map((i) => (
                    <li key={i} className="flex gap-3 text-body text-ink-2">
                      <span className="mt-[0.6em] size-1.5 shrink-0 rounded-pill bg-accent" />
                      {i}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal>
                <div className="mt-14">
                  <p className="eyebrow">How it works</p>
                  <ol className="mt-6 space-y-6">
                    {how.map((s) => (
                      <li key={s.n} className="flex gap-5">
                        <span className="text-small text-muted">{s.n}</span>
                        <div>
                          <p className="text-h4 text-ink">{s.t}</p>
                          <p className="mt-1 text-ink-2">{s.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <Reveal>
                <div className="rounded-card border border-line bg-surface p-6 md:p-8">
                  <p className="eyebrow mb-6">Start a conversation</p>
                  <ApplicationForm />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
