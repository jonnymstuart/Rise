import { cn } from "@/lib/utils";

type HoverRollProps = {
  text: string;
  className?: string;
  /** per-letter stagger, ms */
  stagger?: number;
};

/**
 * Hover roll — on hover each letter slides up out of a one-line mask while an
 * identical copy rises from beneath into the same spot, staggered into a wave
 * (and reversing on hover-out). Pure CSS, no JS.
 */
export function HoverRoll({ text, className, stagger = 25 }: HoverRollProps) {
  return (
    <span
      aria-label={text}
      className={cn("group/roll inline whitespace-nowrap", className)}
    >
      {[...text].map((ch, i) => {
        const c = ch === " " ? " " : ch;
        const delay = `${i * stagger}ms`;
        return (
          <span
            key={i}
            aria-hidden
            className="relative inline-block overflow-hidden align-bottom leading-none"
          >
            <span
              className="block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/roll:-translate-y-full"
              style={{ transitionDelay: delay }}
            >
              {c}
            </span>
            <span
              className="absolute left-0 top-full block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/roll:-translate-y-full"
              style={{ transitionDelay: delay }}
            >
              {c}
            </span>
          </span>
        );
      })}
    </span>
  );
}
