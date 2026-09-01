import {useEffect, useRef} from 'react';

/**
 * The light field behind the entry splitter.
 *
 * Several hundred points of light drift along an invisible current, each
 * leaving a short trail that fades behind it. The current itself is a smooth
 * noise field with an upward bias, so the whole frame reads as energy moving
 * through a system rather than as decoration sitting on top of one — which is
 * the one thing this product actually does. Particles take their colour from
 * their position along the brand's own green-to-blue axis, so the field and the
 * headline gradient are the same idea at different scales.
 *
 * Why this and not something more literal: the entry page is a splitter, and
 * its whole job is to get a visitor through one of two doors. Anything with
 * hard edges — panels, rays, rings — competes with centred type and starts
 * reading as a diagram. An organic, low-contrast current gives the page
 * presence and motion while leaving every word on it perfectly legible.
 *
 * Canvas rather than DOM: this is one painted surface, where the same effect in
 * elements would be several hundred composited layers. Trails come from fading
 * the canvas by a few percent each frame rather than from storing per-particle
 * history, which keeps the cost flat as the count rises.
 *
 * Entirely presentational: `aria-hidden`, no pointer events, on a negative
 * z-index. Honours `prefers-reduced-motion` with a still frame.
 */

/** Density is resolved per viewport area so a phone is not asked to draw a desktop field. */
const DENSITY = 1 / 1850;
const MIN_PARTICLES = 180;
const MAX_PARTICLES = 1100;

type Particle = {
  x: number;
  y: number;
  /** Pixels per second. */
  speed: number;
  /** Frames lived, and the age at which it respawns — keeps the field turning over. */
  age: number;
  life: number;
  weight: number;
  alpha: number;
  /** 0 keeps the brand ramp; 1 burns white. A minority are white, for sparkle. */
  white: number;
};

/**
 * The current. A sum of a few sines rather than real Perlin noise: it is
 * smooth, seamless in time, and costs a handful of trig calls per particle per
 * frame. The constant bias turns the whole field upward, so light rises.
 */
function flow(x: number, y: number, t: number): number {
  return (
    -Math.PI / 2 +
    Math.sin(x * 0.0016 + t * 0.09) * 0.85 +
    Math.cos(y * 0.0021 - t * 0.07) * 0.7 +
    Math.sin((x + y) * 0.0009 + t * 0.05) * 0.55
  );
}

export default function SolarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let last = 0;

    function spawn(p: Particle, seeded: boolean) {
      p.x = Math.random() * width;
      /* Seeded fills the frame on first paint; otherwise light enters low and
         rises, so the turnover is never visible as a line of new particles. */
      p.y = seeded ? Math.random() * height : height * (0.72 + Math.random() * 0.45);
      p.speed = 14 + Math.random() * 42;
      p.age = seeded ? Math.random() * 260 : 0;
      p.life = 190 + Math.random() * 320;
      p.weight = Math.random() < 0.12 ? 1.5 + Math.random() : 0.5 + Math.random() * 0.7;
      p.alpha = 0.18 + Math.random() * 0.46;
      p.white = Math.random() < 0.22 ? 1 : 0;
    }

    function build() {
      const target = Math.round(width * height * DENSITY);
      const count = Math.max(MIN_PARTICLES, Math.min(MAX_PARTICLES, target));

      particles = Array.from({length: count}, () => {
        const p: Particle = {
          x: 0,
          y: 0,
          speed: 0,
          age: 0,
          life: 0,
          weight: 1,
          alpha: 1,
          white: 0
        };
        spawn(p, true);
        return p;
      });
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (!width || !height) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      build();
    }

    /** Green at the left of the frame, blue at the right — the brand ramp. */
    function tint(x: number, white: number) {
      const u = Math.min(1, Math.max(0, x / width));
      const r = Math.round((61 + (46 - 61) * u) * (1 - white) + 255 * white);
      const g = Math.round((220 + (155 - 220) * u) * (1 - white) + 255 * white);
      const b = Math.round((151 + (255 - 151) * u) * (1 - white) + 255 * white);
      return `${r},${g},${b}`;
    }

    function step(time: number, delta: number) {
      /* Trails: pull a few percent of alpha out of everything already painted,
         so each particle's own path decays behind it. */
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.085)';
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'lighter';

      for (const p of particles) {
        const angle = flow(p.x, p.y, time);
        const nx = p.x + Math.cos(angle) * p.speed * delta;
        const ny = p.y + Math.sin(angle) * p.speed * delta;

        /* Ease in and out over the particle's life so nothing pops. */
        const t = p.age / p.life;
        const fade = Math.min(1, t * 6) * Math.min(1, (1 - t) * 4);

        ctx.strokeStyle = `rgba(${tint(p.x, p.white)},${p.alpha * fade})`;
        ctx.lineWidth = p.weight;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        p.x = nx;
        p.y = ny;
        p.age += delta * 60;

        if (p.age > p.life || p.x < -40 || p.x > width + 40 || p.y < -40 || p.y > height + 60) {
          spawn(p, false);
        }
      }

      ctx.globalCompositeOperation = 'source-over';
    }

    function loop(now: number) {
      /* Clamped, so returning to a backgrounded tab does not jump the field. */
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      step(now / 1000, delta);
      frame = requestAnimationFrame(loop);
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    if (still) {
      /* Enough frames to lay down trails, then hold. */
      for (let i = 0; i < 90; i++) step(i / 60, 1 / 60);
    } else {
      last = performance.now();
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Colour fields behind the current, so it moves through depth rather
          than across flat black. */}
      <div
        className="animate-drift absolute -right-[14%] -top-[30%] h-[72vw] w-[72vw] rounded-full blur-[110px]"
        style={{background: 'radial-gradient(circle, var(--color-green-glow), transparent 68%)'}}
      />
      <div
        className="animate-drift absolute -bottom-[30%] -left-[18%] h-[66vw] w-[66vw] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, var(--color-blue-glow), transparent 66%)',
          animationDelay: '-13s',
          animationDuration: '34s'
        }}
      />

      <canvas ref={ref} className="absolute inset-0 h-full w-full" />

      {/* Holds the current off the copy without flattening the frame. */}
      <div className="bg-solar-veil absolute inset-0" />
    </div>
  );
}
