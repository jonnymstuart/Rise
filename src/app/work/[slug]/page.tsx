import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AmbientVideo } from "@/components/media/ambient-video";
import { Reveal } from "@/components/motion/reveal";
import { work, getWork } from "@/lib/work";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return {};
  return {
    title: `${item.client} — Work`,
    description: item.title,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  const idx = work.findIndex((w) => w.slug === slug);
  const next = work[(idx + 1) % work.length];

  return (
    <article className="pt-32 md:pt-44">
      <Container>
        <Reveal>
          <Link href="/work" className="text-small text-muted hover:text-ink">
            ← All work
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="eyebrow mt-8">
            {item.category}
            {item.year ? ` · ${item.year}` : ""}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 max-w-[20ch] text-h1 text-balance">
            {item.title}
          </h1>
        </Reveal>
        {item.metric && (
          <Reveal delay={0.15}>
            <p className="mt-6 inline-flex rounded-pill border border-line px-4 py-1.5 text-ink-2">
              {item.metric}
            </p>
          </Reveal>
        )}
      </Container>

      <Container className="mt-12 md:mt-16">
        <Reveal>
          <AmbientVideo
            className="aspect-[16/10] w-full rounded-card md:aspect-[2/1]"
            overlay
          />
        </Reveal>
      </Container>

      <Container className="mt-16 md:mt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <dl className="space-y-6">
                <div>
                  <dt className="eyebrow">Client</dt>
                  <dd className="mt-2 text-body">{item.client}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Discipline</dt>
                  <dd className="mt-2 text-body">{item.category}</dd>
                </div>
                {item.year && (
                  <div>
                    <dt className="eyebrow">Year</dt>
                    <dd className="mt-2 text-body">{item.year}</dd>
                  </div>
                )}
              </dl>
            </Reveal>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <Reveal>
              <div className="space-y-10 text-body text-ink-2">
                <div>
                  <h2 className="text-h3 text-ink">The brief</h2>
                  <p className="mt-4">
                    [Placeholder] Context for {item.client} — the problem, the
                    stakes, and why speed and craft both had to be present.
                  </p>
                </div>
                <div>
                  <h2 className="text-h3 text-ink">The work</h2>
                  <p className="mt-4">
                    [Placeholder] How I approached it — strategy, design and an
                    AI-native build — and the decisions that shaped the outcome.
                  </p>
                </div>
                <div>
                  <h2 className="text-h3 text-ink">The outcome</h2>
                  <p className="mt-4">
                    [Placeholder] {item.metric ? `${item.metric}. ` : ""}What
                    shipped, and what it unlocked for the team.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      <Container className="mt-24 md:mt-32">
        <div className="flex items-center justify-between gap-6 border-t border-line pt-12">
          <div>
            <p className="eyebrow">Next</p>
            <Link
              href={`/work/${next.slug}`}
              className="mt-2 block text-h3 hover:text-accent"
            >
              {next.client}
            </Link>
          </div>
          <Button href={`/work/${next.slug}`} variant="secondary" withArrow>
            View
          </Button>
        </div>
      </Container>
    </article>
  );
}
