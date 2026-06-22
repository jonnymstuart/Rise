"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Soft brand field — kept bright so dark headline text stays legible over it.
const PALETTE: Array<[number, number, number]> = [
  [250, 50, 160], // magenta
  [192, 43, 201], // orchid
  [123, 47, 240], // violet
  [235, 229, 225], // cream
  [244, 239, 236], // surface
];

const COLS = 22;
const ROWS = 13;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Lo-fi, bit-mapped gradient field. Paints a tiny grid of colour cells onto a
 * canvas that drifts over time, then lets CSS upscale + blur them into big soft
 * squares — like a zoomed-in, blurred image. Pauses when off-screen and
 * respects reduced-motion (renders a single static frame).
 */
export function PixelGradient({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = COLS;
    canvas.height = ROWS;

    const draw = (time: number) => {
      const t = time * 0.0004;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const n =
            0.5 +
            (Math.sin(x * 0.45 + t * 1.6) +
              Math.sin(y * 0.5 - t * 1.3) +
              Math.sin((x + y) * 0.3 + t)) /
              6;
          const k = Math.min(Math.max(n, 0), 0.999) * PALETTE.length;
          const i0 = Math.floor(k) % PALETTE.length;
          const i1 = (i0 + 1) % PALETTE.length;
          const f = k - Math.floor(k);
          const a = PALETTE[i0];
          const b = PALETTE[i1];
          ctx.fillStyle = `rgb(${lerp(a[0], b[0], f) | 0} ${lerp(a[1], b[1], f) | 0} ${lerp(a[2], b[2], f) | 0})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    };

    // Initial paint so there's never a blank flash.
    draw(0);
    if (reduce) return;

    let raf = 0;
    let running = false;
    const loop = (time: number) => {
      draw(time);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      stop();
      io.disconnect();
    };
  }, [reduce]);

  return (
    <div className={cn("overflow-hidden", className)} aria-hidden>
      <canvas
        ref={ref}
        className="h-full w-full"
        style={{
          imageRendering: "pixelated",
          filter: "blur(22px) saturate(1.1)",
          transform: "scale(1.18)",
        }}
      />
    </div>
  );
}
