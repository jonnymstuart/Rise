import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

const stats = [
  { value: "15+", label: "years designing & building" },
  { value: "20+", label: "products shipped 0→1" },
  { value: "AKQA", label: "luxury brand pedigree" },
  { value: "4", label: "ventures built & operated" },
];

export function Statement() {
  return (
    <section className="mt-28 md:mt-40">
      <Container>
        <Reveal>
          <p className="eyebrow mb-8">The short version</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-[22ch] text-h2 text-balance">
            Most teams can build with AI now. Few can make something people love
            — and that compounds.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[60ch] text-body text-ink-2">
            That gap — between shipped and exceptional — is where I work. I bring
            world-class design judgement, founder instinct, and an AI-native way
            of building to a small number of partners who care as much as I do.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-line pt-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <p className="text-h2">{s.value}</p>
              <p className="mt-3 text-small text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
