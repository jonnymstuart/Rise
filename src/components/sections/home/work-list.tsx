import Link from "next/link";
import { work } from "@/lib/work";

/**
 * Work index — an editorial list. Each row is a project with its client and
 * year, linking to its own page. The list as a statement of direction.
 */
export function WorkList() {
  return (
    <section id="work" className="pb-24 md:pb-32">
      <div className="px-6 pt-20 pb-8 sm:px-10 md:pt-28 lg:px-16">
        <p className="eyebrow">Selected work</p>
      </div>

      {/* column header (desktop) */}
      <div className="hidden border-t border-ink/15 px-6 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-ink/40 sm:px-10 md:grid md:grid-cols-12 md:gap-6 lg:px-16">
        <span className="md:col-span-1">No.</span>
        <span className="md:col-span-6">Project</span>
        <span className="md:col-span-3">Client</span>
        <span className="md:col-span-2 md:text-right">Year</span>
      </div>

      <ul>
        {work.map((item, i) => (
          <li key={item.slug} className="border-t border-ink/15 last:border-b">
            <Link
              href={`/work/${item.slug}`}
              className="group grid grid-cols-1 gap-x-6 gap-y-1.5 px-6 py-6 transition-colors hover:bg-surface sm:px-10 md:grid-cols-12 md:items-baseline md:py-7 lg:px-16"
            >
              <span className="hidden text-small tabular-nums text-ink/40 md:col-span-1 md:block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 leading-snug text-ink transition-colors group-hover:text-accent md:col-span-6">
                {item.title}
              </h3>
              <span className="text-small text-ink-2 md:col-span-3 md:text-body">
                {item.client}
              </span>
              <span className="text-small tabular-nums text-ink/50 md:col-span-2 md:text-right">
                {item.year ?? "—"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
