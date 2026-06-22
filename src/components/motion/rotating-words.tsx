"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RotatingWordsProps = {
  words: string[];
  className?: string;
  /** ms each word is shown */
  interval?: number;
  /** ms before the cycling begins */
  startDelay?: number;
};

/**
 * Cycles through `words` inside a fixed-size slot so the surrounding text
 * never moves. An invisible sizer reserves the box of the LONGEST option;
 * the visible words are layered on top (absolutely positioned, out of flow)
 * and animate up + fade — so only the word changes, never the layout.
 * No reflow, no re-wrapping. SSR-safe and reduced-motion aware.
 */
export function RotatingWords({
  words,
  className,
  interval = 2600,
  startDelay = 0,
}: RotatingWordsProps) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length <= 1) return;
    let id: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    }, startDelay);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
  }, [reduce, words.length, interval, startDelay]);

  const longest = words.reduce(
    (a, b) => (b.length > a.length ? b : a),
    words[0] ?? "",
  );

  return (
    <span className={cn("relative inline-block text-left", className)}>
      {/* sizer — reserves the box of the longest word, so the layout is locked */}
      <span aria-hidden className="invisible">
        {longest}
      </span>
      {/* layered, animated words — out of flow, so they never shift the line */}
      <span aria-hidden className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.span
            key={words[i]}
            className="absolute inset-0"
            initial={reduce ? false : { y: "0.4em", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: "-0.4em", opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      {/* accessible current value */}
      <span className="sr-only">{words[i]}</span>
    </span>
  );
}
