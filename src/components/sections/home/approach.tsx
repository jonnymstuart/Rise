import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

const items = [
  {
    n: "01",
    title: "AI product strategy & 0→1",
    body: "From a fuzzy idea to a sharp, shippable plan — and the product to back it. Clarity first, velocity always.",
  },
  {
    n: "02",
    title: "Design that sells",
    body: "World-class craft that earns trust and converts. Beauty with a job to do — never decoration.",
  },
  {
    n: "03",
    title: "Fractional product & design leadership",
    body: "Embedded, founder-grade direction for teams building AI products. Senior hands, no junior hand-offs.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="mt-28 md:mt-40">
      <Container>
        <Reveal>
          <p className="eyebrow mb-8">How I help</p>
        </Reveal>
        <div className="grid gap-12 border-t border-line pt-12 md:grid-cols-3 md:gap-8">
          {items.map((it, i) => (
            <Reveal key={it.n} delay={i * 0.06}>
              <p className="text-small text-muted">{it.n}</p>
              <h3 className="mt-4 text-h3">{it.title}</h3>
              <p className="mt-4 max-w-[40ch] text-ink-2">{it.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
