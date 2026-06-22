import { RotatingWords } from "@/components/motion/rotating-words";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

// The cycling values. Edit the lists here.
const VALUES = ["clarity", "craft", "results"];
const AUDIENCES = ["ambitious CEOs", "impactful founders", "scaling startups"];

/**
 * Hero — one line, two cycling slots.
 * "I bring ⟨clarity·craft·results⟩ to ⟨founders·CEOs·high-growth businesses⟩".
 * Each slot reserves the width/height of its longest option, so the words
 * cycle without the line ever shifting or re-wrapping.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col">
      {/* top key-line — small-caps details across the full width */}
      <div className="mt-[72px] border-t border-ink/15 md:mt-20">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 px-6 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-ink/55 sm:px-10 md:grid-cols-4 lg:px-16">
          <span className="text-ink/80">{site.name}</span>
          <span className="hidden md:block">{site.role}</span>
          <span className="hidden sm:block">{site.location}</span>
          <span className="text-right md:text-left">Portfolio / &rsquo;26</span>
        </div>
      </div>

      {/* the line — value + audience cycle in fixed-size slots (no reflow) */}
      <div className="flex flex-1 items-center px-6 py-20 sm:px-10 lg:px-16">
        <Reveal>
          <h1 className="max-w-[18ch] text-h1 uppercase leading-[1.04] text-ink">
            <span className="block">
              I bring{" "}
              <RotatingWords
                words={VALUES}
                className="text-accent"
                startDelay={900}
                interval={2400}
              />{" "}
              to
            </span>
            <RotatingWords
              words={AUDIENCES}
              className="block text-accent"
              startDelay={1200}
              interval={3000}
            />
          </h1>
        </Reveal>
      </div>

      {/* bottom key-line — info, mirroring the top nav style */}
      <div className="border-t border-ink/15">
        <div className="grid grid-cols-2 items-center gap-x-4 gap-y-1 px-6 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-ink/55 sm:px-10 md:grid-cols-4 lg:px-16">
          <span className="inline-flex items-center gap-2 text-accent">
            <span className="relative inline-flex size-[0.6em]" aria-hidden>
              <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-full rounded-full bg-accent" />
            </span>
            Open to select partners
          </span>
          <span className="hidden md:block">Made by Rise</span>
          <span className="hidden sm:block">{site.location}</span>
          <span className="text-right md:text-left">&copy; 2026</span>
        </div>
      </div>
    </section>
  );
}
