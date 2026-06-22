"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RotatingWordsProps = {
  words: string[];
  className?: string;
  /** ms each word is shown */
  interval?: number;
  /** ms to wait before the first change (lets the headline decode first) */
  startDelay?: number;
};

/**
 * Cycles through `words`, each one rising up + fading in as the prior lifts
 * away. Reserves the width of the longest word (an invisible sizer in the same
 * grid cell) so the line never reflows. SSR-safe — the first word renders
 * immediately — and respects reduced-motion (holds the first word).
 */
export function RotatingWords({
  words,
  className,
  interval = 2400,
  startDelay = 0,
}: RotatingWordsProps) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length <= 1) return;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [reduce, words.length, interval, startDelay]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={cn("relative inline-grid align-baseline", className)}>
      {/* width reserver — keeps the line from reflowing as words change */}
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {longest}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={reduce ? false : { y: "40%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: "-40%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
