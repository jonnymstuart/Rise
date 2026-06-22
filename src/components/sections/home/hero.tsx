import { RotatingWords } from "@/components/motion/rotating-words";
import { Reveal } from "@/components/motion/reveal";
import { HoverRoll } from "@/components/motion/hover-roll";
import { site } from "@/lib/site";

// The word that changes in "enabling ___".
const ENABLING = ["CEOs", "founders", "scaleups", "SaaS"];

// Value-proposition type — 75% of the h1 scale.
const VP_TYPE =
  "text-[clamp(1.875rem,4.5vw,4.125rem)] uppercase leading-[1.04] tracking-[-0.025em] text-ink";

/**
 * Hero — the value proposition in two beats:
 *   1. "Fractional CAO/CPO enabling ⟨CEOs·founders·scaleups·SaaS⟩"  — first screen
 *   2. "To navigate the AI Era"  — revealed on a slight scroll
 */
export function Hero() {
  return (
    <>
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

        {/* VP — beat one */}
        <div className="flex flex-1 items-center px-6 py-20 sm:px-10 lg:px-16">
          <Reveal>
            <h1 className={VP_TYPE}>
              <span className="block">Fractional CAO/CPO</span>
              <span className="block">
                enabling{" "}
                <RotatingWords
                  words={ENABLING}
                  className="text-accent"
                  startDelay={900}
                  interval={2400}
                />
              </span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* VP — beat two, revealed on a slight scroll */}
      <section className="px-6 pb-32 pt-[12vh] sm:px-10 lg:px-16">
        <Reveal>
          <h2 className={VP_TYPE}>To navigate the AI Era</h2>
        </Reveal>
      </section>
    </>
  );
}
