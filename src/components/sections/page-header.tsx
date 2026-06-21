import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="pt-32 md:pt-44">
      <Container>
        {eyebrow && (
          <Reveal>
            <p className="eyebrow mb-6">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="max-w-[20ch] text-h1 text-balance">{title}</h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[58ch] text-body text-ink-2">{intro}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
