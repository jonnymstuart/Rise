"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AmbientVideoProps = {
  /** Video source (mp4/webm). When omitted, a brand-gradient placeholder shows. */
  src?: string;
  /** Poster image shown before/while loading and under reduced-motion. */
  poster?: string;
  className?: string;
  /** Extra classes for the inner media element. */
  mediaClassName?: string;
  /** Optional overlay tint for legibility. */
  overlay?: boolean;
};

/**
 * Ambient, muted, looping background video — the "alive" layer.
 * - Poster shows first; video lazy-plays only while on screen.
 * - Pauses when scrolled out of view (saves battery/CPU).
 * - Under `prefers-reduced-motion`, the video never plays (poster/gradient only).
 * - With no `src`, falls back to the signature brand gradient so layouts feel
 *   designed even before real footage is dropped in.
 */
export function AmbientVideo({
  src,
  poster,
  className,
  mediaClassName,
  overlay = false,
}: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !src || reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, reduced]);

  const showVideo = src && !reduced;

  return (
    <div className={cn("relative overflow-hidden bg-ink", className)}>
      {showVideo ? (
        <video
          ref={ref}
          className={cn("h-full w-full object-cover", mediaClassName)}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src={src} />
        </video>
      ) : poster ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={poster}
          alt=""
          aria-hidden
          className={cn("h-full w-full object-cover", mediaClassName)}
        />
      ) : (
        <div className={cn("bg-brand-gradient h-full w-full", mediaClassName)} />
      )}

      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-ink/20" />
      )}
    </div>
  );
}
