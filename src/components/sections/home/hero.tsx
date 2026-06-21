import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { AmbientVideo } from "@/components/media/ambient-video";
import { Play } from "@/components/ui/icons";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-44">
      <Container>
        <Reveal>
          <p className="eyebrow">
            {site.role} — {site.location}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-[18ch] text-display text-balance">
            I design &amp; ship beautiful, AI-native products that move the
            metrics that matter.
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-end">
          <Reveal delay={0.1}>
            <p className="max-w-[46ch] text-body text-ink-2">
              I’m Jonny — a designer-founder who fuses world-class craft (AKQA:
              Rolls-Royce, Nike, Hermès) with founder-grade speed. I don’t advise
              on AI from the sidelines — I build and operate an AI-native venture
              ecosystem.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <Button href="/work-with-me" size="lg" withArrow>
                Work with me
              </Button>
              <Button href="/work" size="lg" variant="secondary">
                See the work
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      <Container className="mt-16 md:mt-24">
        <Reveal>
          <div className="relative">
            <AmbientVideo
              className="aspect-[16/11] w-full rounded-card sm:aspect-[2/1] lg:aspect-[2.4/1]"
              overlay
            />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-pill bg-canvas/85 px-4 py-2 text-small text-ink backdrop-blur md:left-6 md:top-6">
              <Play className="size-3.5" />
              A day in the life
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
