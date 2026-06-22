import { RotatingWords } from "@/components/motion/rotating-words";
import { Reveal } from "@/components/motion/reveal";
import { HoverRoll } from "@/components/motion/hover-roll";
import { site } from "@/lib/site";

// Cycling words.
const AUDIENCE = ["CEOs", "founders", "scaleups", "SaaS"];
const ERA = ["era", "noise", "conundrum"];

// Value-proposition type — 75% of the h1 scale.
const VP_TYPE =
  "text-[clamp(1.875rem,4.5vw,4.125rem)] uppercase leading-[1.04] tracking-[-0.025em] text-ink";

/**
 * Hero — one screen, two beats:
 *   • main:      "I bring clarity to ⟨CEOs·founders·scaleups·SaaS⟩"  (left)
 *   • secondary: "in the AI ⟨era·noise·conundrum⟩"  (lower-right, smaller)
 */
export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col">
      {/* top key-line */}
      <div className="border-t border-ink/15">
        <div className="grid grid-cols-2 items-center gap-x-4 gap-y-1 px-6 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-ink/55 sm:px-10 md:grid-cols-4 lg:px-16">
          <HoverRoll text={site.name} className="text-ink/80" />
          <span className="hidden md:block">{site.role}</span>
          <span className="hidden sm:block">{site.location}</span>
          <HoverRoll
            text="Menu"
            className="cursor-pointer justify-self-end text-ink/80"
          />
        </div>
      </div>

      {/* first screen — main (left) + secondary (lower-right) */}
      <div className="relative flex flex-1 flex-col justify-center gap-12 px-6 py-20 sm:px-10 md:gap-0 lg:px-16">
        <Reveal>
          <h1 className={VP_TYPE}>
            <span className="block">I bring clarity to</span>
            <span className="block">
              <RotatingWords
                words={AUDIENCE}
                className="text-accent"
                startDelay={900}
                interval={2400}
              />
            </span>
          </h1>
        </Reveal>

        <Reveal className="md:absolute md:right-10 md:bottom-16 lg:right-16 lg:bottom-20">
          <h2 className="text-[clamp(1.25rem,2.5vw,2rem)] uppercase leading-[1.1] tracking-[-0.02em] text-ink/80">
            <span className="block">in the AI</span>
            <span className="block">
              <RotatingWords
                words={ERA}
                className="text-accent"
                startDelay={1200}
                interval={2800}
              />
            </span>
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
