import { site } from "@/lib/site";

/**
 * Footer — a single small-caps info line that mirrors the top key-line.
 * "Open to select partners" reads as a live status (pink dot + ping).
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-ink/15">
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
    </footer>
  );
}
