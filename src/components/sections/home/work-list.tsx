import Link from "next/link";
import { work } from "@/lib/work";

// Uniform cell padding for the full-bleed key-line grid.
const CELL = "px-6 sm:px-8";

/**
 * Work index — a full-bleed key-line grid. Cells are divided by hairlines
 * (vertical between columns, horizontal between rows) with no gaps or margins,
 * per the 6TM key-line system. Each row links to its project.
 */
export function WorkList() {
  return (
    <section id="work" className="border-t border-ink/15">
      {/* label cell */}
      <div
        className={`${CELL} py-3 text-[0.68rem] uppercase tracking-[0.2em] text-ink/55`}
      >
        Selected work
      </div>

      {/* column header (desktop) */}
      <div className="hidden border-t border-ink/15 text-[0.68rem] uppercase tracking-[0.2em] text-ink/40 md:grid md:grid-cols-12">
        <div className={`${CELL} col-span-1 py-3`}>No.</div>
        <div className={`${CELL} col-span-6 border-l border-ink/15 py-3`}>
          Project
        </div>
        <div className={`${CELL} col-span-3 border-l border-ink/15 py-3`}>
          Client
        </div>
        <div
          className={`${CELL} col-span-2 border-l border-ink/15 py-3 text-right`}
        >
          Year
        </div>
      </div>

      {/* rows */}
      <ul>
        {work.map((item, i) => (
          <li key={item.slug} className="border-t border-ink/15">
            <Link
              href={`/work/${item.slug}`}
              className="group grid grid-cols-1 transition-colors hover:bg-surface md:grid-cols-12"
            >
              <span
                className={`${CELL} hidden text-small tabular-nums text-ink/40 md:col-span-1 md:block md:py-6`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className={`${CELL} pt-6 text-h3 leading-snug text-ink transition-colors group-hover:text-accent md:col-span-6 md:border-l md:border-ink/15 md:py-6`}
              >
                {item.title}
              </h3>
              <span
                className={`${CELL} pt-1 text-small text-ink-2 md:col-span-3 md:border-l md:border-ink/15 md:py-6 md:text-body`}
              >
                {item.client}
              </span>
              <span
                className={`${CELL} pt-1 pb-6 text-small tabular-nums text-ink/50 md:col-span-2 md:border-l md:border-ink/15 md:py-6 md:text-right`}
              >
                {item.year}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
