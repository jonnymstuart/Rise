import Link from "next/link";
import { ScrambleText } from "@/components/motion/scramble-text";
import { site } from "@/lib/site";

type Segment = { text: string; href?: string };

// One sentence. The key words are doorways. Edit copy + links here.
const LINE: Segment[] = [
  { text: "I bring " },
  { text: "clarity", href: "/about" },
  { text: ", " },
  { text: "craft", href: "/work" },
  { text: " and " },
  { text: "results", href: "/work-with-me" },
  { text: " to design‑led businesses." },
];

// Pre-compute a left-to-right decode delay (ms) for each segment so the whole
// line resolves as one continuous wave.
const PARTS = (() => {
  let cursor = 0;
  return LINE.map((seg) => {
    const delay = cursor * 26;
    cursor += seg.text.length;
    return { ...seg, delay };
  });
})();

/**
 * Hero — one editorial first screen, one sentence.
 * A lo-fi bit-mapped gradient drifts behind hairline key-lines and small-caps
 * labels; the line decodes into place, and its key words are links into the
 * depth. Says everything, repeats nothing.
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

      {/* the one line */}
      <div className="flex flex-1 items-center px-6 py-20 sm:px-10 lg:px-16">
        <h1 className="max-w-[22ch] text-h1 leading-[1.06] text-ink">
          {PARTS.map((seg, i) =>
            seg.href ? (
              <Link
                key={i}
                href={seg.href}
                className="text-accent underline decoration-accent/40 decoration-2 underline-offset-[0.12em] transition-colors hover:decoration-accent"
              >
                <ScrambleText text={seg.text} delay={seg.delay} duration={420} />
              </Link>
            ) : (
              <ScrambleText
                key={i}
                text={seg.text}
                delay={seg.delay}
                duration={420}
              />
            ),
          )}
        </h1>
      </div>

      {/* bottom key-line */}
      <div className="border-t border-ink/15">
        <div className="flex items-center justify-between px-6 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-ink/55 sm:px-10 lg:px-16">
          <span>Open to select partners</span>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-ink"
          >
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
