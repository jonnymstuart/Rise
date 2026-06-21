import { Container } from "@/components/ui/container";

const logos = [
  "AKQA",
  "Rolls-Royce",
  "Nike",
  "Hermès Paris",
  "Montblanc",
  "Station F",
  "Daimler",
];

export function Marquee() {
  return (
    <section className="mt-28 border-y border-line py-10 md:mt-40">
      <Container>
        <p className="eyebrow mb-8">
          Built for global brands &amp; venture-backed founders
        </p>
      </Container>
      <div className="marquee" aria-hidden>
        <div className="marquee__track">
          {[...logos, ...logos].map((logo, i) => (
            <span
              key={i}
              className="whitespace-nowrap px-8 text-h3 text-ink/55"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
