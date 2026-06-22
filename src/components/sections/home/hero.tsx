import { RotatingWords } from "@/components/motion/rotating-words";
import { Reveal } from "@/components/motion/reveal";
import { HoverRoll } from "@/components/motion/hover-roll";
import { SiteMenu } from "@/components/site/site-menu";
import { AnimatedBackground } from "@/components/visual/animated-background";
import { site } from "@/lib/site";

// The cycling audience in "to ___".
const AUDIENCE = ["CEOs", "founders", "scaleups", "SaaS"];

// Headline type — PP Eiko caps (font-display), 75% of the h1 scale.
const VP_TYPE =
  "font-display text-[clamp(1.875rem,4.5vw,4.125rem)] uppercase leading-[1.04] tracking-[-0.025em] text-ink";

/**
 * Hero — value proposition in two beats over the ambient field.
 *   • main (top-left, on the light part → crisp): "I bring clarity / to ⟨audience⟩"
 *   • secondary (lower-right, aligned to the "Lisbon, Portugal" key-line column,
 *     in the darker zone → emerging from the murk): "in the AI era" (static, all blue)
 */
export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      <AnimatedBackground />

      {/* top key-line — a bounded band */}
      <div className="border-y border-ink/15">
        <div className="grid grid-cols-2 items-center gap-x-4 gap-y-1 px-6 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-ink/55 sm:px-10 md:grid-cols-4 lg:px-16">
          <HoverRoll text={site.name} className="text-ink/80" />
          <span className="hidden md:block">{site.role}</span>
          <span className="hidden sm:block">{site.location}</span>
          <SiteMenu />
        </div>
      </div>

      {/* value proposition */}
      <div className="flex flex-1 flex-col justify-between gap-12 py-16 md:py-20">
        {/* main — top */}
        <Reveal className="px-6 sm:px-10 lg:px-16">
          <h1 className={VP_TYPE}>
            <span className="block">I bring clarity</span>
            <span className="block">
              to{" "}
              <RotatingWords
                words={AUDIENCE}
                className="text-accent"
                startDelay={900}
                interval={2400}
              />
            </span>
          </h1>
        </Reveal>

        {/* secondary — lower-right, aligned to the Lisbon column */}
        <div className="grid grid-cols-2 px-6 sm:px-10 md:grid-cols-4 lg:px-16">
          <Reveal className="col-span-2 md:col-span-2 md:col-start-3">
            <h2 className={VP_TYPE}>in the AI era</h2>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
