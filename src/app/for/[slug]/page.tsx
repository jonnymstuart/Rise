import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { landingPages, getLanding } from "@/lib/landing";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return landingPages.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = getLanding(slug);
  if (!l) return {};
  return {
    title: l.title,
    description: l.intro,
    robots: { index: l.index, follow: true },
    alternates: { canonical: `${site.url}/for/${l.slug}` },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = getLanding(slug);
  if (!l) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: l.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {l.faqs.length > 0 && <JsonLd data={faqLd} />}

      <section className="pt-32 md:pt-44">
        <Container>
          <Reveal>
            <p className="eyebrow mb-6">{l.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-[20ch] text-h1 text-balance">{l.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[56ch] text-body text-ink-2">{l.intro}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/work-with-me" size="lg" withArrow>
                Work with me
              </Button>
              <Button href="/work" size="lg" variant="secondary">
                See the work
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="mt-24 md:mt-32">
        <Container>
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="eyebrow">Sound familiar?</p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ul>
                {l.pains.map((p, i) => (
                  <Reveal key={p} delay={(i % 2) * 0.05}>
                    <li className="border-t border-line py-5 text-h4 text-ink">
                      {p}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-24 md:mt-32">
        <Container>
          <Reveal>
            <p className="eyebrow mb-6">How I help</p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-[60ch] text-h3">{l.offer}</p>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-6 md:grid-cols-2">
            {l.outcomes.map((o, i) => (
              <Reveal key={o} delay={(i % 2) * 0.05}>
                <div className="flex gap-3 border-t border-line pt-5">
                  <span className="text-small text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-body text-ink-2">{o}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {l.faqs.length > 0 && (
        <section className="mt-24 md:mt-32">
          <Container>
            <Reveal>
              <p className="eyebrow mb-8">FAQ</p>
            </Reveal>
            <div className="border-y border-line">
              {l.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group border-b border-line py-6 last:border-b-0"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-h4 text-ink">
                    {f.q}
                    <span className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-[60ch] text-body text-ink-2">{f.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="mt-24 md:mt-32">
        <Container>
          <Reveal>
            <div className="rounded-card border border-line bg-surface px-8 py-16 text-center md:py-24">
              <h2 className="mx-auto max-w-[20ch] text-h2 text-balance">
                Let’s build something worth shipping.
              </h2>
              <div className="mt-8 flex justify-center">
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
