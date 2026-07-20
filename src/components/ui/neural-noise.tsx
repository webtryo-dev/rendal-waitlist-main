import { useEffect, useRef, useState } from "react";

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// Flowing blue "neural" filament field. The pointer both attracts the glow
// and warps the noise field around it.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / min(uRes.x, uRes.y);
  vec2 pm = (uPointer * 2.0 - uRes) / min(uRes.x, uRes.y);

  float d = length(uv - pm);
  float pull = exp(-d * 2.1);

  vec2 warp = vec2(
    fbm(uv * 1.6 + uTime * 0.06),
    fbm(uv * 1.6 - uTime * 0.05)
  );
  float n = fbm(uv * 2.2 + warp * (1.3 + pull * 0.9) + pm * 0.35);

  float filaments = smoothstep(0.45, 0.85, n);
  float glow = filaments * (0.22 + 0.78 * pull) + pull * 0.3;

  vec3 col = mix(vec3(0.02, 0.09, 0.35), vec3(0.06, 0.37, 1.0), n) * glow;
  gl_FragColor = vec4(col, glow);
}
`;

/**
 * Pointer-reactive neural-noise canvas. Fills its (positioned) parent.
 * Renders nothing on touch devices, under prefers-reduced-motion, or
 * when WebGL is unavailable.
 */
export function NeuralNoise({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uPointer = gl.getUniformLocation(prog, "uPointer");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Pointer in canvas pixels (y up), eased toward the target each frame.
    let targetX = canvas.width * 0.5;
    let targetY = canvas.height * 0.55;
    let px = targetX;
    let py = targetY;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      targetX = (e.clientX - r.left) * dpr;
      targetY = (r.height - (e.clientY - r.top)) * dpr;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      px += (targetX - px) * 0.08;
      py += (targetY - py) * 0.08;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uPointer, px, py);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
