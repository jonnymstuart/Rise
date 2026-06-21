import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { WorkGrid } from "@/components/sections/work-grid";
import { featuredWork } from "@/lib/work";

export function SelectedWork() {
  return (
    <section id="work" className="mt-28 md:mt-40">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <div>
              <p className="eyebrow mb-4">Selected work</p>
              <h2 className="max-w-[16ch] text-h2">Proof, not promises.</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="hidden md:block">
              <Button href="/work" variant="secondary" withArrow>
                All work
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="mt-14">
          <WorkGrid items={featuredWork} />
        </div>

        <div className="mt-12 md:hidden">
          <Button href="/work" variant="secondary" withArrow>
            All work
          </Button>
        </div>
      </Container>
    </section>
  );
}
