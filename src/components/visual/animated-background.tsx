"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Animated background — a real-time WebGL flow field, seen through fluted glass.
 *
 * A full-screen triangle runs a fragment shader: large, low-detail forms built
 * with domain-warped fbm (kept zoomed-in and smooth, not cloudy), drifting
 * slowly upward forever. A fixed "fluted glass" lens refracts the field into
 * vertical ribs (the image bends + repeats per rib, exactly like looking
 * through ribbed glass). Masked so it's strongest bottom-right and ~0 up top.
 *
 * Engineering: low-res buffer (upscaled → soft for free), `ResizeObserver`
 * sizing, rAF paused on tab-hide, reduced-motion static frame, full GL teardown.
 * Confined to its positioned parent (absolute) — used only in the hero. WebGL
 * absent → the container's CSS colour is the graceful fallback.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.55;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 3; i++) {   // few octaves → clean, low detail
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;

  // fluted-glass lens: bend each vertical rib toward its centre (refraction)
  float ribs = 16.0;
  float r = fract(uv.x * ribs) - 0.5;
  vec2 ruv = vec2(uv.x - (r / ribs) * 0.85, uv.y);

  // zoomed-in, smooth field
  vec2 p = ruv * vec2(u_res.x / u_res.y, 1.0) * 1.0;
  float t = u_time * 0.045;
  p.y -= t * 0.8;                  // drift up, forever

  vec2 q = vec2(fbm(p), fbm(p + vec2(5.2, 1.3)));
  vec2 w = vec2(
    fbm(p + 1.5 * q + vec2(1.7, 9.2) + 0.10 * t),
    fbm(p + 1.5 * q + vec2(8.3, 2.8) + 0.08 * t)
  );
  float f = smoothstep(0.05, 0.95, fbm(p + 2.0 * w));

  // intensity: strongest bottom-right, ~0 toward the top
  float mx = smoothstep(0.15, 1.0, uv.x);
  float my = 1.0 - smoothstep(0.10, 0.92, uv.y);
  float mask = clamp(my * 0.7 + mx * 0.4 + my * mx * 0.8, 0.0, 1.0);
  float v = f * mask;

  vec3 offwhite = vec3(0.933, 0.945, 0.965);
  vec3 blue     = vec3(0.145, 0.271, 0.902);
  vec3 navy     = vec3(0.055, 0.090, 0.290);
  vec3 black    = vec3(0.020, 0.030, 0.095);

  vec3 col = offwhite;
  col = mix(col, blue, smoothstep(0.18, 0.55, v));
  col = mix(col, navy, smoothstep(0.50, 0.80, v));
  col = mix(col, black, smoothstep(0.80, 1.00, v));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(
  gl: WebGLRenderingContext,
  type: number,
  src: string,
): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const SCALE = 0.5; // soft field → render low-res and upscale
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * SCALE));
      const h = Math.max(1, Math.floor(canvas.clientHeight * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = performance.now();
    let raf = 0;
    let running = false;

    const draw = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduce) {
      draw(start);
    } else {
      startLoop();
    }

    const onVisibility = () => {
      if (reduce) return;
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopLoop();
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [reduce]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#eef1f6]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

      {/* keep the headline area clean off-white */}
      <div className="absolute inset-x-0 top-0 h-[40vh] bg-gradient-to-b from-[#eef1f6] via-[#eef1f6]/75 to-transparent" />

      {/* fixed grid bands, aligned to the 12-col grid */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-full flex-1 border-l border-white/10 first:border-l-0"
          />
        ))}
      </div>
    </div>
  );
}
