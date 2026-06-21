import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { ventures } from "@/lib/site";

export function Ecosystem() {
  return (
    <section id="ecosystem" className="mt-28 md:mt-40">
      <Container>
        <Reveal>
          <p className="eyebrow mb-8">The ecosystem</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-[24ch] text-h2 text-balance">
            I don’t just consult on AI — I build and operate an ecosystem of
            AI-native ventures.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
          {ventures.map((v, i) => (
            <Reveal key={v.name} delay={(i % 2) * 0.05}>
              <a
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-start justify-between gap-6 bg-canvas p-8 transition-colors hover:bg-surface md:p-10"
              >
                <div>
                  <h3 className="text-h3">{v.name}</h3>
                  <p className="mt-2 text-ink-2">{v.role}</p>
                </div>
                <ArrowUpRight className="size-6 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
