import Link from "next/link";
import { AmbientVideo } from "@/components/media/ambient-video";
import { Reveal } from "@/components/motion/reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { WorkItem } from "@/lib/work";

const spanClasses: Record<WorkItem["size"], string> = {
  lg: "md:col-span-8",
  md: "md:col-span-4",
  sm: "md:col-span-4",
};

const aspectClasses: Record<WorkItem["size"], string> = {
  lg: "aspect-[16/10]",
  md: "aspect-[4/5]",
  sm: "aspect-[4/3]",
};

/**
 * STN-style irregular grid — varied tile spans + aspect ratios so the work
 * never reads as a uniform thumbnail wall. Tiles use the ambient brand
 * gradient until real video/poster art is supplied.
 */
export function WorkGrid({
  items,
  className,
}: {
  items: WorkItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-12 md:gap-y-16",
        className,
      )}
    >
      {items.map((item, i) => (
        <Reveal
          key={item.slug}
          delay={(i % 3) * 0.06}
          className={cn("group", spanClasses[item.size])}
        >
          <Link href={`/work/${item.slug}`} className="block">
            <div
              className={cn(
                "relative overflow-hidden rounded-card",
                aspectClasses[item.size],
              )}
            >
              <AmbientVideo
                src={item.video}
                poster={item.poster}
                className="absolute inset-0 h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <div className="absolute right-4 top-4 grid size-10 translate-y-1 place-items-center rounded-pill bg-canvas/85 text-ink opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="size-4" />
              </div>
            </div>

            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{item.category}</p>
                <h3 className="mt-2 max-w-[28ch] text-h4 text-ink">
                  <span className="text-muted">{item.client}</span> — {item.title}
                </h3>
              </div>
              {item.year && (
                <span className="shrink-0 text-small uppercase tracking-[0.1em] text-muted">
                  {item.year}
                </span>
              )}
            </div>

            {item.metric && (
              <p className="mt-3 inline-flex rounded-pill border border-line px-3 py-1 text-small uppercase tracking-[0.1em] text-ink-2">
                {item.metric}
              </p>
            )}
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
