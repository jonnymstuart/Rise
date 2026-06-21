import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function HomeCta() {
  return (
    <section className="mt-28 md:mt-40">
      <Container>
        <Reveal>
          <div className="bg-brand-gradient relative overflow-hidden rounded-card px-8 py-20 text-center md:px-12 md:py-32">
            <h2 className="mx-auto max-w-[18ch] text-h1 text-balance text-white">
              Have something only the best should touch?
            </h2>
            <p className="mx-auto mt-6 max-w-[42ch] text-body text-white/80">
              I take on a small number of partners at a time. If that sounds like
              you, let’s talk.
            </p>
            <div className="mt-10 flex justify-center">
              <Button
                href="/work-with-me"
                size="lg"
                withArrow
                className="bg-white text-ink hover:bg-white/90"
              >
                Start a conversation
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
