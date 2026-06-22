"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%/<>*";

type ScrambleTextProps = {
  text: string;
  className?: string;
  /** ms before the decode begins */
  delay?: number;
  /** ms the decode takes to fully resolve */
  duration?: number;
};

/**
 * Decodes text into place on mount — characters cycle like streaming data,
 * then lock left-to-right into the final letters. SSR-safe (renders the final
 * string first so hydration matches) and respects reduced-motion.
 */
export function ScrambleText({
  text,
  className,
  delay = 0,
  duration = 900,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const reduce = useReducedMotion();
  const tick = useRef(0);

  useEffect(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }

    const chars = [...text];
    const lockAt = chars.map(
      (_, i) => delay + (i / Math.max(chars.length - 1, 1)) * duration,
    );
    const end = delay + duration + 100;
    let raf = 0;
    let started = 0;

    const frame = (t: number) => {
      if (!started) started = t;
      const elapsed = t - started;
      setDisplay(
        chars
          .map((c, i) => {
            if (c === " ") return " ";
            if (elapsed >= lockAt[i]) return c;
            return GLYPHS[(tick.current + i * 7) % GLYPHS.length];
          })
          .join(""),
      );
      tick.current += 1;
      if (elapsed < end) {
        raf = requestAnimationFrame(frame);
      } else {
        setDisplay(text);
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, duration, reduce]);

  return (
    <span className={cn("tabular-nums", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{display}</span>
    </span>
  );
}
