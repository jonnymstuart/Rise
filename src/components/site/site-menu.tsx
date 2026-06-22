"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { HoverRoll } from "@/components/motion/hover-roll";
import { site } from "@/lib/site";

// Subtle film grain for the glass tray.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Site menu — the key-line "Menu" cell is the trigger; tapping it slides a
 * frosted-glass tray in from the right covering ~90% (a sliver of the page +
 * title stays visible on the left). Items are big mono caps.
 */
export function SiteMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="cursor-pointer justify-self-end text-ink/80"
      >
        <HoverRoll text="Menu" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* click-away (the visible left strip) */}
            <motion.button
              key="scrim"
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* glass tray */}
            <motion.aside
              key="tray"
              className="fixed inset-y-0 right-0 z-50 w-[90%] overflow-hidden border-l border-ink/15 bg-[#eef1f6]/70 backdrop-blur-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* grain */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{ backgroundImage: NOISE }}
              />

              {/* tray top bar */}
              <div className="relative flex items-center justify-between border-b border-ink/15 px-6 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-ink/55 sm:px-10">
                <span>Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer"
                  aria-label="Close menu"
                >
                  <HoverRoll text="Close" />
                </button>
              </div>

              {/* items — big mono caps */}
              <nav className="relative flex h-[calc(100%-3rem)] flex-col justify-center gap-1 px-6 sm:px-10">
                {site.nav.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="w-fit text-[clamp(1.875rem,4.5vw,4.125rem)] uppercase leading-[1.12] tracking-[-0.02em] text-ink transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
